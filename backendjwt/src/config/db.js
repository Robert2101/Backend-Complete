import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected succesfully");
    }catch(err){
        console.log("Mongodb connection error");
    }
}

export default connectDB;

