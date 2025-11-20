import { RouterBroker } from '@api/abstract/abstract.router';
import { InstanceDto, SetPresenceDto } from '@api/dto/instance.dto';
import { instanceController } from '@api/server.module';
import { ConfigService } from '@config/env.config';
import { instanceSchema, presenceOnlySchema } from '@validate/validate.schema';
import { RequestHandler, Router } from 'express';
import { checkInstanceLimit } from '@api/guards/instanceLimit.guard';
import { authService } from '@api/services/auth.service';

import { HttpStatus } from './index.router';

export class InstanceRouter extends RouterBroker {
  constructor(
    readonly configService: ConfigService,
    ...guards: RequestHandler[]
  ) {
    super();
    this.router
      .post('/create', ...guards, checkInstanceLimit, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: instanceSchema,
          ClassRef: InstanceDto,
          execute: async (instance) => {
            const result = await instanceController.createInstance(instance);

            // If user is authenticated (JWT), assign instance to user
            const user = (req as any).user;
            if (user && result?.data?.id) {
              try {
                await authService.assignInstanceToUser(user.userId, result.data.id);
                logger.info(`Instance ${result.data.id} assigned to user ${user.userId}`);
              } catch (error) {
                logger.error('Failed to assign instance to user:', error);
                // Don't fail the request if assignment fails
              }
            }

            return result;
          },
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .post(this.routerPath('restart'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.restartInstance(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('connect'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.connectToWhatsapp(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('connectionState'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.connectionState(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .get(this.routerPath('fetchInstances', false), ...guards, async (req, res) => {
        const key = req.get('apikey');

        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.fetchInstances(instance, key),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .get('/my-instances', async (req, res) => {
        try {
          const user = (req as any).user;

          if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              status: HttpStatus.UNAUTHORIZED,
              message: 'Authentication required',
            });
          }

          const instances = await authService.getUserInstances(user.userId);

          return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'Instances retrieved successfully',
            data: instances,
          });
        } catch (error) {
          logger.error('Get user instances error:', error);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          });
        }
      })
      .post(this.routerPath('setPresence'), ...guards, async (req, res) => {
        const response = await this.dataValidate<null>({
          request: req,
          schema: presenceOnlySchema,
          ClassRef: SetPresenceDto,
          execute: (instance, data) => instanceController.setPresence(instance, data),
        });

        return res.status(HttpStatus.CREATED).json(response);
      })
      .delete(this.routerPath('logout'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.logout(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      })
      .delete(this.routerPath('delete'), ...guards, async (req, res) => {
        const response = await this.dataValidate<InstanceDto>({
          request: req,
          schema: null,
          ClassRef: InstanceDto,
          execute: (instance) => instanceController.deleteInstance(instance),
        });

        return res.status(HttpStatus.OK).json(response);
      });
  }

  public readonly router: Router = Router();
}
