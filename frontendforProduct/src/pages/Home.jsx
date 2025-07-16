import useProductStore from "../store/product.js";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import toast from "react-hot-toast";

const Home = () => {
    const { products, fetchProducts, deleteProduct } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id) => {
        const { success, message } = await deleteProduct(id);
        if (success) {
            toast.success(message || "Product deleted");
        } else {
            toast.error(message || "Failed to delete");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>

            {products.length === 0 ? (
                <div className="text-center space-y-4">
                    <h2 className="text-xl font-semibold">No Products Available</h2>
                    <Button variant="link" asChild className="text-blue-400">
                        <Link to="/createproduct">Create Product</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-zinc-800/70 border border-zinc-700 rounded-xl p-5 shadow-lg backdrop-blur-md space-y-3"
                        >
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-green-400 font-semibold">${product.price}</p>

                            <div className="flex gap-2">

                                {/* DELETE */}
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;