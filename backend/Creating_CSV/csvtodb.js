const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const oracledb = require('oracledb');
const database = require('../Database/database');

async function insertDataIntoDB(data) {
    try {
        await database.startup();

        for (const row of data) {
            //  
           
        }
    } catch (err) {
        console.error('Error:', err);
     }
    finally {
            try {
                await database.shutdown();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
      
    }
}

async function readCSVAndInsert() {
    const data = [];

    fs.createReadStream(path.join(__dirname, 'wallet.csv'))
        .pipe(csvParser({ delimiter: ',' }))
        .on('data', row => {
            console.log('CSV Row:', row);
            // console.log(typeof row.PRODUCT_ID)
            data.push(row);
        })
        .on('end', async () => {
            // await insertDataIntoDB(data);
        });
}

readCSVAndInsert();
