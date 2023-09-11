const express = require('express');
const { logIn, getAdmin, getAllTransaction, getRechargeOrder, accept_recharge, getPendingDeliveries, DeliverProduct, getPendingReturns, refuseReturnOrder, approveReturnOrder, recentLogin, loginHistory, getSomeData } = require('../Database/db-admin-api');
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

adminRouter.get('/logout', async(req,res) =>{
    res.clearCookie('adminSessionToken');
    res.json({ message: 'Logout successful' });
});

adminRouter.get('/somedata', async(req,res)=>{
    try {
        const data = await getSomeData();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
    res.status(400).send();
})
adminRouter.get('/getTransactions',userAuthAdmin, async(req,res)=>{
    try {
        const data = await getAllTransaction();
        res.send(data);
    } catch (error) {
        console.log('Not dound');
        res.status(400).send();
    }
})

adminRouter.get('/getRechargeOrder', userAuthAdmin, async(req,res)=>{
    try {
        const data = await getRechargeOrder();
        res.send(data);
    } catch (error) {
        
    }
    res.status(400).send();
})

adminRouter.post('/acceptrecharge', userAuthAdmin, async(req,res)=>{
    try {
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
        await DeliverProduct(req.user.id,req.body.orderID);
        res.send();
    }
    catch(error){
        console.log('Here'+error);
    }
    res.status(400).send();

})

adminRouter.get('/pendingReturn', userAuthAdmin, async(req,res)=>{
    try{
        const data = await getPendingReturns();
        res.send(data);
    }
    catch(error){
        console.log(error);
    }
    res.status(400).send();
})

adminRouter.post('/refuseReturn', userAuthAdmin, async(req,res)=>{
    try {

        await refuseReturnOrder(req.body.orderID);
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

adminRouter.post('/approveReturn', userAuthAdmin, async(req,res)=>{
    try {
        await approveReturnOrder(req.body.orderID,req.user.id);
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

adminRouter.get('/dailylogin', async(req,res)=>{
    try{
        const data = await recentLogin();
        res.send(data);
    }
    catch(err){
        console.log(err);
    }
    res.status(400).send();
})

adminRouter.get('/loginhistory', async(req,res)=>{
    try {
        const data = await loginHistory();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})
module.exports = adminRouter;
