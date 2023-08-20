const database = require('../Database/database');
const main = async()=>{
    try{
        // create database connection pool, log startup message
        await database.startup();
        const result =await run('SELECT * FROM ALL_USERS');
        console.log(result.rows);
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
}
async function run(query, outputFormat = database.options.outFormat) {
    const result = await database.execute(query, [], {
        outFormat: outputFormat
    });

    return result;
}
main()

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);