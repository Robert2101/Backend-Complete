import express from "express";
import productRoutes from "./routes/product.route.js";
import connected from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api" ,productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})