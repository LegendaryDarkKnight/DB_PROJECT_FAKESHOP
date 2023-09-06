const express = require('express');

const publicRouter = express.Router();

const { logIn, signUp } = require('../Database/db-login-api');
const {getAllProducts, getSingleProduct, getAllCategory, addRating, addReview, getReview, getBrand, findProduct} = require('../Database/db-products-api');
const { getWallet, getUser, walletRechargeRequest, sendMessages, getMessages } = require('../Database/db-profile-api');
const { loginUser } = require('../utils/auth-utils');
const { userAuth } = require('../middlewares/auth');

publicRouter.post('/signup', async(req,res)=>{
    try {
        console.log(req.body);
        await signUp(req.body);
        res.status(200).send();
    } catch (error) {
        console.log(error)
    }
    res.status(400).send();
});

publicRouter.post('/login', async (req, res) => {
    try {
        let results;
        results = await logIn(req.body.email.trim());
        if (results.rows.length == 0) {
            console.log('No  such user');
        }
        else {
            if (req.body.password==results.rows[0].PASS_WORD) {
                loginUser(res, results.rows[0].USER_ID);
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

publicRouter.get('/logout', (req, res) => {
    res.clearCookie('sessionToken');
    console.log('cleared');
    res.json({ message: 'Logout successful' });
});


publicRouter.post("/getWalletStatus", userAuth, async (req, res) => {
    try {
        const data = await getWallet(req.user.id);
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});//passed



publicRouter.get("/getUserData", userAuth, async (req, res) => {
    try {
        const data = await getUser(req.user.id);
        res.json(data);
    } catch (error) {
        console.error("Error 2 :", error);
        res.status(500).send("Internal Server Error");
    }
});//passed


publicRouter.get("/getProducts", async (req, res) => {
    try {
        const data = await getAllProducts();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({"message":"Internal Server Error"});
    }
});//passed

publicRouter.get("/getSearchedProducts", async (req, res) => {
    try {
        console.log(req.query);
        const data = await findProduct(req.query.name,req.query.category,req.query.minPrice,req.query.maxPrice,req.query.brand,req.query.sortBy);
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({"message":"Internal Server Error"});
    }
});

publicRouter.post("/getSingleProduct", async (req, res) => {
    try {
        const data = await getSingleProduct(req.body.id);
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

publicRouter.get("/getCategory", async(req,res)=>{
    try{
        const data = await getAllCategory();
        console.log(data);
        res.send(data);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

publicRouter.post('/getBrand', async(req,res)=>{
    try{
        const data = await getBrand(req.body.category);
        console.log(data);
        res.send(data);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})
publicRouter.post('/recharge', userAuth, async(req,res)=>{
    try {
        await walletRechargeRequest(req.user.id,req.body.amount);
        res.send();
    } catch (error) {
        
    }
    res.status(400).send();
})

publicRouter.post('/addRating', userAuth, async(req,res)=>{
    try {
        await addRating(req.user.id,req.body.productID, req.body.rate);
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

publicRouter.post('/addReview', userAuth, async(req,res)=>{
    try {
        await addReview(req.user.id, req.body.productID, req.body.comment.toString());
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

publicRouter.post('/getReview', userAuth, async(req,res)=>{
    try {
        console.log('Get Review')
        console.log(req.body)
        const data = await getReview(req.body.productID);
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(400).send();
})

publicRouter.post('/sendMessages',userAuth,async (req,res)=>{
    try {
        await sendMessages(req.user.id,req.body.shopID,req.body.text1);
        res.send();
    } catch (error) {
        console.log(error);
    }
    res.status(500).send();
})

publicRouter.post('/getMessages',userAuth,async (req,res)=>{
    try {
        const data = await getMessages(req.user.id,req.body.shopID);
        console.log(data)
        res.send(data);
    } catch (error) {
        console.log(error);
    }
    res.status(500).send();
})
module.exports = publicRouter;