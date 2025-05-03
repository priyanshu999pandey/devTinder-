const jwt = require("jsonwebtoken")
const User = require("../models.js/user")
const userAuth = async(req,res,next)=>{
   try{
     //getting token  from cookies
     const cookies = req.cookies
     const {token} = cookies
    //verifing token
      const decodeObj = await jwt.verify(token,"pandeyJII")
    //   console.log(decodeObj)
      const{_id} = decodeObj
    // find user
    const user  = await User.findById(_id)
    if(!user){
        throw new Error("user not found")
    }
    req.user = user;
    next();

   }catch(err){
    res.status(400).send("ERROR : "+err.messsage)
   }
}
module.exports = {
    userAuth,
}