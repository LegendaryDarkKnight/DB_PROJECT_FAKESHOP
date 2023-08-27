const { compare } = require("bcrypt");
const { hashPass } = require("../utils/hash-utils");

const database = require('../Database/database');

async function run(query, outputFormat = database.options.OUT_FORMAT_OBJECT) {
    const result = await database.execute(query, [], {
        outFormat: outputFormat
    });

    return result;
}

const main = async () => {
    try {
        // create database connection pool, log startup message
        await database.startup();
        const result = await run('SELECT USER_ID, PASS_WORD FROM ALL_USERS');
        
        // Extract rows from the result
        const data = result.rows;
        for(const d of data){
            const hash = await hashPass(d[1]);
            console.log(hash);
            await run(`UPDATE ALL_USERS SET PASS_WORD = '${hash}' WHERE USER_ID = '${d[0]}' `);
        }
    } catch (err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
    await database.shutdown();
};

main();