import Product from "../model/product.js";

const createProduct =  async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Product({ name, price });
        const x = await newProduct.save();
        res.status(201).json(x);
    } catch (err) {
        res.json(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await Product.findByIdAndDelete(id);
        if (!del) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully", deleted: del });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateProduct = async (req,res)=>{
    const id = req.params.id;
    const {name,price} = req.body;
    try{
        const x = await Product.findByIdAndUpdate(id, { name, price }, { new: true });
        if(!x){
            return res.status(404).json({message : "Product not found"});
        }
        res.json(x);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {     
        res.status(500).json({ error: err.message });
    }
}
export {createProduct,deleteProduct, updateProduct,getProducts};