const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://priyanshu999pandey:Priyanshu_Pandey@cluster0.rldcugl.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}


