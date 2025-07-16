import express from "express";

import { createProduct,deleteProduct,updateProduct ,getProducts} from "../controllers/product.controller.js";
const router = express.Router();

router.post("/create",createProduct)

router.delete("/delete/:id", deleteProduct)

router.put("/update/:id",updateProduct)

router.get("/products", getProducts);

export default router;