import mongoose,{ Schema } from "mongoose";

const taskSchema = new Schema(
    {
    title: 
    { 
      type: String, 
      required: true 
    },
    description: 
    { 
      type: String, 
      required: true 
    },
    user: 
    { 
      type: Schema.Types.ObjectId, 
      ref: "User",
    },
   status: 
    { 
      type: String, 
      enum: ["complete", "incomplete"],
    },
    priority: 
    { 
      type: String, 
      enum: ["low", "high","medium"],
      required: true,
    },
  }, { timestamps: true });
  
  export const Task = mongoose.model("task", taskSchema);