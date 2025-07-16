import mongoose from "mongoose";
const mongo = mongoose;
import dotenv from "dotenv"
dotenv.config();

const connected = mongo.connect(process.env.MONGO_URI)
.then(()=> console.log("Connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

export default connected;