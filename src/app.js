const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
  res.send({firstName:"priyanshu",
    lastName:"pandey"
  })
})

app.post("/user",(req,res)=>{
  res.send("posted successfully!!");
})

app.delete("/user",(req,res)=>{
 res.send("delted successfulyy!")
})

app.use("/home",(req,res)=>{
  res.send("home 99  page")
})

app.listen(3000,()=>{
    console.log("server started")
});