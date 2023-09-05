const express = require('express');
const { logIn, getAdmin, getAllTransaction, getRechargeOrder, accept_recharge, getPendingDeliveries, DeliverProduct } = require('../Database/db-admin-api');
const { loginAdmin } = require('../utils/auth-utils');
const { userAuthAdmin } = require('../middlewares/auth');

const adminRouter = express.Router();

adminRouter.get('/getAdminData', userAuthAdmin, async(req,res) =>{
    try {
        const data = await getAdmin(req.user.id);
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

adminRouter.post('/login',async (req,res)=>{
    try {

        let results;
        results = await logIn(req.body.email.trim());
        if (results.rows.length == 0) {
            console.log('No  such user');
        }
        else {
            if (req.body.password==results.rows[0].PASS_WORD) {
               loginAdmin(res,results.rows[0].EMPLOYEE_ID);
               res.json(results);
            }
            else {
                console.log('No user');
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    res.status(401).send();
});

adminRouter.get('/logout', (req,res) =>{
    res.clearCookie('adminSessionToken');
    res.json({ message: 'Logout successful' });
});

adminRouter.get('/getTransactions',userAuthAdmin, async(req,res)=>{
    try {
        console.log('kkk1');
        const data = await getAllTransaction();

        res.send(data);
    } catch (error) {
        console.log('Not dound');
        res.status(400).send();
    }
})

adminRouter.get('/getRechargeOrder', userAuthAdmin, async(req,res)=>{
    try {
        console.log('kkk');
        const data = await getRechargeOrder();
        console.log(data);
        res.send(data);
    } catch (error) {
        
    }
    res.status(400).send();
})

adminRouter.post('/acceptrecharge', userAuthAdmin, async(req,res)=>{
    try {
        console.log(req.body)
        await accept_recharge(req.body.id);
        res.send();
    } catch (error) {
        console.log(error);
    }
})

adminRouter.get('/pendingDelivery', userAuthAdmin, async(req,res)=>{
    try {
        const data = await getPendingDeliveries(req.user.id);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

adminRouter.post('/deliver',userAuthAdmin, async(req,res)=>{
    try{
        console.log(req.user);
        await DeliverProduct(req.user.id,req.body.orderID);
        res.send();
    }
    catch(error){
        console.log('Here'+error);
    }
    res.status(400).send();

})
module.exports = adminRouter;
