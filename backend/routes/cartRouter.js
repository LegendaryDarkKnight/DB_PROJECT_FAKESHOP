const express = require('express');
const { insertCart, getCart , updateCart, removeCart, inCart, updateCartStatus, getDeliveryCharge} = require('../Database/db-cart-api');
const { userAuth } = require('../middlewares/auth');

const cartRouter = express.Router();

cartRouter.use(userAuth);

cartRouter.post('/insert', async(req,res) =>{
    try{
        console.log(req.user);
        await insertCart(req.user.id,req.body.productID,req.body.amount,req.body.totalPrice)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
}) // passed

cartRouter.post('/update', async(req,res) =>{
    try{
        console.log(req.user);
        await updateCart(req.user.id,req.body.productID,req.body.amount,req.body.totalPrice)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
}) //passed

cartRouter.post('/remove', async(req,res) =>{
    try{
        console.log(req.user);
        await removeCart(req.user.id,req.body.productID)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
})

cartRouter.post('/check', async(req,res) =>{
    try{
        console.log(req.user);
        const result = await inCart(req.user.id,req.body.productID)
        if(result)
         res.status(200).send({ans: "Yes"});
        else
         res.status(200).send({ans: "No"});
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
}) 

cartRouter.post('/', async (req,res)=>{
    try{
       const ans = await getCart(req.user.id);
       console.log('ans'+ans);
       res.send(ans);
    }
    catch(error){
        console.log(error);
    }
    res.status(404).send();
}) // passed
cartRouter.get('/',async (req,res)=>{
    try{
       const ans = await getCart(req.user.id);
       console.log('ans'+ans);
       res.send(ans);
    }
    catch(error){
        console.log(error);
        res.status(404).send();
    }
}) //passed

cartRouter.post('/updateStatus', async(req,res)=>{
    try{
        console.log('herr');
        await updateCartStatus(req.user.id, req.body.productID, req.body.status);
        console.log('updated');
        res.status(200).send();
    }
    catch(err){
        console.log(err);
        
    }
    res.status(400).send();
})

cartRouter.get('/deliverycharge', async(req,res)=>{
    try {
        const data = await getDeliveryCharge(req.user.id);
        res.send(data);
    } catch (error) {
        console.log(error)
    }
    res.status(400).send();
})
module.exports = cartRouter;