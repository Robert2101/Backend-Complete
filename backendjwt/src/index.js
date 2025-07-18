import express from "express";
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth/", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("server is running at 5001 port");
    connectDB();
})