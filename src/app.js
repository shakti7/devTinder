const express = require('express');
const {connectDB} = require('./config/database');
const app = express();

connectDB().then(()=>{
    console.log("DB connection established successfully.....");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on Port 7777...");
        
    });
    
}).catch((err) =>{
    console.error("Database connection can not be established!!! \n",err.message);
    
})

