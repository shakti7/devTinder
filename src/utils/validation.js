const validator = require('validator')

const validateSignUpData = (req) =>{
    const {firstName, lastName, password, emailId} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!");
    }
    //we can avoid this check as we have handled this at schema level
    // else if(firstName.length < 4 || firstName.length > 50){
    //     throw new Error("FirstName should be 4-50 characters");
    // }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong Password");
    }
}

const validateProfileEdit =(req)=>{
    const allowedFields =["firstName","lastName","emailId","age","gender","photoUrl","about","skills"]
    const isValidField = Object.keys(req.body).every((key)=>{
        return allowedFields.includes(key)
    })
    // console.log("isValidField: ",isValidField);

    return isValidField
}

module.exports={validateSignUpData,validateProfileEdit}