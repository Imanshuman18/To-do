import {  User } from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendcookie } from "../utils/feature.js"
import ErrorHandler from "../middlewares/error.js"
export const getAllusers=async(req,res)=>{

}
export const register=async(req,res)=>{
  const {name,Email,Password}=req.body
  let user=await User.findOne({Email})
  if(user){
    return next(new ErrorHandler("User exists",404))
 }
 const hashedpassword=await bcrypt.hash(Password,10)
 user= await User.create({
    name,
    Email,
    Password:hashedpassword
})
sendcookie(user,res,"Registered Successfully",201)  
}
export const login=async(req,res,next)=>{
     const {Email,Password}=req.body
     let user=await User.findOne({Email}).select("+Password")
     if(!user){
      return next(new ErrorHandler("Invalid Email or Password",404))
   }
    
     const isMatch=await bcrypt.compare(Password,user.Password)
     if(!isMatch){
      return next(new ErrorHandler("Invalid Email or Password",404))
   }
     sendcookie(user,res,`Logged in Hi ${user.name}`,201)
}
export const getMyprofile=(req,res)=>{
   res.status(200).json({
    success:true,
    user:req.user
  })

}
export const logout = (req, res) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    secure:process.env.NODE_ENV==="Development"?false:true
  }).json({
    success: true,
    message: "Logged out",
  });
};
