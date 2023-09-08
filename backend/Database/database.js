require('dotenv').config();
const oracledb = require('oracledb')

oracledb.autoCommit = true;

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

async function shutdown() {
    console.log('shutting down database.');
    try {
        await oracledb.getPool().close(10);
        console.log('Pool closed');
    } catch(err) {
        console.log("ERROR shutting down database: "+err.message);
    }
    process.exit(0);
}

async function execute(sql, binds, options){
    let connection, results;
    try {
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


async function executeMany(sql, binds, options){
    let connection;
    try {
        connection = await oracledb.getConnection();
        await connection.executeMany(sql, binds, options);
    } catch (err) {
        console.log("ERROR executing sql: " + err.message);
    } finally {
        if (connection) {
            try {
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
