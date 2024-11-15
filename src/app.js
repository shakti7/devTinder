const express = require('express');

const app = express();

app.get('/getUserData',(req,res)=>{
    //Logic of DB call and get user data 
    //what if there is some error in the code

    throw new Error("Error in code");
    
    res.send("User Data Sent")
})

app.use('/deleteUserData',(req,res,next)=>{
    throw new Error("YO yo");
    // res.send("User Data Deleted")
})
app.use('/',(error, req,res,next)=>{
    if(error){
        console.log(error.stack);
        
        res.status(500).send("Something went wrong")
    }
})



app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});