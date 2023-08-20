require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const cors = require("cors");
const app = express();
const database = require('./Database/database');
const publicRouter = require('./routes/publicRouter');

app.use(express.json());
app.use(cors());
app.use('/',publicRouter);

app.listen(process.env.PORT, async ()=>
{
    try{
        await database.startup();
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);