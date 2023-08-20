require('dotenv').config();
const express = require('express');
const adminRouter = require('./routes/adminRouter');
const publicRouter = require('./routes/publicRouter');

const app = express();

const PORT = 4000;

app.use(express.json())
app.use('/',publicRouter);
app.use('/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
