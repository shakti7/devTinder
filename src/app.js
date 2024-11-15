const express = require('express');
const {connectDB} = require('./config/database');
const app = express();



app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});