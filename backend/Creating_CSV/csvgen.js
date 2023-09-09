const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const path = require('path');
const database = require('../Database/database');

const main = async () => {
    try {
        // create database connection pool, log startup message
        await database.startup();
        const result = await run('SELECT * FROM ALL_USERS');
        
        // Extract rows from the result
        const rows = result.rows;
        
        // Write rows to a CSV file
        const csvFileName = path.join(__dirname, 'all_users.csv');
        // await writeFileAsync(csvFileName, `USER_ID,FIRST_NAME,LAST_NAME,USER_TYPE,PASS_WORD,CONTACT,IMAGE,APARTMENT_NUMBER,BUILDING_NUMBER,STREET,AREA,POST_CODE,CITY,EMAIL_ID\n`, 'utf8');
        await writeCSVFile(rows, csvFileName);

        console.log("Data written to all_users.csv");
    } catch (err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
};

async function run(query, outputFormat = database.options.OUT_FORMAT_OBJECT) {
    const result = await database.execute(query, [], {
        outFormat: outputFormat
    });

    return result;
}

async function writeCSVFile(data, fileName) {
    let csvRows = data.map(row => Object.values(row).join(','));
    const csvContent = `USER_ID,FIRST_NAME,LAST_NAME,USER_TYPE,PASS_WORD,CONTACT,IMAGE,APARTMENT_NUMBER,BUILDING_NUMBER,STREET,AREA,POST_CODE,CITY,EMAIL_ID\n`+csvRows.join('\n');
    
    await writeFileAsync(fileName, csvContent, 'utf8');
}

main();

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT', database.shutdown);
