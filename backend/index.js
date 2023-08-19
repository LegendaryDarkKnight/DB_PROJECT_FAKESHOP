require('dotenv').config({ path: __dirname + '/.env' })
// const oracledb = require('oracledb');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const logIn = require('./Database/db-login-api');
const database = require('./Database/database');

async function run(query, outputFormat = database.options.outFormat) {
    const result = await database.execute(query, [], {
        outFormat: outputFormat
    });

    return result;
}
app.post("/process", async (req, res) => {
    console.log(req.body.email);
    const name = req.body.email.trim();
    const data = await run();
    res.send(data);
});


app.post("/logindata", async (req, res) => {
    console.log(req.body.email);
    const name = req.body.email.trim();
    const data = await logIn(name);
    res.send(data);
});
app.post("/getWalletStatus", async (req, res) => {
    console.log(req.body.id);
    const id = req.body.id;
    const query = `SELECT TOTAL_CREDITS FROM WALLET WHERE WALLET_ID = '${id}'`;
    const data = await run(query);
    res.send(data);
});
app.post("/getUserData", async (req, res) => {
    console.log(req.body.id);
    const id = req.body.id;
    const query = `SELECT * FROM ALL_USERS WHERE USER_ID = '${id}'`;
    const data = await run(query);
    console.log("Here");
    res.send(data);
});

app.get("/getUserData", async (req, res) => {
    try {
        const id = req.query.id; // Assuming you're passing the id as a query parameter

        const query = `SELECT * FROM ALL_USERS WHERE USER_ID = '${id}'`;
        const data = await run(query);
        
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(process.env.PORT, async ()=>
{
    try{
        // create database connection pool, log startup message
        await database.startup();
    } catch(err) {
        console.log("Error starting up database: " + err);
        process.exit(1);
    }
});

process
    .once('SIGTERM', database.shutdown)
    .once('SIGINT',  database.shutdown);