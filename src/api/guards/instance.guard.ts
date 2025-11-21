import { InstanceDto } from '@api/dto/instance.dto';
import { cache, prismaRepository, waMonitor } from '@api/server.module';
import { CacheConf, configService } from '@config/env.config';
import { BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException } from '@exceptions';
import { NextFunction, Request, Response } from 'express';

async function getInstance(instanceName: string, userId?: string) {
  try {
    const cacheConf = configService.get<CacheConf>('CACHE');

    const exists = !!waMonitor.waInstances[instanceName];

    if (cacheConf.REDIS.ENABLED && cacheConf.REDIS.SAVE_INSTANCES) {
      const keyExists = await cache.has(instanceName);

      if (exists || keyExists) {
        // If user is authenticated, verify they own this instance
        if (userId) {
          const instance = await prismaRepository.instance.findFirst({
            where: { name: instanceName },
            include: { UserInstances: { where: { userId } } },
          });
          return instance && instance.UserInstances.length > 0;
        }
        return true;
      }
    }

    // Check in database
    if (userId) {
      // Multi-tenant: verify user owns the instance
      const instance = await prismaRepository.instance.findFirst({
        where: { name: instanceName },
        include: { UserInstances: { where: { userId } } },
      });
      return instance && instance.UserInstances.length > 0;
    }

    // Legacy: check if instance exists (for API key auth)
    return exists || (await prismaRepository.instance.findMany({ where: { name: instanceName } })).length > 0;
  } catch (error) {
    throw new InternalServerErrorException(error?.toString());
  }
}

export async function instanceExistsGuard(req: Request, _: Response, next: NextFunction) {
  if (req.originalUrl.includes('/instance/create') || req.originalUrl.includes('/instance/fetchInstances')) {
    return next();
  }

  const param = req.params as unknown as InstanceDto;
  if (!param?.instanceName) {
    throw new BadRequestException('"instanceName" not provided.');
  }

  // Get user from JWT if authenticated
  const user = (req as any).user;
  const userId = user?.userId;

  if (!(await getInstance(param.instanceName, userId))) {
    throw new NotFoundException(`The "${param.instanceName}" instance does not exist`);
  }

  next();
}

export async function instanceLoggedGuard(req: Request, _: Response, next: NextFunction) {
  if (req.originalUrl.includes('/instance/create')) {
    const instance = req.body as InstanceDto;
    
    // Get user from JWT if authenticated
    const user = (req as any).user;
    const userId = user?.userId;

    // Multi-tenant: check if instance name is already in use by this user
    if (userId) {
      const userInstances = await prismaRepository.userInstance.findMany({
        where: { userId },
        include: { Instance: true },
      });
      const instanceNames = userInstances.map(ui => ui.Instance.name);
      if (instanceNames.includes(instance.instanceName)) {
        throw new ForbiddenException(`This name "${instance.instanceName}" is already in use.`);
      }
    } else {
      // Legacy: check globally
      if (await getInstance(instance.instanceName)) {
        throw new ForbiddenException(`This name "${instance.instanceName}" is already in use.`);
      }
    }

    if (waMonitor.waInstances[instance.instanceName]) {
      delete waMonitor.waInstances[instance.instanceName];
    }
  }

  next();
}
