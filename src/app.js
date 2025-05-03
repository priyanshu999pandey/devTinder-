const express = require("express");
const app = express();
const {connectDB }= require("./config/database");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter,profileRouter,requestRouter);

 connectDB().then(()=>{
  console.log("databse connected successfully");
  app.listen(7777,()=>{
    console.log("server started")
});
}).catch((err)=>{
  console.error("databse not connected");
})
