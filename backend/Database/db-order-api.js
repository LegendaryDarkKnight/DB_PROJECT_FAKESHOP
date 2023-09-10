const database = require('./database')

async function placeOrder(customerID, deliveryCharge){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID,
        deliveryCharge: deliveryCharge
    };
    const query = ` BEGIN
                        ADD_ORDER(:customerID, :deliveryCharge);
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
                    p1.IMAGE IMAGE, c1.ORDER_ID ORDER_ID,
                    (SELECT AMOUNT FROM TRANSACTION WHERE ORDER_ID = c1.ORDER_ID) COST,
                    TO_CHAR(c1.ORDER_DATE,'ddth Month,YYYY') ORDERED_ON,
                    p2.DELIVERY_STATUS DELIVERY_STATUS, TO_CHAR(p2.DELIVERY_DATE,'ddth Month,YYYY') DELIVERY_DATE,
                    IS_PRESENT_IN_RETURN_ORDER(c1.ORDER_ID) STATUS
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
    
    const query = `
    SELECT p1.PRODUCT_ID PRODUCT_ID, p1.PRODUCT_NAME PRODUCT_NAME,
    p1.IMAGE IMAGE, c1.ORDER_ID ORDER_ID,
    (SELECT AMOUNT FROM TRANSACTION WHERE ORDER_ID = c1.ORDER_ID) COST,
    TO_CHAR(c1.ORDER_DATE,'ddth Month,YYYY') ORDERED_ON,
     p2.DELIVERY_STATUS DELIVERY_STATUS, TO_CHAR(p2.DELIVERY_DATE,'ddth Month,YYYY') DELIVERY_DATE,
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

async function returnOrder(orderID,complain)
{
  const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      orderID:orderID,
      complain:complain
    };
    const query=`INSERT INTO RETURN_ORDER(ORDER_ID,COMPLAINT_DESC,APPROVAL_STATUS)
           VALUES(:orderID,:complain,'PENDING')`
     await database.execute(query,binds,options);      
}

async function getReturnOrders(customerID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      customerID: customerID
    };
    const query =
    `
    SELECT PRODUCT_NAME, APPROVAL_STATUS STATUS, SHOP_NAME, 
    TO_CHAR((SELECT r.RETURN_DATE FROM RETURN_ORDER r WHERE r.ORDER_ID = RETURN_ORDER_SHOP.ORDER_ID), 'ddth Month, YYYY') RETURN_DATE
    FROM RETURN_ORDER_SHOP
    WHERE CUSTOMER_ID = :customerID
    `

    return await database.execute(query,binds,options); 
}

module.exports = {
    placeOrder,
    test,
    getOrderList,
    getShopOrderList,
    returnOrder,
    getReturnOrders
}