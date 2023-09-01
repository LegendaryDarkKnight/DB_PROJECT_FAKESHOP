const express = require('express')
const { userAuth } = require('../middlewares/auth');
const { test, placeOrder, getOrderList } = require('../Database/db-order-api');

const orderRouter = express.Router();

orderRouter.use(userAuth);

orderRouter.post('/place', async(req,res)=>{
    try {
        console.log(req.user.id);
        await placeOrder(req.user.id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

orderRouter.post('/return', async(req,res)=>{

})

orderRouter.post('/status', async(req,res)=>{
    
})
orderRouter.post('/test', async(req,res)=>{
    try{
        console.log(req.body.name);
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
        console.log(data);
        res.send(data);
    } catch (error) {
        
    }
    res.status(400).send();
})
module.exports = orderRouter;