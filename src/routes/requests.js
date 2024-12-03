const express = require('express')
const {userAuth} = require('../middlewares/auth')
const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest',userAuth,async (req,res) => {
    const {firstName} = req.user
    
    console.log("Sending a connection request");

    res.send(`${firstName } sent Connection request !!!`)
})


module.exports = requestRouter