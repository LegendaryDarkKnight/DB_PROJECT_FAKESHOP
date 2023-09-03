require('dotenv').config();

const jwt = require('jsonwebtoken');


async function loginUser(res, userId){
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

async function loginAdmin(res, userId){

    const payload = {
        superid: userId
    };
    let token = jwt.sign(payload, process.env.APP_SECRET);

    let options = {
        maxAge: 90000000,
        httpOnly: true
    }
    res.cookie('adminSessionToken', token, options);
    res.header('Access-Control-Allow-Credentials', 'true');
}

module.exports = {
    loginUser,
    loginAdmin
}

// console.log(process.env.APP_SECRET)