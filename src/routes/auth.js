const express = require("express");
const bcrypt = require('bcrypt')
const {validateSignUpData} = require('../utils/validation')
const User = require('../models/user')
const validator = require('validator')

const authRouter = express.Router()

//POST api to signup the user
authRouter.post('/signup',async(req,res)=>{
    
    // console.log(req.body);
    const {password,firstName,lastName,emailId} = req.body;
    
    //now req.body is exactly same as userObj
    // const userObj = {
    //     firstName: "Sachin",
    //     lastName: "Tendulkar",
    //     emailId: "sachin@tendulkar.com",
    //     password: "sachin@123",
    // }

    
    
    
    //save to db
    try {
        // Validation of data
        validateSignUpData(req)

        // Encrypt the passwords
        const passwordHash = await bcrypt.hash(password,10)
        //returns a promise as per documentation
        console.log("passwordHash: ",passwordHash);
        

        //creating new instance of User model 
        // const user = new User(req.body) //bad way of creating an instance
        // Good way is to explicitly mention all the fields
        const user = new User({
            firstName,lastName, emailId,password : passwordHash
        })

        console.log("User: ",user);

        // throw new Error("could not add to DB"); //for testing purpose  
        
        await user.save()
        console.log("Created At: ",user.createdAt);
        // console.log(user._id);
    
        res.send("User added successfully")
    } catch (error) {
        res.status(500).send("Error saving the user: "+ error.message)
    }
})

authRouter.post('/login',async (req,res) => {
    try {
        const {emailId, password} = req.body
        //validate email
        if(!validator.isEmail(emailId)){
            throw new Error("Enter a valid email id");
        }
        //If that emailId is present in DB
        const user = await User.findOne({emailId: emailId})
        // console.log("user: ",user);
        if(!user){
            throw new Error("Invalid credentials");   
        }
        

        const isValidPassword= await user.validatePassword(password)
        // console.log("Valid Password: ",isValidPassword);
        if(isValidPassword){
            const token =await user.getJWT()
            // console.log("Token inside /login: ",token);
            
            res.cookie('token',token,{expires:new Date(Date.now() + 8*3600000)})
            res.send("User login successful!!")
        }else{
            throw new Error("Invalid credentials");
        }

    } catch (error) {
        res.status(500).send("Error finding the user: "+ error.message)
    }
})

authRouter.post('/logout',async(req,res)=>{
    const {token} = req.cookies
    if(!token){
        return res.send("Already logged out")
    }
    
    
    res.cookie('token',null,{expires:new Date(Date.now())})
    //or res.clearCookie('token')
    res.send("Logged out successfully")
})

module.exports = authRouter