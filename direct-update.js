const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

async function main() {
    const pool = new Pool({ 
        connectionString: "postgresql://postgres.jbpelbkjaorvxgwdbyzn:jbsonp55mdAYGTBw@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres",
        connectionTimeoutMillis: 5000,
    });
    
    console.log('Connecting to database via pg...');
    const client = await pool.connect();
    
    try {
        const email = 'kaushi@gmail.com';
        const password = 'kaushi1234';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('Updating/Creating user...');
        await client.query('DELETE FROM users WHERE email = $1', ['admin@globalsoft.com']);
        await client.query(`
            INSERT INTO users (id, name, email, password, role, "updatedAt", "createdAt")
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            ON CONFLICT (email) DO UPDATE 
            SET password = $4, "updatedAt" = NOW()
        `, ['admin-id-1', 'Admin User', email, hashedPassword, 'ADMIN']);
        
        console.log('Successfully updated admin credentials.');
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(err => {
    console.error('Database error:', err.message);
    process.exit(1);
});
