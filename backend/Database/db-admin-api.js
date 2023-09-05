const database = require('./database');

async function logIn(email) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        email: email
    };

    const ans = await database.execute(`SELECT * FROM SITE_EMPLOYEES WHERE EMAIL_ID = :email`, binds, options);
    return ans;
}

async function getAdmin(id) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id
    };

    const ans = await database.execute(`SELECT * FROM SITE_EMPLOYEES WHERE EMPLOYEE_ID = :id`, binds, options);
    return ans;
}
async function getRechargeOrder() {
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

async function accept_recharge(id) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id,
    };

    const query = ` DECLARE
          INCREASED_AMOUNT NUMBER;
          U_ID NUMBER;
          BEGIN
          SELECT REQUEST_AMOUNT INTO INCREASED_AMOUNT
          FROM WALLET_REQUEST
          WHERE REQUEST_ID=:id ;
          SELECT USER_ID INTO U_ID
          FROM WALLET_REQUEST
          WHERE REQUEST_ID=:id ;
          DELETE FROM WALLET_REQUEST
          WHERE REQUEST_ID=:id ;
          UPDATE WALLET
          SET TOTAL_CREDITS=TOTAL_CREDITS+INCREASED_AMOUNT
          WHERE WALLET_ID=U_ID;
          END;
          `
    await database.execute(query, binds, options);
}

async function getAllTransaction() {
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

async function getPendingDeliveries(id) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id,
    };

    const ans = await database.execute(
    `
    SELECT p2.IMAGE IMAGE,p2.PRODUCT_ID PRODUCT_ID,p2.PRODUCT_NAME PRODUCT_NAME,
    (SELECT SHOP_NAME FROM SHOP WHERE SHOP_ID=u1.USER_ID) SHOP_NAME,
    (u2.FIRST_NAME||' '||u2.LAST_NAME) NAME,u2.CONTACT CONTACT,
    (u2.BUILDING_NUMBER||', '||u2.STREET||', '||u2.AREA||', '||u2.CITY||'-'||u2.POST_CODE) ADDRESS, 
    c2.ORDER_ID ORDER_ID
    FROM PURCHASED_ORDER p1 
    JOIN CUSTOMER_ORDER c2
    ON p1.ORDER_ID=c2.ORDER_ID
    JOIN PRODUCT p2
    ON p2.PRODUCT_ID=c2.PRODUCT_ID
    JOIN ALL_USERS u1
    ON u1.USER_ID=p2.SHOP_ID
    JOIN ALL_USERS u2
    ON u2.USER_ID=c2.CUSTOMER_ID
    WHERE UPPER(p1.DELIVERY_STATUS)='NOT DELIVERED' AND (SELECT c1.CURRENT_CITY FROM COURIER_SERVICE c1 WHERE c1.EMPLOYEE_ID=:id)=u1.CITY
    `,
    binds, options);
    return ans;
}
async function DeliverProduct(courierID,orderID)
{
   const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      courierID: courierID,
        orderID: orderID
    };
    const query=`UPDATE PURCHASED_ORDER
         SET COURIER_SERVICE_ID=:courierID,DELIVERY_DATE=SYSDATE,DELIVERY_STATUS='DELIVERED'
         WHERE ORDER_ID=:orderID AND DELIVERY_STATUS='NOT DELIVERED'
         `
   await database.execute(query, binds, options);
   
}
module.exports = {
    logIn,
    getAdmin,
    getRechargeOrder,
    accept_recharge,
    getAllTransaction,
    getPendingDeliveries,
    DeliverProduct
}