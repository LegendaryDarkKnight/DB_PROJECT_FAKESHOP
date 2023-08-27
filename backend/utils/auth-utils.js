require('dotenv').config();

const jwt = require('jsonwebtoken');


async function loginUser(res, userId){
    // ... create token
    const payload = {
        id: userId
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }
    res.cookie('sessionToken', token, options);
    res.header('Access-Control-Allow-Credentials', 'true');
}

module.exports = {
    loginUser
}

// console.log(process.env.APP_SECRET)