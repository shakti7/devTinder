const mongoose = require('mongoose')
const {Schema, model}=mongoose
//or u can do mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    photoUrl: {
        type: String
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String]
    }
})

// const User = model('User',userSchema)
// module.exports = {User}

//or u can do the below
module.exports =  model('User',userSchema) 