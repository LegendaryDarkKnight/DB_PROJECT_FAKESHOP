require('dotenv').config();

const jwt = require('jsonwebtoken');


async function loginUser(res, userId){
    // ... create token
    const payload = {
        id: userId
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);
    let options = {
        maxAge: 9000000, 
        httpOnly: false
    }
    res.cookie('sessionToken', token, options);
    res.cookie('userID', userId, options); // Set userID cookie
    res.header('Access-Control-Allow-Credentials', 'true');
}

module.exports = {
    loginUser
}

// console.log(process.env.APP_SECRET)