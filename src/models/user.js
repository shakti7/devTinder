const mongoose = require('mongoose')
const {Schema, model}=mongoose
//or u can do mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        min: 18
    },
    gender:{
        type: String,
        trim:true,
        validate(value){
            if(!["male","female","others"].includes(value.toLowerCase())){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://giftolexia.com/wp-content/uploads/2015/11/dummy-profile.png"
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    },
    skills: {
        type: [String]
    }
}, {timestamps: true})

// const User = model('User',userSchema)
// module.exports = {User}

//or u can do the below
module.exports =  model('User',userSchema) 