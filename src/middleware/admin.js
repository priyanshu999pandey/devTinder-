const AdminAuth =  (req,res,next)=>{
    console.log("admin authentication");
    const token = "xyz";
    const authentication = token==="xyz";
     if(!authentication){
       res.status(401).send("unautheticated admin")
       
     }else{
       next();
     }
 }
 
 module.exports = {
    AdminAuth,
 }