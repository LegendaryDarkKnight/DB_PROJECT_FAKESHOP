const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
const path = require('path');
const database = require('../Database/database');

const main = async () => {
    try {
        // create database connection pool, log startup message
        await database.startup();
        const result = await run('SELECT * FROM WALLET');
        
        // Extract rows from the result
        const rows = result.rows;

        // Write rows to a CSV file
        const csvFileName = path.join(__dirname, 'wallet.csv');
        await writeCSVFile(rows, csvFileName);

        console.log("Data written to wallet.csv");
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
    const csvRows = data.map(row => Object.values(row).join(','));
    const csvContent = csvRows.join('\n');
    
    await writeFileAsync(fileName, csvContent, 'utf8');
}

main();

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT', database.shutdown);
