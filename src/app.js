const express = require('express');

const app = express();

// will match /user, /user/xyz, /user/1
// app.get('/user',(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })

//work for /ac,/abc
// app.get('/ab?c',(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })


// app.get('/ab+c',(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })

// app.get('/ab*cd',(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })
// app.get('/a(bc)?d',(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })

//regex
// app.get(/a/,(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })
// app.get(/.*fly$/,(req,res)=>{
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })
// app.get('/user',(req,res)=>{
//     console.log(req.query);
    
//     res.send({firstName: "Shakti", lastName: "Sahoo"})
// })
app.get('/user/:userId/:name/:password',(req,res)=>{
    // console.log(req.query);
    console.log(req.params);
    
    res.send({firstName: "Shakti", lastName: "Sahoo"})
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});