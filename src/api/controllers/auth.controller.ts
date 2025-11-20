import { Request, Response } from 'express';
import { Logger } from '@config/logger.config';
import { authService } from '@api/services/auth.service';
import { HttpStatus } from '@api/routes/index.router';

const logger = new Logger('AUTH_CONTROLLER');

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email and password are required',
        });
      }

      if (password.length < 6) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Password must be at least 6 characters long',
        });
      }

      // Register user
      const result = await authService.register({ email, password, name });

      logger.info(`User registered successfully: ${email}`);

      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      logger.error('Registration error:', error);

      if (error.message === 'User already exists') {
        return res.status(HttpStatus.CONFLICT).json({
          status: HttpStatus.CONFLICT,
          message: 'User already exists',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Email and password are required',
        });
      }

      // Login user
      const result = await authService.login({ email, password });

      logger.info(`User logged in successfully: ${email}`);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      logger.error('Login error:', error);

      if (error.message === 'Invalid credentials') {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      }

      if (error.message === 'Account is not active') {
        return res.status(HttpStatus.FORBIDDEN).json({
          status: HttpStatus.FORBIDDEN,
          message: 'Account is not active',
        });
      }

      if (error.message === 'Subscription expired') {
        return res.status(HttpStatus.FORBIDDEN).json({
          status: HttpStatus.FORBIDDEN,
          message: 'Subscription expired',
        });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      const userProfile = await authService.getUserById(user.userId);

      if (!userProfile) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Profile retrieved successfully',
        data: userProfile,
      });
    } catch (error) {
      logger.error('Get profile error:', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getInstanceLimit(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        });
      }

      const [limit, canCreate, instances] = await Promise.all([
        authService.getInstanceLimit(user.userId),
        authService.canCreateInstance(user.userId),
        authService.getUserInstances(user.userId),
      ]);

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Instance limit retrieved successfully',
        data: {
          limit,
          canCreate,
          currentInstances: instances.length,
          instances,
        },
      });
    } catch (error) {
      logger.error('Get instance limit error:', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  async getUserInstances(req: Request, res: Response) {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
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
  }

  async getPlans(req: Request, res: Response) {
    try {
      const plans = [
        {
          name: 'FREE',
          maxInstances: 1,
          price: 0,
          description: 'Perfect for trying out PenApi',
          features: [
            '1 WhatsApp instance',
            'Basic messaging features',
            'Community support'
          ]
        },
        {
          name: 'BASIC',
          maxInstances: 5,
          price: 3,
          description: 'Great for small businesses',
          features: [
            '5 WhatsApp instances',
            'Advanced messaging features',
            'Email support',
            'Basic analytics'
          ]
        },
        {
          name: 'PREMIUM',
          maxInstances: 8,
          price: 10,
          description: 'Perfect for growing businesses',
          features: [
            '8 WhatsApp instances',
            'All features included',
            'Priority support',
            'Advanced analytics',
            'Custom integrations'
          ]
        }
      ];

      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Plans retrieved successfully',
        data: plans,
      });
    } catch (error) {
      logger.error('Get plans error:', error);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}