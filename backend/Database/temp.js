const path = require('path');
const dotenv = require('dotenv');
const oracledb = require('oracledb');

const envFilePath = path.join(__dirname, '..', '.env');

// Load the environment variables from the .env file
dotenv.config({ path: envFilePath });

async function startup() {
    try {
        console.log('Starting up database...');
        
        // Create a connection pool
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTSTRING,
            poolMin: 4,
            poolMax: 10,
            poolIncrement: 1
        });

        console.log('Database pool created.');
    } catch (error) {
        console.error('Error during database startup:', error);
    }
}

async function shutdown() {
    try {
        console.log('Shutting down database...');
        
        // Close the connection pool
        await oracledb.getPool().close(10);

        console.log('Database pool closed.');
    } catch (error) {
        console.error('Error during database shutdown:', error);
    }
}

async function execute(sql, binds, options) {
    let connection, result;
    
    try {
        // Acquire a connection from the pool
        connection = await oracledb.getConnection();

        // Execute the SQL query
        result = await connection.execute(sql, binds, options);
    } catch (error) {
        console.error('Error executing SQL:', error);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the pool
                await connection.close();
            } catch (error) {
                console.error('Error closing connection:', error);
            }
        }
    }
    
    return result;
}

async function main() {
    try {
        await startup();
        
        const sql = 'SELECT * FROM COMMON_INFO';
        const binds = [];
        const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };

        const result = await execute(sql, binds, options);
        console.log(result.rows);

        await shutdown();
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
