const express = require('express');

const app = express();


app.use('/',(req,res,next)=>{
    next()
    // res.send("Handling / route")
})

// app.use('/test/:user',(req,res)=>{
//     console.log(req.params);
//     res.send("Hi")
// })

app.use('/lunch',(req,res,next)=>{
    console.log("handling lunch router");
    res.send("lunch")
})
app.use('/user',( req,res,next)=>{
    console.log('Handling the route user ');
    next()
}
)
app.use('/user',(req,res,next)=>{
    console.log("handling 2nd router");
    res.send("2nd Route")
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on Port 7777...");
    
});