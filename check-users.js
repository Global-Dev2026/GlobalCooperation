const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'kaushi@gmail.com' },
    });
    console.log('User found:', user);
    const allUsers = await prisma.user.findMany();
    console.log('All users:', allUsers.map(u => u.email));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
