import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

import { Task } from "../models/task.model.js";

const addTask=asyncHandler(async(req,res)=>{
    const {title,description,priority}=req.body;

    if(!title||!description||!priority){
        throw new ApiError(400,"All fields are required");
    }

    const task= await Task.create({
        title,
        description,
        priority,
        status:"incomplete",
        user:req.user._id,
     })
 
     if(!task){
         throw new ApiError(500,"Something went wrong while adding new task.")
     }

     return res.status(201).json(
         new ApiResponse(200, task, "Task added successfully")
     )
})

const getTasks=asyncHandler(async(req,res)=>{
    const user=req.user._id;
    const tasks= await Task.find({user:user});
    return res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    )
})

const changeStatus = asyncHandler(async (req, res) => {
    const { task } = req.body;
  
    if (!task) {
      return res.status(400).json(new ApiResponse(400, null, "Task ID is required"));
    }
  
    const response = await Task.findByIdAndUpdate(
      task,
      {
        $set: {
          status: "complete",
        },
      },
      { new: true }
    );
  
    if (!response) {
      return res.status(404).json(new ApiResponse(404, null, "Task not found"));
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Status updated successfully"));
  });

  const deleteTask=asyncHandler(async(req,res)=>{
    const {task}=req.body;
    if (!task) {
        return res.status(400).json(new ApiResponse(400, null, "Task ID is required"));
      }

    const response= await Task.deleteOne({_id:task});
    if(!response){
        return res.status(404).json(new ApiResponse(404, null, "Error in deleting task"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Task deleted successfully"));
  })
  

export {addTask,getTasks,changeStatus,deleteTask}