const express = require('express');

const publicRouter = express.Router();

const { logIn, signUp } = require('../Database/db-login-api');
const getAllProducts = require('../Database/db-products-api');
const { getWallet, getUser } = require('../Database/db-profile-api');
const { loginUser } = require('../utils/auth-utils');
const { userAuth } = require('../middlewares/auth');

publicRouter.post('/login', async (req, res) => {
    try {
        let results;
        results = await logIn(req.body.email.trim());
        if (results.rows.length == 0) {
            console.log('No  such user');
        }
        else {
            if (results.rows[0].PASS_WORD == req.body.password) {
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
    res.clearCookie('userID');
    res.json({ message: 'Logout successful' });
});
// publicRouter.post('/logindata', async (req, res) => {
//     console.log(req.body.email);
//     const name = req.body.email.trim();
//     const data = await logIn(name);
//     res.send(data);
// }); //passed

publicRouter.post("/getWalletStatus", userAuth, async (req, res) => {
    try {
        const data = await getWallet(req.user.id);
        res.send(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});//passed

// publicRouter.post("/getUserData", async (req, res) => {
//     try {
//         const id = req.body.id; // Assuming you're passing the id as a query parameter
//         const data = await getUser(id);
//         res.send(data);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });//passed

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

publicRouter.post('/signup', async(req,res)=>{
    try {
        console.log(req.body);
        await signUp(req.body);
    } catch (error) {
        console.log(error)
    }
})
module.exports = publicRouter;