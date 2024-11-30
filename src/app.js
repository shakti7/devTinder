const express = require('express');
const {connectDB} = require('./config/database');
const mongoose = require('mongoose');
const User = require('./models/user')
const {validateSignUpData}= require('./utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const user = require('./models/user');
const {userAuth} = require('./middlewares/auth')
const app = express();

//gets activated for all my Routes
app.use(express.json())
app.use(cookieParser())


// POST API to signup user
app.post('/signup',async(req,res)=>{
    
    console.log(req.body);
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

app.get('/profile',userAuth,async(req,res)=>{
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

app.post('/login',async (req,res) => {
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
        console.log("Valid Password: ",isValidPassword);
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

app.post('/sendConnectionRequest',userAuth,async (req,res,next) => {
    const {firstName} = req.user
    
    console.log("Sending a connection request");

    res.send(`${firstName } sent Connection request !!!`)
})

connectDB().then(()=>{
    console.log("DB connection established successfully.....");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on Port 7777...");
        
    });
    
}).catch((err) =>{
    console.error("Database connection can not be established!!! \n",err.message);
    
})

