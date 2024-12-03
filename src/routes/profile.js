const express = require("express");
const validator = require('validator')
const {userAuth} = require("../middlewares/auth");
const { validateProfileEdit } = require("../utils/validation");

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


module.exports = profileRouter