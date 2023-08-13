require('dotenv').config({ path: __dirname + '/.env' })
const oracledb = require('oracledb');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

async function run() {
    const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // contains the hr schema password
        connectString: process.env.DB_CONNECTSTRING
    });
    const result = await connection.execute(`SELECT * FROM COMMON_INFO`);
    console.log(result.rows);
    await connection.close();   // Always close connections
    return result;
}

async function run2(email) {
    const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // contains the hr schema password
        connectString: process.env.DB_CONNECTSTRING
    });
    const result = await connection.execute(`SELECT * FROM ALL_USERS WHERE EMAIL_ID = '${email}'`);
    console.log(result.rows);
    await connection.close();   // Always close connections
    return result;
}

async function run3(id) {
    const connection = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,  // contains the hr schema password
        connectString: process.env.DB_CONNECTSTRING
    });
    const result = await connection.execute(`SELECT TOTAL_CREDITS FROM WALLET WHERE WALLET_ID = '${id}'`);
    await connection.close();   // Always close connections
    return result;
}
app.post("/process", async (req, res) => {
    console.log(req.body.email);
    const name = req.body.email.trim();
    const data = await run2(name);
    res.send(data);
});

app.post("/logindata", async (req, res) => {
    console.log(req.body.email);
    const name = req.body.email.trim();
    const data = await run2(name);
    res.send(data);
});

app.post("/getWalletStatus", async (req, res) => {
    console.log(req.body.id);
    const id = req.body.id;
    const data = await run3(id);
    res.send(data);
});

app.listen(process.env.PORT, ()=>
{
    console.log('Server Running');
});
