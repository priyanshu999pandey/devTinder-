const express = require("express");

const app = express();
const User = require("./models.js/user")
const {connectDB }= require("./config/database");

app.use(express.json())

app.post("/signup",async(req,res)=>{
  const user = new User(req.body)
  console.log(req.body)

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
//DELETE-USER_API
app.delete("/user",async(req,res)=>{
  const userId = req.body.userId;
  await User.findByIdAndDelete(userId)
  try{
     res.send("user deleted successfully!!!!")
  }catch(err){
    res.status(400).send("user not delted:"+err.message)
  }
})
//PATCH-USER_API
app.patch("/user/:userId",async(req,res)=>{
  const userId = req.params.userId;
  const data = req.body;
  try{
      const ALLOWED_UPDATES = [
        "userId",
        "photoURL",
        "about",
        "gender",
        "age",
        "skills",
      ];
       const isUpdateAllowed = Object.keys(data).every((k)=>
      ALLOWED_UPDATES.includes(k));

       if(!isUpdateAllowed){
        throw new Error("update not allowed")
       }
       if(data?.skills.length>10){
        throw new Error("skills should not more than 10");
       }

      const userDeleted = await User.findByIdAndUpdate(userId,data,{returnDocument:"before", runValidators:true})
      res.send("user updated successfully")
  }catch(err){
    res.status(400).send("user not updated :"+err.message)
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
