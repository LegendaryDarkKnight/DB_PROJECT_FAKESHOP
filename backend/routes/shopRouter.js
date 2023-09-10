const express = require('express');

const { userAuth } = require('../middlewares/auth');
const { addProduct, removeProduct, updateStock, updatePrice, updateName, getProductsOfShop, dispatchProduct, addOffer } = require('../Database/db-shop-api');

const shopRouter = express.Router();

shopRouter.use(userAuth);

shopRouter.get('/getProducts', async(req,res)=>{
    try {
        console.log(req.user.id);
        const data = await getProductsOfShop(req.user.id);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(500).send();
})

shopRouter.post('/add', async(req,res)=>{
    try {
        console.log(req.user.id);
        console.log(req.body);
        await addProduct(req.body,req.user.id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
    }
    res.status(500).send();
})

shopRouter.post('/remove', async(req,res)=>{
    try {
        console.log(req.user);
        await removeProduct(req.body.productID);
        res.send(200).send();
    } catch (error) {
        console.log(error);
    }
    res.status(500).send();
})

shopRouter.post('/update', async(req,res)=>{
    console.log(req.body.type);
    console.log(req.user.id);
    console.log(req.body);
    try {   
        if(req.body.type == 'stock'){
            await updateStock(req.body.productID,req.body.stock);
        }
        else if(req.body.type == 'price'){
            await updatePrice(req.body.productID, req.body.price);
        }
        else if(req.body.type == 'name'){
            await updateName(req.bofy.productID,req.body.price);
        }
        else if(req.body.type == 'all'){
            await updateStock(req.body.productID,req.body.stock);
            await updatePrice(req.body.productID, req.body.price);
            await updateName(req.body.productID,req.body.name);
        }
        res.status(200).send({"status":"done"});

    } catch (error) {
        
    }
    res.status(400).send();
})

shopRouter.post('/dispatch', async(req,res)=>{
    try {
        console.log('Request Body');
        console.log(req.body);
        await dispatchProduct(req.body.orderID);
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(404).send();
})

shopRouter.post('/addOffer', async(req,res)=>{
    try {
        console.log(req.body);
        if(req.body.offerType == 'DISCOUNT')
            req.body.amount = req.body.discRate;
        await addOffer(req.body.offerName,req.body.validity,req.body.productID,req.body.offerType,req.body.amount,req.body.minAmount);
    } catch (error) {
        console.log(error);
    }
    res.send();
})
module.exports = shopRouter;