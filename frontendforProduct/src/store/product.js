import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({

    products: [],
    fetchProducts: async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/products");
            set({ products: response.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }

    },
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price) {
            console.error("Product name and price are required");
            return { success: false, message: "Product name and price are required" };
        }
        try {
            const response = await axios.post("http://localhost:3000/api/create", newProduct);
            set((state) => ({ products: [...state.products, response.data] }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.error("Failed to create product:", error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/delete/${id}`);
            set((state) => ({
                products: state.products.filter((p) => p._id !== id),
            }));
            return { success: true, message: res.data.message };
        } catch (err) {
            return { success: false, message: err.response?.data?.message || "Error" };
        }
    },
    updateProduct: async (id, updatedProduct) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/update/${id}`, updatedProduct);
            set((state) => ({
                products: state.products.map((p) =>
                    p._id === id ? { ...p, ...response.data } : p
                ),
            }));
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Failed to update product:", error);
            return { success: false, message: "Failed to update product" };
        }
    },

}));


export default useProductStore;
