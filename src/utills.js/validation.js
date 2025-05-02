const validator= require("validator")

const validatingSignUpData = (req) => {
  
    const {firstName,lastName,email,password} = req.body;
    

    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(email.trim())){
        throw new Error("Email is not Valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong");
    }
}

module.exports = {
    validatingSignUpData,
}