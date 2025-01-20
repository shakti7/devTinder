const express = require('express')
const {userAuth}= require('../middlewares/auth')
const userRouter = express.Router()
const User = require("../models/user")
const ConnectRequest = require("../models/connectionRequest")

userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try {
        const user= req.user
        
        
        

        const incomingReq =await ConnectRequest.find({
            toUserId: user._id,
            status:'interested'
        }).populate("fromUserId",["firstName","lastName","photoUrl","about","skills","age","gender"]);

        // console.log("incomingReq: ",incomingReq);
        
        res.json({
            message:"Data fetched successfully",
            data: incomingReq
        })

    } catch (error) {
        console.error(error);
        
        res.status(400).send("Unauthorized user")
    }
})

module.exports = userRouter