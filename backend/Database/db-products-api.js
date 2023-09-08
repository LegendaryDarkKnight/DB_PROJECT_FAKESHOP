const database = require('./database')

async function getAllProducts() {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
    };

    const ans = await database.execute(`SELECT * FROM PRODUCT WHERE STOCK>0`, binds, options);
    return ans;
}

async function getSingleProduct(productID) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID
    };
    const query = `SELECT *
                   FROM PRODUCT
                   WHERE PRODUCT_ID = :productID
                   `;
    const ans = await database.execute(query, binds, options);
    return ans;
}

async function getAllCategory() {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
    };
    const query = `SELECT CATEGORY
                   FROM COMMON_INFO`;
    const ans = await database.execute(query, binds, options);
    return ans;
}

async function addRating(customerID, productID, rate) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID,
        productID: productID,
        rate: rate
    };
    const query = `
    DECLARE
    BEGIN 
        ADD_RATING(:customerID, :productID, :rate);
    END;
    `
    await database.execute(query, binds, options);
}

async function addReview(customerID, productID, comment) {

    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        customerID: customerID,
        productID: productID,
        comment1: comment
    };

    const query =
        `
    INSERT INTO REVIEW(CUSTOMER_ID, PRODUCT_ID, COMMENT_TEXT, TIME_COMMENTED)
    VALUES(:customerID, :productID, TO_CHAR(:comment1), SYSDATE)
    `;
    await database.execute(query, binds, options);
}

async function getReview(pid) {
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        pid: pid
    };

    const ans = await database.execute(
        `SELECT (SELECT u1.EMAIL_ID FROM ALL_USERS u1 WHERE u1.USER_ID=r.CUSTOMER_ID) EMAIL_ID,r.STARS STARS, GATHER_COMMENT(r.CUSTOMER_ID,:pid) ALL_COMMENT 
        FROM RATES r 
        WHERE r.PRODUCT_ID=:pid
         `,
        binds, options);
    return ans;
}
async function getBrand(category)
{
   const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
      category:category
    };
    
      const ans = await database.execute(
        `SELECT DISTINCT BRAND
         FROM PRODUCT
         WHERE CHECK_CATEGORY(:category,CATEGORY)='TRUE'
         `, 
        binds, options);
    return ans;
}

async function findProduct(name,category,minPrice,maxPrice,brand,sortingOrder)
{
   const options = {
        outFormat: database.options.outFormat
    };
    
    const binds = {
      name:name,
      category:category,
      minPrice:minPrice,
      maxPrice:maxPrice,
      brand:brand
    };
    const query = 
    `SELECT *
    FROM PRODUCT
    WHERE CHECK_NAME(:name,PRODUCT_NAME)='TRUE' AND CHECK_CATEGORY(:category,CATEGORY)='TRUE' AND CHECK_BRAND(:brand,BRAND)='TRUE' AND PRICE>=:minPrice AND PRICE<=:maxPrice AND STOCK>0
    `+(sortingOrder?sortingOrder:``);
    const ans = await database.execute( query, binds, options);
    return ans;
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getAllCategory,
    addRating,
    addReview,
    getReview,
    getBrand,
    findProduct
};
