import { Logger } from '@config/logger.config';
import { PrismaRepository } from '@api/repository/repository.service';
import { UserRole, UserStatus, PlanType, SubscriptionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const logger = new Logger('SEED_DEFAULT_USER');

const DEFAULT_USER_EMAIL = 'admin@penapi.com';
const DEFAULT_USER_PASSWORD = 'admin123';
const DEFAULT_USER_NAME = 'Admin User';

export async function seedDefaultUser(prismaRepository: PrismaRepository) {
  try {
    // Check if default user already exists
    const existingUser = await prismaRepository.user.findUnique({
      where: { email: DEFAULT_USER_EMAIL },
    });

    if (existingUser) {
      logger.info(`Default user already exists: ${DEFAULT_USER_EMAIL}`);
      return;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(DEFAULT_USER_PASSWORD, saltRounds);

    // Create default user
    const user = await prismaRepository.user.create({
      data: {
        email: DEFAULT_USER_EMAIL,
        password: hashedPassword,
        name: DEFAULT_USER_NAME,
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        planType: PlanType.FREE,
        subscriptionStatus: SubscriptionStatus.ACTIVE,
      },
    });

    logger.info(`Default user created successfully: ${DEFAULT_USER_EMAIL}`);
    logger.info(`Default credentials:`);
    logger.info(`  Email: ${DEFAULT_USER_EMAIL}`);
    logger.info(`  Password: ${DEFAULT_USER_PASSWORD}`);
    logger.info(`  Role: ${user.role}`);
    logger.info(`  Plan: ${user.planType}`);

    return user;
  } catch (error) {
    logger.error('Error creating default user:', error);
    if (error instanceof Error) {
      logger.error('Error message:', error.message);
      logger.error('Error stack:', error.stack);
    }
    throw error;
  }
}

