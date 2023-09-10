const express = require('express')
const { userAuth } = require('../middlewares/auth');
const { test, placeOrder, getOrderList, getShopOrderList, returnOrder, getReturnOrders } = require('../Database/db-order-api');


const orderRouter = express.Router();

orderRouter.use(userAuth);

orderRouter.post('/place', async(req,res)=>{
    try {
        await placeOrder(req.user.id,req.body.deliveryCharge);
        res.status(200).send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

orderRouter.post('/return', async(req,res)=>{
    try {
        await returnOrder(req.body.orderID, req.body.complainText);
        res.send()
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

orderRouter.post('/status', async(req,res)=>{
    
})
orderRouter.post('/test', async(req,res)=>{
    try{
        await test(req.body.name);
        res.status(200).send({'message':'Success'});
    }
    catch(err){
        console.log(err);
    }
    res.status(400).send();
})

orderRouter.get('/getUserOrders', async(req,res)=>{
    try {
        const data = await getOrderList(req.user.id);
        res.send(data);
    } catch (error) {
        
    }
    res.status(400).send();
})

orderRouter.get('/getReturnOrders', async(req,res)=>{
    try {
        const data = await getReturnOrders(req.user.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

orderRouter.get('/getShopOrders', async(req,res)=>{
    try {
        
        const data = await getShopOrderList(req.user.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})
module.exports = orderRouter;