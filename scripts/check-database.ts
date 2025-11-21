import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking database structure...\n');

  try {
    // Check if User table exists and get its structure
    console.log('📊 Checking User table...');
    
    try {
      // Try to query the User table
      const userCount = await prisma.user.count();
      console.log(`✅ User table exists with ${userCount} records`);

    // Get first user to see structure (if any)
    const firstUser = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        planType: true,
        subscriptionStatus: true,
        createdAt: true,
      },
    });

    if (firstUser) {
      console.log('\n📋 Sample user structure:');
      console.log(JSON.stringify(firstUser, null, 2));
    }

    } catch (error: any) {
      if (error.code === 'P2021') {
        console.log('❌ User table does not exist');
      } else {
        throw error;
      }
    }

    // Check all tables in the database
    console.log('\n📊 Checking all tables...');
    
    // For PostgreSQL
    if (process.env.DATABASE_PROVIDER === 'postgresql' || !process.env.DATABASE_PROVIDER) {
      try {
        const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
          SELECT tablename 
          FROM pg_tables 
          WHERE schemaname = 'public'
          ORDER BY tablename;
        `;
        console.log('\n📋 Available tables:');
        tables.forEach(table => {
          console.log(`   - ${table.tablename}`);
        });
      } catch (error) {
        console.log('⚠️  Could not list tables (may need migrations)');
      }
    }

    // For MySQL
    if (process.env.DATABASE_PROVIDER === 'mysql') {
      try {
        const tables = await prisma.$queryRaw<Array<{ TABLE_NAME: string }>>`
          SELECT TABLE_NAME 
          FROM information_schema.TABLES 
          WHERE TABLE_SCHEMA = DATABASE()
          ORDER BY TABLE_NAME;
        `;
        console.log('\n📋 Available tables:');
        tables.forEach(table => {
          console.log(`   - ${table.TABLE_NAME}`);
        });
      } catch (error) {
        console.log('⚠️  Could not list tables (may need migrations)');
      }
    }

    console.log('\n✅ Database check completed successfully!');
  } catch (error) {
    console.error('❌ Error checking database:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error code:', (error as any).code);
      
      // Check if it's a table not found error
      if (error.message.includes('does not exist') || error.message.includes("doesn't exist")) {
        console.error('\n⚠️  The User table does not exist. You may need to run migrations:');
        console.error('   npm run db:migrate:dev:win  (for Windows)');
        console.error('   npm run db:migrate:dev      (for Unix/Mac)');
      }
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();

