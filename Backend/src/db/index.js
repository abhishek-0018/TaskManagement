import mongoose from "mongoose";
import { DB_NAME,DB_NAME2 } from "../constants.js";

const connectDb=async()=>{
    try{
        const c=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME2}`);
        console.log(`\n MongoDB connected ${c.connection.host}`);
    } catch(error){
        console.log("Error ",error);
        process.exit(1)
    }
}

export default connectDb;