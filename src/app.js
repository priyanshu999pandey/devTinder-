const express = require("express");

const app = express();
const User = require("./models.js/user")
const {connectDB }= require("./config/database");


app.post("/signup",async(req,res)=>{
  const user = new User({
    firstName:"priyanshu",
    lastName:"pandey",
    age:19,
    gender:"male",
    email:"priyanhsu@pandey",
    password:"priyanhsu@123"
  })

  try{
    await user.save();
   res.send("user Added successsfully");
  }catch(err){
     res.status(400).send(" usern not added:"+err.message)
  }
})



 connectDB().then(()=>{
  console.log("databse connected successfully");
  app.listen(7777,()=>{
    console.log("server started")
});
}).catch((err)=>{
  console.error("databse not connected");
})
