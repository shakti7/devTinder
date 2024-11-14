const express = require('express');

const app = express();


app.get('/admin/getAllData',(req,res)=>{
    // Logic of checking if the data is authorized 
    const token= 'xy'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'
    if(isAdminAuthorized){

        res.send("All data sent")
    }else{
        res.status(401).send("Unauthorized req")
    }

})
app.get('/admin/deleteUser',(req,res)=>{
    // Logic of checking if the data is authorized 

    const token= 'xy'; //request.body.token;
    const isAdminAuthorized = token === 'xyz'
    if(isAdminAuthorized){

        res.send("Deleted the User")
    }else{
        res.status(401).send("Unauthorized req")
    }
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});