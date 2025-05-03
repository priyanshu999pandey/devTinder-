const express = require("express");
const authRouter = express.Router();
const {validatingSignUpData} = require("../utills.js/validation");
const bcrypt = require("bcrypt");
const User = require("../models.js/user");
const jwt = require("jsonwebtoken");



authRouter.post("/signup",async(req,res)=>{
    const {firstName,lastname,email,password} = req.body;
   
    try{
    // validation of data
    validatingSignUpData(req);
  
    // encryption of password
    const passwordHash = await bcrypt.hash(password,10);
    // console.log(password);
  
    const user = new User({
      firstName,
      lastname,
      email,
      password:passwordHash,
    })
    // console.log(req.body)
  
   
     await user.save();
     res.send("user Added successsfully");
    }catch(err){
       res.status(400).send("ERROR:"+err.message)
    }
  });

authRouter.post("/login",async(req,res)=>{
    try{
     const {email,password} = req.body;
 
     const user = await User.findOne({email:email})
     // console.log(user);
     if(!user){
       throw new Error("email is not present in db")
     }
 
     const isPasswordValid = await bcrypt.compare(password,user.password);
     if(!isPasswordValid){
       throw new Error("password is not valid");
     }else{
     
       // creating jwt token
       const token = jwt.sign({_id:user._id},"pandeyJII",{expiresIn:"10d"});
       console.log("token : "+token)
     //  sending cookie
       res.cookie("token",token,{ expires: new Date(Date.now() + 900000), httpOnly: true })
       res.send("login successsfully!!")
     }
 
    }catch(err){
     res.status(400).send("ERROR : "+err.message)
    }
 })

 module.exports = authRouter;