const express = require('express')
const {userAuth} = require('../middlewares/auth');
const { validateSendRequest } = require('../utils/validation');
const requestRouter = express.Router();
const ConnectRequest = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post('/request/send/:status/:toUserId',userAuth,async (req,res) => {
    try {
        const toUserId = req.params.toUserId
        const status = req.params.status
        const fromUserId = req.user._id
        // console.log(typeof fromUserId.toString(), typeof toUserId);
        
        const toUser = await User.findById(toUserId)
        await validateSendRequest(req)
        // console.log(toUserId, fromUserId);
        const prevExist = await ConnectRequest.findOne({$or:[
             {toUserId,fromUserId},
            {fromUserId: toUserId, toUserId:fromUserId}
        ]})
        // console.log(prevExist);

        if(prevExist){
            throw new Error("Connection already exists");
            
        }
        
        
        const connect =  new ConnectRequest({toUserId,fromUserId,status})

        // console.log(connect);
        
        const data= await connect.save()
        let message;
        message= (status == 'interested')? `${req.user.firstName} is ${status} in ${toUser.firstName}` :
        `${req.user.firstName} ${status} ${toUser.firstName}`

        res.json({
            data,
            message 
        })
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const requestId = req.params.requestId;
        const inputStatus = req.params.status;
        // console.log(loggedInUser._id);
        
        // console.log("Status:  ",status);
        // return res.send('Testing')

        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(inputStatus)){
            throw new Error("Invalid status");
        }

        const isValidId = await ConnectRequest.findOne({_id: requestId, toUserId:loggedInUser._id, status:'interested'})
        // console.log(isValidId);
        

        if(!isValidId){
            throw new Error("Connection Request not found");  
        }
        
        const connection = isValidId;
        connection.status = inputStatus
        
        const data = await connection.save()
        res.json({
            data,
            message: "Connection Request "+inputStatus
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = requestRouter