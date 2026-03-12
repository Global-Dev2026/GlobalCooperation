import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from 'bcryptjs';

// Setup connection pool with credentials
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log(`Connecting to database...`);
    const email = 'kaushi@gmail.com';
    const password = 'kaushi1234';

    try {
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
    } catch (e) {
        console.error('Error seeding database:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
