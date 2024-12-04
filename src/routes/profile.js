const express = require("express");
const validator = require('validator')
const {userAuth} = require("../middlewares/auth");
const { validateProfileEdit } = require("../utils/validation");
const bcrypt = require('bcrypt')

const profileRouter = express.Router();

profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        // console.log(req.cookies);
        // console.log(req.signedCookies);
        const user = req.user
        // console.log("user: ",user);
                

        res.send(user)
    }catch (error) {
        console.error(error);
        
        res.status(400).send("Unauthorized user")
    }
    
})

profileRouter.patch('/profile/edit',userAuth,async (req,res) => {
    try {

        if(!validateProfileEdit(req)){
            throw new Error("Invalid Field");
            // return res.status(400).send("Invalid Field")
        }

        const{age,gender,photoUrl,about,skills} = req.body
    
        if(age && age < 18){
            throw new Error("User should be atleast 18 years of age");
        }
        if(gender){
            const allowedGender = ["male","female","others"]
            const isValidGender = allowedGender.includes(gender.trim().toLowerCase())
        
            console.log("Valid Gender: ",isValidGender);
            if(!isValidGender){
                throw new Error("Invalid gender");
            }
        }
        if(photoUrl){
            if(!validator.isURL(photoUrl)){
                throw new Error("Invalid photo url");
                
            }
        }
        if(about){
            // console.log(about.length);
            if(about.length > 300){
                throw new Error("Description should not be more than 300 characters");
            }
        }
        if(skills){
            if(skills.length > 10){
                throw new Error("user can not enter more than 10 skills");         
            }
        }
        
        const loggedInUser = req.user 
        // console.log(loggedInUser);
        
        // loggedInUser.age = age //Bad Practice
        Object.keys(req.body).forEach((key)=> loggedInUser[key] = req.body[key])
        console.log(loggedInUser);
        
        await loggedInUser.save()

        // res.send(`${loggedInUser.firstName},your profile updated successfully`)
        res.json({
            "message":`${loggedInUser.firstName},your profile updated successfully`,
            data: loggedInUser
        })
    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }    
})

profileRouter.patch('/profile/password',userAuth,async (req,res) => {
    try {
        const loggedInUser = req.user;
        if(Object.keys(req.body).length ===0){
            throw new Error("Provide the new password");
        }
        const isValidField =Object.keys(req.body).every((key)=>["password"].includes(key))  
        // console.log(isValidField);
        if(!isValidField){
            throw new Error("Invalid entries found!!! Please provide new password only..");
            
        }
        const {password} = req.body
        const maxLength =64
        const minLength = 8

        if(password.length < minLength || password.length>maxLength){
            throw new Error(`Password should be between ${minLength} and ${maxLength} characters`);
        }
        
        if(!validator.isStrongPassword(password)){
            throw new Error("Enter a strong password");
        }
        // console.log(validator.isStrongPassword(password));
        //old pw: $2b$10$F6bOycU.p.VBxoHG03McAOWVDKH537qH8zayWMf59mIRCX1YsqQ4G
        
        //new pw: $2b$10$4l3PCb5mTXNCz9HrnBsXruBE13bM5ITaBJkJgxEyMsqEiDE0EAw1u
        const checkPrevPassword = await bcrypt.compare(password,loggedInUser.password)
        // console.log(checkPrevPassword);
        if(checkPrevPassword){
            return res.status(400).json({
                message: "New password must be different from the current password."
            })
        }

        
        const hashedPassword = await bcrypt.hash(password,10);

        
        // console.log(hashedPassword);
        loggedInUser.password = hashedPassword

        await loggedInUser.save();

        // console.log(loggedInUser);
        
        res.json({message: "Password changed successfully!!!"})
                 
    } catch (error) {
        res.status(400).send("Error: "+error.message)
    }
})

module.exports = profileRouter