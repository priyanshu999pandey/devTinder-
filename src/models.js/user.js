const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:5,
        maxLength:50
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        validate:{
            validator:function(value){
               if(!["male","female","other"].includes(value)){
                   throw new Error("gender is not valid")
               }
            }
           }
    },
    age:{
        type:Number,
        
    },
    photoURL:{
        type:String,
        default:"https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-149083895"
    },
    about:{
        type:String,
        default:"About youself qualification"
    },
    skills:{
        type:[String],
    }

},{
    timestamps:true
})

const User = mongoose.model("user",userSchema);
module.exports = User;