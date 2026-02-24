
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function main() {
    const connectionString = process.env.DATABASE_URL;
    const client = new Client({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const email = 'admin@global.com';
        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists - Table "users"
        const res = await client.query('SELECT * FROM "users" WHERE email = $1', [email]);

        if (res.rows.length > 0) {
            console.log('User already exists, updating...');
            await client.query(
                'UPDATE "users" SET password = $1, role = $2 WHERE email = $3',
                [hashedPassword, 'ADMIN', email]
            );
        } else {
            console.log('Creating new user...');
            await client.query(
                `INSERT INTO "users" (id, email, password, role, name, "createdAt", "updatedAt") 
                 VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW(), NOW())`,
                [email, hashedPassword, 'ADMIN', 'Admin User']
            );
        }

        console.log('✅ Admin user ready: admin@global.com / password123');

    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await client.end();
    }
}

main();
