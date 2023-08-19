const path = require('path');
const dotenv = require('dotenv');
const oracledb = require('oracledb')

const envFilePath = path.join(__dirname, '..', '.env');

const result = dotenv.config({ path: envFilePath });

oracledb.autoCommit = true;

// creates connection pool for oracledb
async function startup() {
    try {
        console.log('starting up database.');
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTSTRING,
            poolMin: 4,
            poolMax: 10,
            poolIncrement: 1
        });
        console.log('pool created');
    } catch (err) {
        console.error('Error during database startup:', err);
    }
}

// closes connection pool for oracledb
async function shutdown() {
    console.log('shutting down database.');
    try {
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file.
        await oracledb.getPool().close(10);
        console.log('Pool closed');
    } catch(err) {
        console.log("ERROR shutting down database: "+err.message);
    }
}

// code to execute sql
async function execute(sql, binds, options){
    let connection, results;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        results = await connection.execute(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }
    return results;
}

// code to execute many sql
async function executeMany(sql, binds, options){
    let connection;
    try {
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.log("ERROR closing connection: " + err);
            }
        }
    }

    return;
}


console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_CONNECTSTRING);
// options for execution sql
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}
module.exports = {
    startup,
    shutdown,
    execute,
    executeMany,
    options
};
// Now you can access environment variables
