const express = require('express');

const app = express();

app.use('/user',(req,res,next)=>{
    console.log('Handling the route user ');
    next();
    res.send('Response!!!')
},(req,res ,next)=>{
    console.log('Handling the route user 2');
    res.send('2nd Response!!!')
    // next();
},(req,res,next)=> {
    
    console.log('Handling the route user 3');
    res.send('3rd Response!!!')
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});