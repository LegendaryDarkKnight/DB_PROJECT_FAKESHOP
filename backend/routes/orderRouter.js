const express = require('express')
const { userAuth } = require('../middlewares/auth')

const orderRouter = express.Router();

orderRouter.use(userAuth);

orderRouter.post('/place', async(req,res)=>{

})

orderRouter.post('/return', async(req,res)=>{

})

orderRouter.post('/status', async(req,res)=>{
    
})