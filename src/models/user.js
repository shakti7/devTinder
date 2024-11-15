const mongoose = require('mongoose')
const {Schema, model}=mongoose
//or u can do mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String
    },
    password:{
        type: String
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
})

// const User = model('User',userSchema)
// module.exports = {User}

//or u can do the below
module.exports =  model('User',userSchema) 