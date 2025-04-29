const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
  console.log("1 handler");
  // res.send(" response - 1")
  next();
},(req,res)=>{
  console.log("2 handler");
  res.send("response -2")
})

app.listen(3000,()=>{
    console.log("server started")
});