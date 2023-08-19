require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Routes
const userRoute = require('./routes/user');
app.use('/', userRoute);

// Server
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
