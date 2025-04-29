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

// GET-USER_API: get user by email
app.get("/user",async(req,res)=>{
  const userByEmail = req.body.email;
  const user = await User.find({email:userByEmail})

  try{
    if(user.length ===0){
      res.status(400).send("somthing went wrong")
    }else{
      res.send(user);
    }
  }catch(err){
    res.status(400).send("somthing went wrong : "+ err.message)
  }
})

//GET-FEED_API: feed 
app.get("/feed",async(req,res)=>{
  const feed = await User.find({});

  try{
    if(feed.length===0){
      res.status(400).send("somthing went wrong ")
    }else{
      res.send(feed)
    }

  }catch(err){
    res.status(400).send("something went wrong:"+err.message)
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
