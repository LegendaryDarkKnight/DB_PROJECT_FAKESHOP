const database = require('./database')


async function getCart(id){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        id: id
    };
    
    const ans = await database.execute(
        `SELECT p.PRODUCT_ID PRODUCT_ID,p.PRODUCT_NAME PRODUCT_NAME,
        p.PRICE PRICE, c.AMOUNT QUANTITY, p.STOCK STOCK,
        c.TOTAL_PRICE TOTAL_PRICE, c.STATUS STATUS, p.IMAGE IMAGE
        FROM CART c JOIN PRODUCT p
        ON c.PRODUCT_ID = p.PRODUCT_ID
        WHERE CUSTOMER_ID = :id`, 
        binds, options);
    return ans;
}

async function insertCart(userID,productID,amount,totalPrice){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        userID: userID,
        productID: productID,
        amount: amount,
        totalPrice: totalPrice,
        status: 'ADDED'
    }
    const query = 
    `INSERT INTO CART(CUSTOMER_ID,PRODUCT_ID,AMOUNT,TOTAL_PRICE,STATUS)
    VALUES(:userID,:productID,:amount,:totalPrice,:status)`;
    await database.execute(query,binds,options);
}

async function updateCart(userID,productID, amount, totalPrice){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        userID: userID,
        productID: productID,
        amount: amount,
        totalPrice: totalPrice
    }
    const query = 
    `UPDATE CART
     SET AMOUNT = :amount, TOTAL_PRICE = :totalPrice
     WHERE CUSTOMER_ID = :userID AND
     PRODUCT_ID = :productID`
    await database.execute(query,binds,options)
}

async function removeCart(userID,productID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        userID: userID,
        productID: productID
    }
    const query =
    `DELETE FROM CART
     WHERE CUSTOMER_ID = :userID 
     AND PRODUCT_ID = :productID`;
    await database.execute(query,binds,options);
}

async function inCart(userID,productID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        userID: userID,
        productID: productID
    }
    const query =
    `SELECT STATUS
     FROM CART
     WHERE PRODUCT_ID = :productID 
     AND CUSTOMER_ID = :userID`;
     
    const result = await database.execute(query,binds,options);
    if(result.rows.length)
        return true;
    else
        return false;
}

async function updateCartStatus(userID,productID, status){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        userID: userID,
        productID: productID,
        status: status
    }
    const query =
    `UPDATE CART
    SET STATUS = :status
    WHERE CUSTOMER_ID = :userID
    AND PRODUCT_ID = :productID`;

    await database.execute(query,binds,options);
}

async function getDeliveryCharge(userID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds ={
        userID: userID
    }
    const query = 
    `SELECT DELIVERY_CHARGE(:userID) DELIVERY_CHARGE FROM DUAL`
    const ans = database.execute(query,binds,options);
    return ans;
}

async function getDeliveryOffer(userID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds ={
        userID: userID
    }
    const query = 
    `SELECT FIND_DELIVERY_OFFER(:userID) DELIVERY_OFFER FROM DUAL`
    const ans = database.execute(query,binds,options);
    return ans;
}

async function getPriceCut(userID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds ={
        userID: userID
    }
    const query =
    `
    SELECT CALCULATE_OFFER(:userID) PRICE_CUT FROM DUAL
    `
    const ans = database.execute(query,binds,options);
    return ans;
}
module.exports = {
    getCart,
    insertCart,
    updateCart,
    removeCart,
    inCart,
    updateCartStatus,
    getDeliveryCharge,
    getDeliveryOffer,
    getPriceCut
};