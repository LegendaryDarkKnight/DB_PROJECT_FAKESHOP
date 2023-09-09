const fs = require('fs');
const csvParser = require('csv-parser');
const path = require('path');
const database = require('../Database/database');
const bcrypt = require('bcrypt');

async function run(query, outputFormat = database.options.outFormat) {
    const result = await database.execute(query, [], {
        outFormat: outputFormat
    });

    return result;
}

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

async function updateData(data){
    try {
        await database.startup();

        for (const row of data) {
            console.log(row.USER_ID,row.PASS_WORD);
            const hashedPassword = bcrypt.hashSync(row.PASS_WORD, 10);
            await run(`UPDATE ALL_USERS
                        SET PASS_WORD = '${hashedPassword}'
                        WHERE USER_ID = '${row.USER_ID}'
                        `);
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

    fs.createReadStream(path.join(__dirname, 'all_users.csv'))
        .pipe(csvParser({ delimiter: ',' }))
        .on('data', row => {
            data.push(row);
        })
        .on('end', async () => {
            await updateData(data);
        });
}

readCSVAndInsert();
