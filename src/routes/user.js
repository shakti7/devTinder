const express = require('express')
const {userAuth}= require('../middlewares/auth')
const userRouter = express.Router()
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")

const USER_SAFE_DATA = ["firstName","lastName","photoUrl","about","skills","age","gender"]

userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try {
        const user= req.user
        
        
        

        const incomingReq =await ConnectionRequest.find({
            toUserId: user._id,
            status:'interested'
        }).populate("fromUserId",USER_SAFE_DATA);

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

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    const user = req.user
    try {
        const connection = await ConnectionRequest.find({
            status:"accepted",
            $or:[{fromUserId:user._id},{toUserId:user._id}]
        }).populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);
        // console.log(connection);
        
        const data = connection.map((res)=> {
            
            if(user._id.toString() === res.fromUserId._id.toString())
                return res.toUserId
            else
                return res.fromUserId
        })
        // console.log(data);
        

        res.json({message:"Data fetched successfully",
            data
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

userRouter.get('/feed',userAuth,async(req,res)=>{
    try {
        const user = req.user;
        const loggedInUser = user._id
        const feedReq = await ConnectionRequest.find({
            $or:[{fromUserId: loggedInUser},{toUserId:loggedInUser}]
        }).select("fromUserId toUserId").populate("fromUserId","firstName")
        .populate("toUserId","firstName" )
        // console.log(feedReq);

        const hideFromUser = new Set()
        feedReq.forEach((val)=> {
            hideFromUser.add(val.fromUserId._id.toString())
            hideFromUser.add(val.toUserId._id.toString())
        })
        // console.log(hideFromUser);
        

        const showUser = await User.find({
            $and:[

                {_id: {$nin: [...hideFromUser]}},
                {_id: {$ne: loggedInUser}}
            ]
        }).select(USER_SAFE_DATA)

        // console.log(showUser);
        
        res.json({message:"Data Fetched",
            data: showUser
        })
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = userRouter