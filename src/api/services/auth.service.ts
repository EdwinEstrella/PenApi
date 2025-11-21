import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Logger } from '@config/logger.config';
import { prismaRepository } from '@api/server.module';
import { UserRole, UserStatus, PlanType, SubscriptionStatus } from '@prisma/client';

const logger = new Logger('AUTH_SERVICE');

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  planType: PlanType;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    planType: PlanType;
    subscriptionStatus: string;
  };
  token: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: JwtPayload): string {
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
      logger.error('Token verification failed:', error);
      throw new Error('Invalid token');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const { email, password, name } = data;

    // Check if user already exists
    const existingUser = await prismaRepository.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const user = await prismaRepository.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
        planType: PlanType.FREE,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
      },
    });

    // Generate token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      planType: user.planType,
    };

    const token = this.generateToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        planType: user.planType,
        subscriptionStatus: user.subscriptionStatus,
      },
      token,
    };
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const { email, password } = data;

    // Find user
    const user = await prismaRepository.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check user status
    if (user.status !== UserStatus.ACTIVE) {
      throw new Error('Account is not active');
    }

    // Check subscription status
    if (user.subscriptionStatus === 'EXPIRED') {
      throw new Error('Subscription expired');
    }

    // Verify password
    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      planType: user.planType,
    };

    const token = this.generateToken(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        planType: user.planType,
        subscriptionStatus: user.subscriptionStatus,
      },
      token,
    };
  }

  async getUserById(userId: string) {
    return prismaRepository.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        planType: true,
        subscriptionStatus: true,
        subscriptionExpiresAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async canCreateInstance(userId: string): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) return false;

    // Get current instance count for user
    const instanceCount = await prismaRepository.userInstance.count({
      where: { userId },
    });

    // Define max instances per plan
    const maxInstancesPerPlan = {
      [PlanType.FREE]: 1,
      [PlanType.BASIC]: 5,
      [PlanType.PREMIUM]: 8,
    };

    const maxInstances = maxInstancesPerPlan[user.planType] || 1;

    return instanceCount < maxInstances;
  }

  async getInstanceLimit(userId: string): Promise<number> {
    const user = await this.getUserById(userId);
    if (!user) return 0;

    const maxInstancesPerPlan = {
      [PlanType.FREE]: 1,
      [PlanType.BASIC]: 5,
      [PlanType.PREMIUM]: 8,
    };

    return maxInstancesPerPlan[user.planType] || 1;
  }

  async getUserInstances(userId: string) {
    const userInstances = await prismaRepository.userInstance.findMany({
      where: { userId },
      include: {
        Instance: {
          select: {
            id: true,
            name: true,
            connectionStatus: true,
            profileName: true,
            profilePicUrl: true,
            number: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return userInstances.map(ui => ui.Instance);
  }

  async assignInstanceToUser(userId: string, instanceId: string) {
    // Check if user can create more instances
    const canCreate = await this.canCreateInstance(userId);
    if (!canCreate) {
      throw new Error('Instance limit reached for your plan');
    }

    // Check if instance exists
    const instance = await prismaRepository.instance.findUnique({
      where: { id: instanceId },
    });

    if (!instance) {
      throw new Error('Instance not found');
    }

    // Create user-instance relationship
    return prismaRepository.userInstance.create({
      data: {
        userId,
        instanceId,
      },
    });
  }

  async removeInstanceFromUser(userId: string, instanceId: string) {
    return prismaRepository.userInstance.deleteMany({
      where: {
        userId,
        instanceId,
      },
    });
  }

  // Legacy method for backward compatibility
  public async checkDuplicateToken(token: string) {
    if (!token) {
      return true;
    }

    const instances = await prismaRepository.instance.findMany({
      where: { token },
    });

    if (instances.length > 0) {
      throw new Error('Token already exists');
    }

    return true;
  }
}

export const authService = new AuthService();
