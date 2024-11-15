const mongoose = require('mongoose')

// connection to cluster
const connectDB = async ()=>{
    // await mongoose.connect('mongodb+srv://namastedev:mZ1brZnVihzCUJ2C@namastenode.ilb6e.mongodb.net/HelloWorld')
    // If devTinder not present then DB will be created
    await mongoose.connect('mongodb+srv://namastedev:mZ1brZnVihzCUJ2C@namastenode.ilb6e.mongodb.net/devTinder') 
}

module.exports = { connectDB }
