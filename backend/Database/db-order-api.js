const database = require('./database')

async function placeOrder(customerID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID
    };
    const query = ` BEGIN
                        ADD_ORDER(:customerID);
                    END;
                    `
    await database.execute(query,binds,options);
}

async function test(name){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        name: name
    };
    const query = ` BEGIN
                        DUMMY(:name);
                    END;
                    `
    await database.execute(query,binds,options);
}

async function getOrderList(customerID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID
    };
    const query = ` SELECT p1.PRODUCT_ID PRODUCT_ID, p1.PRODUCT_NAME PRODUCT_NAME,
                    p1.IMAGE IMAGE,
                    (SELECT AMOUNT FROM TRANSACTION WHERE ORDER_ID = c1.ORDER_ID) COST,
                    TO_CHAR(c1.ORDER_DATE,'DD/MONTH/YYYY') ORDERED_ON,
                    p2.DELIVERY_STATUS DELIVERY_STATUS, TO_CHAR(p2.DELIVERY_DATE,'DD/MONTH/YYYY') DELIVERY_DATE
                    FROM CUSTOMER_ORDER c1 JOIN PURCHASED_ORDER p2
                    ON c1.ORDER_ID = p2.ORDER_ID
                    JOIN PRODUCT p1
                    ON p1.PRODUCT_ID = c1.PRODUCT_ID
                    WHERE c1.CUSTOMER_ID = :customerID
                    ORDER BY c1.ORDER_DATE DESC`
    const ans = await database.execute(query,binds,options);
    return ans;
}

async function getShopOrderList(shopID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        shopID: shopID
    };
    const query = `SELECT p1.PRODUCT_ID PRODUCT_ID, p1.PRODUCT_NAME PRODUCT_NAME,
                    p1.IMAGE IMAGE,
    (SELECT AMOUNT FROM TRANSACTION WHERE ORDER_ID = c1.ORDER_ID) COST,
    TO_CHAR(c1.ORDER_DATE,'DD/MONTH/YYYY') ORDERED_ON,
     p2.DELIVERY_STATUS DELIVERY_STATUS, TO_CHAR(p2.DELIVERY_DATE,'DD/MONTH/YYYY') DELIVERY_DATE,
    c1.CUSTOMER_ID
    FROM CUSTOMER_ORDER c1 JOIN PURCHASED_ORDER p2
    ON c1.ORDER_ID = p2.ORDER_ID
    JOIN PRODUCT p1
    ON p1.PRODUCT_ID = c1.PRODUCT_ID
    WHERE p1.PRODUCT_ID IN
    (
    SELECT p3.PRODUCT_ID
    FROM PRODUCT p3
    WHERE p3.SHOP_ID = :shopID
    )
    ORDER BY c1.ORDER_DATE DESC
    `;
    const ans = await database.execute(query,binds,options);
    return ans;
}
module.exports = {
    placeOrder,
    test,
    getOrderList,
    getShopOrderList
}