const database = require('./database')
const bcrypt = require('bcrypt');

async function logIn(email) {

    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        email: email
    };
    const query =
    `
    SELECT *
    FROM ALL_USERS a JOIN WALLET w
    ON a.USER_ID = w.WALLET_ID
    LEFT JOIN CUSTOMER c
    ON a.USER_ID = c.CUSTOMER_ID
    WHERE a.EMAIL_ID = :email
    `;
    // const ans = await database.execute(`SELECT * FROM ALL_USERS WHERE EMAIL_ID = :email`, binds, options);
    const ans = await database.execute(query,binds,options);
    // console.log(ans);
    return ans;
}

// async function signUp(pack) {
//     const options = {
//         outFormat: database.options.outFormat
//     };
//     const binds = pack;
//     const query = `INSERT INTO ALL_USERS
//                     (USER_ID,FIRST_NAME,LAST_NAME,USER_TYPE,
//                     PASS_WORD, CONTACT, APARTMENT_NUMBER,
//                     BUILDING_NUMBER, STREET, AREA, POST_CODE,
//                     CITY, EMAIL_ID
//                     )
//                     VALUES(ALL_USERS_SEQUENCE.NEXTVAL,:firstName,:lastName,:type,
//                     :password, :contact, :apartment, 
//                     :building, :street, :area, :postcode,
//                     :city,:email)`
//     try {
//         await database.execute(query, binds, options);
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

async function signUp(pack) {
    const options = {
        outFormat: database.options.outFormat
    };
    
    // Hash the user's password using bcrypt
    const hashedPassword = bcrypt.hashSync(pack.password, 10); // Use a salt round of 10

    const binds = {
        ...pack, // Include all the original data
        password: hashedPassword // Replace the original password with the hashed one
    };

    console.log(binds);
    const query = `INSERT INTO ALL_USERS
                    (USER_ID, FIRST_NAME, LAST_NAME, USER_TYPE,
                    PASS_WORD, CONTACT, APARTMENT_NUMBER,
                    BUILDING_NUMBER, STREET, AREA, POST_CODE,
                    CITY, EMAIL_ID
                    )
                    VALUES(ALL_USERS_SEQUENCE.NEXTVAL, :firstName, :lastName, :type,
                    :password, :contact, :apartment, 
                    :building, :street, :area, :postcode,
                    :city, :email)`;

    try {
        await database.execute(query, binds, options);
    } catch (err) {
        console.log(err);
    }
}

async function loginLogTable(uid)
{
  const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      userID:uid
    };
    const query=`INSERT INTO LOG_TABLE(USER_ID,LOG_IN_TIME)
          VALUES(:userID,SYSDATE)
          `
    await database.execute(query,binds,options);
}

async function logoutLogTable(uid)
{
  const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      userID:uid
    };
    const query=`UPDATE LOG_TABLE
          SET LOG_OUT_TIME=SYSDATE
          WHERE USER_ID=:userID AND LOG_OUT_TIME IS NULL
          `
    await database.execute(query,binds,options);
}

module.exports = {
    logIn,
    signUp,
    loginLogTable,
    logoutLogTable
}