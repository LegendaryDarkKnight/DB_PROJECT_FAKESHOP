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
module.exports = {
    getWallet,
    getUser,
    walletRechargeRequest
};