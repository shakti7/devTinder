const mongoose = require('mongoose')

// connection to cluster
const connectDB = async ()=>{
    // await mongoose.connect('mongodb+srv://namastedev:mZ1brZnVihzCUJ2C@namastenode.ilb6e.mongodb.net/HelloWorld')
    // If devTinder not present then DB will be created
    await mongoose.connect('mongodb+srv://namastedev:mZ1brZnVihzCUJ2C@namastenode.ilb6e.mongodb.net/devTinder') 
}

module.exports = { connectDB }

connectDB().then(()=>{
    console.log("DB connection established successfully.....");
    
}).catch((err) =>{
    console.error("Database connection can not be established!!! \n",err.message);
    
})