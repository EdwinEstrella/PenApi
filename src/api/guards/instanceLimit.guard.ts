import { Request, Response, NextFunction } from 'express';
import { Logger } from '@config/logger.config';
import { authService } from '@api/services/auth.service';

const logger = new Logger('INSTANCE_LIMIT_GUARD');

async function checkInstanceLimit(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;

    // If no user (API key authentication), allow legacy behavior
    if (!user) {
      return next();
    }

    // Check if user can create more instances
    const canCreate = await authService.canCreateInstance(user.userId);
    if (!canCreate) {
      const limit = await authService.getInstanceLimit(user.userId);
      return res.status(403).json({
        status: 403,
        message: `Instance limit reached. Your plan allows ${limit} instances.`,
        error: 'INSTANCE_LIMIT_REACHED',
      });
    }

    next();
  } catch (error) {
    logger.error('Instance limit check error:', error);

    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

export { checkInstanceLimit };