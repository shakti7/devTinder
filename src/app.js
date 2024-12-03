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
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/requests');
const app = express();

//gets activated for all my Routes
app.use(express.json())
app.use(cookieParser())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)





connectDB().then(()=>{
    console.log("DB connection established successfully.....");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on Port 7777...");
        
    });
    
}).catch((err) =>{
    console.error("Database connection can not be established!!! \n",err.message);
    
})

