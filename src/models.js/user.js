const mongoose = require("mongoose");
var validator = require('validator');

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
        trim:true,
       
        validate:{
            validator:function(value){
               if(!validator.isEmail(value) ){
                throw new Error("Email is not valid"+value)
               }
            }
           
        }
       
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
               if(!validator.isStrongPassword(value) ){
                throw new Error("password is not strong "+value)
               }
            }
           
        }
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
        default:"https://www.shutterstock.com/image-vector/male-avatar-profile-picture-vector-149083895",
        validate:{
            validator:function(value){
               if(!validator.isURL(value) ){
                throw new Error("url is not valid"+value)
               }
            }
           
        }
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