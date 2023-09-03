const database = require('./database');

async function logIn(email){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        email: email
    };

    const ans = await database.execute(`SELECT * FROM SITE_EMPLOYEES WHERE EMAIL_ID = :email`, binds, options);
    return ans;
}

async function getAdmin(id){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id
    };
    
    const ans = await database.execute(`SELECT * FROM SITE_EMPLOYEES WHERE EMPLOYEE_ID = :id`, binds, options);
    return ans;
}
async function getRechargeOrder(){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {};
    
    const ans = await database.execute(
        `SELECT *
        FROM WALLET_REQUEST`, 
        binds, options);
    return ans;
}

async function accept_recharge(id,time){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id,
        time: time
    };
    
    const query = ` DECLARE
          INCREASED_AMOUNT NUMBER;
          BEGIN
          SELECT REQUEST_AMOUNT INTO INCREASED_AMOUNT
          FROM WALLET_REQUEST
          WHERE USER_ID=:id AND REQUEST_TIME=:time;
          DELETE FROM WALLET_REQUEST
          WHERE USER_ID=:id AND REQUEST_TIME=:time;
          UPDATE WALLET
          SET TOTAL_CREDITS=TOTAL_CREDITS+INCREASED_AMOUNT
          WHERE WALLET_ID=:id;
          END;
                    `
    await database.execute(query,binds,options);
}

async function getAllTransaction(){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {};
    
    const ans = await database.execute(
        `SELECT t1.TRANSACTION_ID TRANSACTION_ID,t1.AMOUNT AMOUNT,t1.PURCHASING_DATE PURCHASING_DATE,p1.PRODUCT_NAME PRODUCT_NAME,u1.EMAIL_ID CUSTOMER_MAIL,u2.EMAIL_ID SHOP_MAIL
        FROM TRANSACTION t1
        JOIN CUSTOMER_ORDER c1
        ON t1.TRANSACTION_ID=c1.ORDER_ID
        JOIN PRODUCT p1
        ON p1.PRODUCT_ID=c1.PRODUCT_ID
        JOIN ALL_USERS u1
        on u1.USER_ID=c1.CUSTOMER_ID
        JOIN ALL_USERS u2
        ON u2.USER_ID=p1.SHOP_ID `, 
        binds, options);
    return ans;
}

module.exports = {
    logIn,
    getAdmin,
    getRechargeOrder,
    accept_recharge,
    getAllTransaction
}