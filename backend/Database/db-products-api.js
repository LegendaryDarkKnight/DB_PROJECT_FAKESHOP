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
    const ans = await database.execute(`SELECT * FROM PRODUCT`, binds, options);
    return ans;
}

module.exports = getAllProducts;
