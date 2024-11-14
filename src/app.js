const express = require('express');
const {adminAuth,userAuth} =require('./middlewares/auth')

const app = express();

// I want to write all the middlewares coming to /admin. So I am placing /admin on top
// Handles auth middleware for all type of request (get,put,post,patch,del) 
// we can only use for get/put/post/patch/del separately
app.use('/admin',adminAuth )

//since I have single route for user I can write in the below way
app.get('/user',userAuth ,(req,res)=>{
    res.send("User Data Sent")
})

app.get('/admin/getAllData',(req,res)=>{
    // Logic of checking if the data is authorized 
    
    res.send("All data sent")

})
app.get('/admin/deleteUser',(req,res)=>{
    // Logic of checking if the data is authorized 
    res.send('Deleted this user')
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});