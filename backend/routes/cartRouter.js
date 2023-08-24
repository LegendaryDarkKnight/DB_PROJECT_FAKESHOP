const express = require('express');
const { insertCart, getCart , updateCart, removeCart, inCart} = require('../Database/db-cart-api');

const cartRouter = express.Router();

cartRouter.post('/insert',async(req,res) =>{
    try{
        console.log(req.body);
        await insertCart(req.body.userID,req.body.productID,req.body.amount,req.body.totalPrice)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
}) // passed

cartRouter.post('/update', async(req,res) =>{
    try{
        console.log(req.body);
        await updateCart(req.body.userID,req.body.productID,req.body.amount,req.body.totalPrice)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
}) //passed

cartRouter.post('/remove', async(req,res) =>{
    try{
        console.log(req.body);
        await removeCart(req.body.userID,req.body.productID)
        res.status(200).send();
    }
    catch(error){
        console.log(error);
    }
    res.status(500).send();
})

cartRouter.post('/check', async(req,res) =>{
    try{
        console.log(req.body);
        const result = await inCart(req.body.userID,req.body.productID)
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

cartRouter.post('/',async (req,res)=>{
    try{
       const ans = await getCart(req.body.userID);
       res.send(ans);
    }
    catch(error){
        console.log(error);
    }
    res.status(404).send();
}) // passed
cartRouter.get('/',async (req,res)=>{
    try{
       const ans = await getCart(req.query.userID);
       console.log(ans);
       res.send(ans);
    }
    catch(error){
        console.log(error);
    }
    res.status(404).send();
})
module.exports = cartRouter;