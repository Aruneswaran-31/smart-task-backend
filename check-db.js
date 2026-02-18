const { Client } = require('pg');
require('dotenv').config();

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Connect to default postgres DB first
    password: 'postgres', // Default password usually, or from env
    port: 5432,
};

async function checkDatabase() {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        console.log('Connected to PostgreSQL server.');
        
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'smart_task_db'");
        if (res.rowCount === 0) {
            console.log("Database 'smart_task_db' does not exist. Creating...");
            await client.query("CREATE DATABASE smart_task_db");
            console.log("Database created successfully.");
        } else {
            console.log("Database 'smart_task_db' already exists.");
        }
    } catch (err) {
        console.error('Error connecting to database:', err);
    } finally {
        await client.end();
    }
}

checkDatabase();
