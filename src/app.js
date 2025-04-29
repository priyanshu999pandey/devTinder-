const express = require("express");

const app = express();
const User = require("./models.js/user")
const {connectDB }= require("./config/database");

app.use(express.json())

app.post("/signup",async(req,res)=>{
  const user = new User(req.body)

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
