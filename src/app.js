const express = require('express');

const app = express();

// I want to write all the middlewares coming to /admin. So I am placing /admin on top
// Handles auth middleware for all type of request (get,put,post,patch,del) 
// we can only use for get/put/post/patch/del separately
app.use('/admin',(req,res,next)=>{

    const token= 'xyz'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'

    if(isAdminAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized req")
    }
 
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