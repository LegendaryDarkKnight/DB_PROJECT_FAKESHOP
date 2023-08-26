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
        c.TOTAL_PRICE TOTAL_PRICE, c.STATUS STATUS
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
        status: 'Added'
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
     AND CUSTOMER_ID = :userID`
    const result = await database.execute(query,binds,options);
    if(result.rows.length)
        return true;
    else
        return false;
}
module.exports = {
    getCart,
    insertCart,
    updateCart,
    removeCart,
    inCart
};