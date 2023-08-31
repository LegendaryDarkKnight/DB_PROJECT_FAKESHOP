const database = require('./database')

async function addProduct(pack, shopID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        category: pack.category,
        description: pack.description,
        stock: pack.stock,
        price: pack.price,
        rating: 0,
        shopID: shopID,
        productName: pack.productName,
        image: pack.image,
        brand: pack.brand
    };
    const query = `INSERT INTO PRODUCT
                   (PRODUCT_ID,CATEGORY,DESCRIPTION,
                    STOCK,PRICE,RATING,
                    SHOP_ID,PRODUCT_NAME,IMAGE,BRAND)
                   VALUES(PRODUCT_SEQUENCE.NEXTVAL,:category, :description, 
                    :stock, :price, :rating, :shopID, :productName, :image, :brand)`;
    
    await database.execute(query,binds,options);
}

async function removeProduct(productID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID
    };
    const query = `UPDATE PRODUCT
                   SET STOCK = 0
                   WHERE PRODUCT_ID = :productID`;
    await database.execute(query,binds,options);
}

async function updateStock(productID, stock){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID,
        stock: stock
    };
    const query = `UPDATE PRODUCT
                   SET STOCK = :stock
                   WHERE PRODUCT_ID = :productID`;
    await database.execute(query,binds,options);
}

async function updatePrice(productID, price){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID,
        price: price
    };
    const query = `UPDATE PRODUCT
                   SET PRICE = :price
                   WHERE PRODUCT_ID = :productID`;
    await database.execute(query,binds,options);
}


async function updateName(productID, productName){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        productID: productID,
        productName: productName,
    };
    const query = `UPDATE PRODUCT
                   SET PRODUCT_NAME = :productName
                   WHERE PRODUCT_ID = :productID`;
    await database.execute(query,binds,options);
}

async function getProductsOfShop(shopID){
    const options = {
        outFormat: database.options.outFormat
    };
    const binds = {
        shopID: shopID
    };
    const query = `SELECT *
                    FROM PRODUCT
                    WHERE SHOP_ID = :shopID`
    return await database.execute(query,binds,options);
}
module.exports = {
    addProduct,
    removeProduct,
    updateStock,
    updatePrice,
    updateName,
    getProductsOfShop
}