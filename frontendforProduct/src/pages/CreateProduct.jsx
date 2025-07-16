import React, { useState } from "react";
import useProductStore from "../store/product.js";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

const CreateProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
    });

    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        const { success, message } = await createProduct(newProduct);

        if (success) {
            toast.success(message || "Product created");
        } else {
            toast.error(message || "Something went wrong");
        }

        setNewProduct({ name: "", price: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-gray-800 text-white px-4">
            <div className="bg-zinc-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-zinc-700 space-y-6">
                <h1 className="text-3xl font-bold text-center text-white">
                    Create Product
                </h1>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="number"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <Button
                    onClick={handleAddProduct}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg rounded-xl transition duration-200"
                >
                    Create Product
                </Button>
            </div>
        </div>
    );
};

export default CreateProduct;