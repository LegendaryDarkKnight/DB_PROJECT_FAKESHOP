const express = require('express');

const publicRouter = express.Router();

const { logIn, signUp } = require('../Database/db-login-api');
const {getAllProducts, getSingleProduct, getAllCategory} = require('../Database/db-products-api');
const { getWallet, getUser } = require('../Database/db-profile-api');
const { loginUser } = require('../utils/auth-utils');
const { userAuth } = require('../middlewares/auth');
const { hashPass, compareHash } = require('../utils/hash-utils');

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

publicRouter.get('/logout',userAuth, (req, res) => {
    console.log('cleared');
    res.clearCookie('sessionToken');
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
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});//passed


publicRouter.get("/getProducts", async (req, res) => {
    try {
        const data = await getAllProducts();
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});//passed
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
module.exports = publicRouter;