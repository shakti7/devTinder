const express = require('express');
const {connectDB} = require('./config/database');
const mongoose = require('mongoose');
const User = require('./models/user')
const app = express();

//gets activated for all my Routes
app.use(express.json())

// POST API to signup user
app.post('/signup',async(req,res)=>{
    console.log(req.body);
    
    //now req.body is exactly same as userObj
    // const userObj = {
    //     firstName: "Sachin",
    //     lastName: "Tendulkar",
    //     emailId: "sachin@tendulkar.com",
    //     password: "sachin@123",
    // }

    //creating new instance of User model 
    const user = new User(req.body)


    //save to db
    try {
        // throw new Error("could not add to DB"); //for testing purpose  
        
        await user.save()
        res.send("User added successfully")
    } catch (error) {
        res.status(500).send("Error saving the user: "+ error.message)
    }
})

app.get('/user',async(req,res)=>{
    const email =req.body.emailId

    try {
        
        // await Adventure.findOne({ country: 'Croatia' }).exec();
        //users is an array
        const users =  await User.find({emailId: email}).exec()
        //If you query for something that is not there
        if(users.length === 0){
            res.status(404).send("User not found")
        }else{
            res.send(users)
        }
        
    } catch (error) {
        console.error("Error in finding data in DB: ",error.message);
        res.send("Error in finding data in DB: "+error.message)
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
        
        res.send("Error in finding data in DB")
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

