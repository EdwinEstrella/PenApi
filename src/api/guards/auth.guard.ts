import { InstanceDto } from '@api/dto/instance.dto';
import { prismaRepository } from '@api/server.module';
import { Auth, configService, Database } from '@config/env.config';
import { Logger } from '@config/logger.config';
import { ForbiddenException, UnauthorizedException } from '@exceptions';
import { NextFunction, Request, Response } from 'express';
import { authService } from '@api/services/auth.service';

const logger = new Logger('GUARD');

async function apikey(req: Request, _: Response, next: NextFunction) {
  const env = configService.get<Auth>('AUTHENTICATION').API_KEY;
  const key = req.get('apikey');
  const db = configService.get<Database>('DATABASE');

  if (!key) {
    throw new UnauthorizedException();
  }

  if (env.KEY === key) {
    return next();
  }

  if ((req.originalUrl.includes('/instance/create') || req.originalUrl.includes('/instance/fetchInstances')) && !key) {
    throw new ForbiddenException('Missing global api key', 'The global api key must be set');
  }
  const param = req.params as unknown as InstanceDto;

  try {
    if (param?.instanceName) {
      const instance = await prismaRepository.instance.findUnique({
        where: { name: param.instanceName },
      });
      if (instance.token === key) {
        return next();
      }
    } else {
      if (req.originalUrl.includes('/instance/fetchInstances') && db.SAVE_DATA.INSTANCE) {
        const instanceByKey = await prismaRepository.instance.findFirst({
          where: { token: key },
        });
        if (instanceByKey) {
          return next();
        }
      }
    }
  } catch (error) {
    logger.error(error);
  }

  throw new UnauthorizedException();
}

async function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization token required',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'Authorization token required',
      });
    }

    // Verify token
    const decoded = authService.verifyToken(token);

    // Attach user info to request
    (req as any).user = decoded;

    next();
  } catch (error) {
    logger.error('JWT middleware error:', error);

    return res.status(401).json({
      status: 401,
      message: 'Invalid or expired token',
    });
  }
}

async function jwtOrApikey(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization');
    const apiKey = req.get('apikey');

    // Try JWT authentication first
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = authService.verifyToken(token);
      (req as any).user = decoded;
      return next();
    }

    // Fall back to API key authentication
    if (apiKey) {
      return apikey(req, res, next);
    }

    // No authentication provided
    return res.status(401).json({
      status: 401,
      message: 'Authentication required (JWT or API key)',
    });
  } catch (error) {
    logger.error('JWT or API key middleware error:', error);

    return res.status(401).json({
      status: 401,
      message: 'Invalid authentication',
    });
  }
}

async function instanceOwnership(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;
    const param = req.params as unknown as InstanceDto;

    if (!user || !param?.instanceName) {
      throw new UnauthorizedException();
    }

    // Check if user owns this instance
    const instance = await prismaRepository.instance.findUnique({
      where: { name: param.instanceName },
      include: {
        UserInstances: {
          where: { userId: user.userId }
        }
      }
    });

    if (!instance) {
      return res.status(404).json({
        status: 404,
        message: 'Instance not found',
      });
    }

    if (instance.UserInstances.length === 0) {
      return res.status(403).json({
        status: 403,
        message: 'Access denied: You do not own this instance',
      });
    }

    next();
  } catch (error) {
    logger.error('Instance ownership middleware error:', error);

    return res.status(403).json({
      status: 403,
      message: 'Access denied',
    });
  }
}

export const authGuard = {
  apikey,
  jwt: jwtMiddleware,
  jwtOrApikey,
  instanceOwnership
};

// Export commonly used middleware
export const authMiddleware = jwtMiddleware;
export const authMiddlewareOrApikey = jwtOrApikey;
