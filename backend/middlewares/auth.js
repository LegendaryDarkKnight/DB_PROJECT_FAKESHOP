const jwt = require('jsonwebtoken');

const { getUser } = require('../Database/db-profile-api');
const { getAdmin } = require('../Database/db-admin-api');

const userAuth = (req, res, next) => {
    req.user = null;
    if (req.cookies.sessionToken) {
        let token = req.cookies.sessionToken;
        console.log('Here '+token);

        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if (err) {
                console.log("Error at verifying token: " + err.message);
                next();
            } else {
                const decodedId = decoded.id;
                console.log('id '+decodedId);
                let results = await getUser(decodedId);
                if (!results || results.length == 0) {
                    console.log('auth: invalid cookie');
                }
                else {

                    let time = new Date();
                    req.user = {
                        id: decodedId,
                        EMAIL: results.rows[0].EMAIL_ID,
                    }
                }
                next();
            }
        })
    } 
    // else {
    //     next();
    // } 

}

const userAuthAdmin = (req, res, next) => {
    req.user = null;

    if (req.cookies.adminSessionToken) {
        let token = req.cookies.adminSessionToken;
        console.log('Here '+token);

        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if (err) {
                console.log("Error at verifying token: " + err.message);
                next();
            } else {
                const decodedId = decoded.superid;
                console.log('id '+decodedId);
                let results = await getAdmin(decodedId);
                if (!results || results.length == 0) {
                    console.log('auth: invalid cookie');
                }
                else {

                    let time = new Date();
                    req.user = {
                        id: decodedId,
                        EMAIL: results.rows[0].EMAIL_ID,
                    }
                }
                next();
            }
        })
    }  
    else {
        next();
    } 

}
module.exports = {
    userAuth,
    userAuthAdmin
}
// console.log(process.env.APP_SECRET)