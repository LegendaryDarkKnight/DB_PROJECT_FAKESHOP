const database = require('./database')


async function logIn(email){
    
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        email: email
    };
    
    const ans = await database.execute(`SELECT * FROM ALL_USERS WHERE EMAIL_ID = :email`, binds, options);
    return ans;
}

module.exports = {
    logIn
}