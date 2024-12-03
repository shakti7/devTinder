const express = require("express");
const {userAuth} = require("../middlewares/auth")

const profileRouter = express.Router();

profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        // console.log(req.cookies);
        // console.log(req.signedCookies);
        const user = req.user
        // console.log("user: ",user);
                

        res.send(user)
    }catch (error) {
        console.error(error);
        
        res.status(400).send("Unauthorized user")
    }
    
})


module.exports = profileRouter