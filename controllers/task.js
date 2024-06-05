import { Error } from "mongoose"
import {Task} from "../models/task.js"
import ErrorHandler from "../middlewares/error.js"

export const newTask=async(req,res,next)=>{
   const{title,description}=req.body
   await Task.create({
      title,description,user:req.user
   })
   res.status(201).json({
    success:true,
    message:"Task added Successfully"
   })
}
export const mytasks=async(req,res,next)=>{
    const userid=req.user._id
    const Tasks=await Task.find({user:userid})
    res.status(200).json({
        success:true,
        Tasks
    })
}
export const updateTask=async(req,res,next)=>{
   const {id}=req.params
   const task=await Task.findById(id)
   if(!task){
    return next(new ErrorHandler("Invalid id",404))
 }
   task.isCompleted=!task.isCompleted
   await task.save()
   res.status(200).json({
    success:true,
    message:"task updated"
   })
}
export const deleteTask=async(req,res,next)=>{
    const {id}=req.params
    const task= await Task.findById(id)
    if(!task){
       return next(new ErrorHandler("Invalid id",404))
    }
    await task.deleteOne()
    res.status(200).json({
        success:true,
        message:"Task Deleted"
    })

}