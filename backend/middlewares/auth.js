const jwt = require('jsonwebtoken');

const { logIn } = require('../Database/db-login-api');
const { getUser } = require('../Database/db-profile-api');

const userAuth = (req, res, next) => {
    req.user = null;
    if (req.cookies.sessionToken) {
        let token = req.cookies.sessionToken;

        jwt.verify(token, process.env.APP_SECRET, async (err, decoded) => {
            if (err) {
                console.log("Error at verifying token: " + err.message);
                next();
            } else {
                const decodedId = decoded.id;
                let results = await getUser(decodedId);
                if (results.length == 0) {
                    console.log('auth: invalid cookie');
                }
                else {

                    let time = new Date();
                    req.user = {
                        id: decodedId,
                        EMAIL: results[0].EMAIL,
                        NAME: results[0].NAME,
                        IMAGE: results[0].IMAGE
                    }
                }
                next();
            }
        })
    }
}
module.exports = {
    userAuth
}
// console.log(process.env.APP_SECRET)