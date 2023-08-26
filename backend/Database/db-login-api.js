const database = require('./database')


async function logIn(email) {

    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        email: email
    };

    const ans = await database.execute(`SELECT * FROM ALL_USERS WHERE EMAIL_ID = :email`, binds, options);
    return ans;
}

async function signUp(pack) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = pack;
    const query = `INSERT INTO ALL_USERS
                    (USER_ID,FIRST_NAME,LAST_NAME,USER_TYPE,
                    PASS_WORD, CONTACT, APARTMENT_NUMBER,
                    BUILDING_NUMBER, STREET, AREA, POST_CODE,
                    CITY, EMAIL_ID
                    )
                    VALUES(ALL_USERS_SEQUENCE.NEXTVAL,:firstName,:lastName,:type,
                    :password, :contact, :apartment, 
                    :building, :street, :area, :postcode,
                    :city,:email)`
    try {
        await database.execute(query, binds, options);
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    logIn,
    signUp
}