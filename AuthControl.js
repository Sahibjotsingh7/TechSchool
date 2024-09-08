const bcrypt = require('bcrypt')
const UserModel = require("../Models/user");

const signup = async (req,res) => {
    try{
      const { name, email, password } = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        return res.status(409)
                .json({message: 'user is already exist, you can login', success: false})
      }
      const userModel = new UserModel({name,email,password})
      userModel.password = await bcrypt.hash(password, 10);
      await userModel.save();
      res.status(201)
           .json({
             message:"SignUp Seccessful",
            success: true
           })

    } catch(err){
        res.status(500)
           .json({
             message:"SignUp unSuccessful, internal server error",
            success: false
           })


    }
}

const login = async (req,res) => {
    try{
      const {email, password } = req.body;
      const user = await UserModel.findOne({email});
      const errorMesssage = "Authentication Failed! wrong email or password"
      if(!user){
        return res.status(403)
                .json({message: errorMesssage , success: false})
      }
      const isPasssEqual = await bcrypt.compare(password,user.password);
      if(!isPasssEqual){
        return res.status(403).json({message:errorMesssage, success: false})
      }     
      res.status(201)
           .json({
             message:"login Seccessful",
            success: true,
            email,
            name: user.name,
           })

    } catch(err){
        res.status(500)
           .json({
             message:"login unSuccessful, internal server error",
            success: false
           })
    }
}

module.exports ={
    signup,
    login
}