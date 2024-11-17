const express = require('express');
const {connectDB} = require('./config/database');
const mongoose = require('mongoose');
const User = require('./models/user')
const {validateSignUpData}= require('./utils/validation')
const bcrypt = require('bcrypt')
const validator = require('validator')
const app = express();

//gets activated for all my Routes
app.use(express.json())

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
        res.send("User added successfully")
    } catch (error) {
        res.status(500).send("Error saving the user: "+ error.message)
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
        

        const isValidPassword= await bcrypt.compare(password, user.password)
        console.log("Valid Password: ",isValidPassword);
        if(isValidPassword){
            res.send("User login successful!!")
        }else{
            throw new Error("Invalid credentials");
        }

    } catch (error) {
        res.status(500).send("Error finding the user: "+ error.message)
    }
})

app.get('/user',async(req,res)=>{
    const email =req.body.emailId

    try {
        // To find one user & this does not return an array
        // finds the 1st doc found as per entry by default but it can be modified using sort
        // const user = await User.findOne({emailId: email})
        const user = await User.findOne({emailId: email},'firstName lastName')
        // const user = await User.findOne({})
        // user={}
        console.log(user);
        console.log(user === null);
        
        // console.log(Object.keys(user).length);
        
        if(!user || Object.keys(user).length === 0){
            res.status(404).send("User not found")
        }else{
            res.send(user)
        }
        
        // // await Adventure.findOne({ country: 'Croatia' }).exec();
        // //users is an array
        // const users =  await User.find({emailId: email}).exec()
        // //If you query for something that is not there
        // if(users.length === 0){
        //     res.status(404).send("User not found")
        // }else{
        //     res.send(users)
        // }
        
    } catch (error) {
        console.error("Error in finding data in DB: ",error.message);
        res.status(400).send("Something went wrong")
    }
})

app.get('/feed',async(req,res)=>{

    try {
        const users= await User.find({})
        // for testing the if block make sure to change const to let
        // users=[]
        if(users.length === 0 ){
            res.status(404).send("No user found in your area")
        }else{
            res.send(users)
        }
    } catch (error) {
        console.error(error);
        
        res.status(400).send("Something went wrong")
    }

})

app.delete('/user',async(req,res)=>{
    const userId = req.body.userId

    try {
        //from documentation we found this
        // const user = await User.findByIdAndDelete({_id: userId})
        const user = await User.findByIdAndDelete(userId)

        //Also handle the !user case
        console.log("User deleted is: \n",user);
        
        res.send("User Deleted successfully")
    } catch (error) {
        console.error(error);
        
        res.status(400).send("Something went wrong")
    }
})

app.patch('/user/:userId',async (req,res) => {
    // const userId = req.body.userId;
    const userId = req.params.userId
    console.log(userId);
    
    const data = req.body;

    

    console.log(data);
    try {
        // const user = await User.findByIdAndUpdate(userId, data, {returnDocument: 'before'})
        const user = await User.findByIdAndUpdate(userId, data, {
            returnDocument: 'after',
            runValidators: true
        })
        console.log(user);
        console.log("Updated At: ",user.updatedAt);

        const ALLOWED_UPDATES = ["skills","photoUrl","about","gender","age"]
    
        const isAllowedUpdates = Object.keys(data).every((k)=>{
            return ALLOWED_UPDATES.includes(k)
        })
        // console.log(Object.keys(data));
        
        console.log(isAllowedUpdates);
        
    
        if(!isAllowedUpdates){
            throw new Error("Update not allowed");
        }

        if(data?.skills.length > 10){
            throw new Error("Skills can not be more than 10");
            
        }
        res.send("User updated successfully")
    
        
    } catch (error) {
        console.error(error);
        
        res.status(400).send("UPDATE FAILED "+error.message)
    }
})


connectDB().then(()=>{
    console.log("DB connection established successfully.....");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on Port 7777...");
        
    });
    
}).catch((err) =>{
    console.error("Database connection can not be established!!! \n",err.message);
    
})

