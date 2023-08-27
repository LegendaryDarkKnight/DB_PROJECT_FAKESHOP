const jwt = require('jsonwebtoken');

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
                console.log('id '+decodedId);
                let results = await getUser(decodedId);
                console.log('user '+results.rows[0]);
                if (results.length == 0) {
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
}
module.exports = {
    userAuth
}
// console.log(process.env.APP_SECRET)