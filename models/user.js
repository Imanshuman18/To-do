import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export const User=mongoose.model("User",userSchema)
