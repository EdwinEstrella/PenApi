import { PrismaClient, UserRole, UserStatus, PlanType, SubscriptionStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

const DEFAULT_USER_EMAIL = 'admin@penapi.com';
const DEFAULT_USER_PASSWORD = 'admin123';
const DEFAULT_USER_NAME = 'Admin User';

async function main() {
  console.log('🌱 Seeding default user...');

  try {
    // Check if default user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: DEFAULT_USER_EMAIL },
    });

    if (existingUser) {
      console.log(`✅ Default user already exists: ${DEFAULT_USER_EMAIL}`);
      return;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(DEFAULT_USER_PASSWORD, saltRounds);

    // Create default user
    const user = await prisma.user.create({
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

    console.log('✅ Default user created successfully!');
    console.log('📋 Default credentials:');
    console.log(`   Email: ${DEFAULT_USER_EMAIL}`);
    console.log(`   Password: ${DEFAULT_USER_PASSWORD}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Plan: ${user.planType}`);
  } catch (error) {
    console.error('❌ Error creating default user:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

