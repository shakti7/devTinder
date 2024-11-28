const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    
    const token= 'xyz'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'

    if(isAdminAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized req")
    }
 
}
const userAuth = async(req,res,next)=>{
    try{
        const {token} = req.cookies
        // console.log("Tokennnn",token);
        
        if(!token)
            throw new Error("Token not found");
        
        const isValidToken = await jwt.verify(token,"DevTinder@69")
            

        const {userId} = isValidToken;

        const user = await User.findById(userId);
        if(!user)
            throw new Error("User does not exists");
        req.user = user
        next()
    }catch(err){
        console.error(err.message);
        if(err instanceof jwt.JsonWebTokenError){

            res.status(401).send("Invalid Token")
        }
        res.status(400).send("Error: "+err.message)
    }
 
}

module.exports={
    adminAuth,
    userAuth
}