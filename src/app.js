const express = require("express");

const app = express();

app.use("/home",(req,res)=>{
  res.send("home 99  page")
})

app.listen(3000,()=>{
    console.log("server started")
});