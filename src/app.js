const express = require('express');

const app = express();

app.use('/',(error, req,res,next)=>{
    if(error){
        console.log(error.stack);
        
        res.status(500).send("Something went wrong")
    }
})

//since there is no error in the 1st API & no response is being sent so it moves /getUserData
// try-catch error handling
app.get('/getUserData',(req,res)=>{
    //Logic of DB call and get user data 
    //what if there is some error in the code
    // try {
        console.log("In getUserData API");
        
        throw new Error("Error in code");
        res.send("User data sent")
    // } catch (error) {
    //     console.log(error.message);
        
    //     res.status(500).send("Something went wrong")
    // }
    
    
})

app.use('/',(error, req,res,next)=>{
    if(error){
        console.log(error.message);
        
        res.status(500).send("Something went wrong")
    }
})


app.use('/deleteUserData',(req,res,next)=>{
    throw new Error("YO yo");
    // res.send("User Data Deleted")
})



app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});