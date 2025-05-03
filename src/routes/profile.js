const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth")

profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
      
    const user = req.user
    console.log("users: "+user)
    if(!user){
      throw new Error("user not exist")
    }
  
    res.send(user)
  
    }catch(err){
      res.status(400).send("ERROR : "+err.message)
    }
  })
 module.exports = profileRouter;