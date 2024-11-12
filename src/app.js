// console.log("Starting a new project");

const express = require('express');

const app = express();

// app.use((req, res)=>{
//     res.send("Hello from server!!!!")
// })

// app.use('/user',(req,res)=>{
//     res.send("HAHAAHAHHAHAHHA")
// })

app.get('/user',(req,res)=>{
    res.send({firstName: "Shakti", lastName: "Sahoo"})
})

app.post('/user',async (req,res)=>{
    console.log("Save Data to DB");
    res.send("Data successfully send to DB")
    
})

app.delete('/user',(req,res)=>{
    res.send("User deleted from DB ")
})

app.use("/test",(req,res)=>{
    res.send("Hi test route")
})


app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});