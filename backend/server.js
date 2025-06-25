import express from "express";
import productRoutes from "./routes/product.route.js";
import connected from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api" ,productRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})