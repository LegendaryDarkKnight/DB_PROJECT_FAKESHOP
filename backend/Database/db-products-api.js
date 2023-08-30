const database = require('./database')

async function getAllProducts(){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
    };
    const query = `SELECT p.PRODUCT_ID PRODUCT_ID, p.PRODUCT_NAME PRODUCT_NAME, p.CATEGORY CATEGORY,s.SHOP_NAME SHOP_NAME
                   FROM PRODUCT p JOIN SHOP s
                   ON p.SHOP_ID = s.SHOP_ID
                   `;
    const ans = await database.execute(`SELECT * FROM PRODUCT WHERE STOCK>0`, binds, options);
    return ans;
}

async function getSingleProduct(productID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID
    };
    const query = `SELECT *
                   FROM PRODUCT
                   WHERE PRODUCT_ID = :productID
                   AND STOCK>0`;
    const ans = await database.execute(query, binds, options);
    return ans;
}

module.exports = {
    getAllProducts,
    getSingleProduct
};
