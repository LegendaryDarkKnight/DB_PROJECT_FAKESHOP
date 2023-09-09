const database = require('./database')


async function getWallet(id){
    
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id
    };
    
    const ans = await database.execute(`SELECT TOTAL_CREDITS FROM WALLET WHERE WALLET_ID = :id`, binds, options);
    return ans;
}
async function getUser(id){
    
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id
    };
    
    const query =
    `
    SELECT *
    FROM ALL_USERS a JOIN WALLET w
    ON a.USER_ID = w.WALLET_ID
    LEFT JOIN CUSTOMER c
    ON a.USER_ID = c.CUSTOMER_ID
    WHERE a.USER_ID = :id
    `;
    const ans = await database.execute(query,binds,options);
    console.log(ans);
    // const ans = await database.execute(`SELECT * FROM ALL_USERS WHERE USER_ID = :id`, binds, options);
    return ans;
}

async function walletRechargeRequest(id,amount){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id,
        amount: amount,
    };
    
    const query = ` INSERT INTO WALLET_REQUEST
                    (USER_ID,REQUEST_TIME,REQUEST_AMOUNT)
                    VALUES(:id,SYSDATE,:amount)
                    `
    await database.execute(query,binds,options);
}

async function sendMessages(user1,user2,text1){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        user1: user1,
        user2: user2,
        text1: text1
    };
    const query = ` 
    BEGIN
        MESSAGE_WRITE(:user1, :user2, :text1);            
    END;
    `
    await database.execute(query,binds,options);
}

async function getMessages(user1,user2){
    const options = {
        outFormat: database.options.outFormat
    };
    
    const binds = {
        user1: user1,
        user2: user2,
    };
    const query = ` 
    SELECT *
    FROM MESSAGE NATURAL JOIN TRANSFER_MESSAGE
    WHERE (FROM_USER = :user1 AND TO_USER = :user2)
    OR (TO_USER = :user1 AND FROM_USER = :user2)
    ORDER BY TIME_STAMP
    `
    return await database.execute(query,binds,options);
}

async function getMessageList(user1){
    const options = {
        outFormat: database.options.outFormat
    }
    const binds = {
        user1: user1
    }
    const query = `
    SELECT a.EMAIL_ID EMAIL, m.TIME_STAMP TIME_STAMP, a.USER_ID USER_ID
    FROM ALL_USERS a
    JOIN TRANSFER_MESSAGE t
    ON a.USER_ID = t.FROM_USER
    JOIN MESSAGE m 
    ON m.MESSAGE_ID = t.MESSAGE_ID
    WHERE m.TIME_STAMP >= ALL
    (SELECT m1.TIME_STAMP
    FROM ALL_USERS a1
    JOIN TRANSFER_MESSAGE t1
    ON a1.USER_ID = t1.FROM_USER
    JOIN MESSAGE m1 
    ON m1.MESSAGE_ID = t1.MESSAGE_ID
    WHERE a.USER_ID = a1.USER_ID													
    ) AND t.TO_USER = :user1
    ORDER BY m.TIME_STAMP DESC
    `
    const ans = database.execute(query,binds,options);
    return ans;
}
module.exports = {
    getWallet,
    getUser,
    walletRechargeRequest,
    sendMessages,
    getMessages,
    getMessageList
};
