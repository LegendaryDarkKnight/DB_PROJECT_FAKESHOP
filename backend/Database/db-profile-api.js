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
    
    const ans = await database.execute(`SELECT * FROM ALL_USERS WHERE USER_ID = :id`, binds, options);
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

module.exports = {
    getWallet,
    getUser,
    walletRechargeRequest,
    sendMessages,
    getMessages
};
