// console.log("Starting a new project");

const express = require('express');

const app = express();

// app.use((req, res)=>{
//     res.send("Hello from server!!!!")
// })

app.use("/",(req,res)=>{
    res.send("Home yo")
})
app.use("/test",(req,res)=>{
    res.send("Hi test route")
})
app.use("/hello",(req,res)=>{
    res.send("Hello route")
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 3000...");
    
});