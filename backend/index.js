require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();
const database = require('./Database/database');
const publicRouter = require('./routes/publicRouter');
const cartRouter = require('./routes/cartRouter');

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/',publicRouter);
app.use('/cart',cartRouter);
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