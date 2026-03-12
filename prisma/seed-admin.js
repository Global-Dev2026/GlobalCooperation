const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require('bcryptjs');

// Must match lib/prisma.ts setup
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Checking database connection...');
    const email = 'kaushi@gmail.com';
    const password = 'kaushi1234';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: 'Admin User',
                role: 'ADMIN',
            },
        });
        console.log(`Created admin user: ${email}`);
    } else {
        console.log(`Admin user already exists: ${email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
