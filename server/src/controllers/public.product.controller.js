import { Product } from "../models/product.model.js";

export async function getProducts(req,res){

    try {
        const products = await Product.find().populate("category");
        return res.status(200).json({
            statusCode : 200,
            message : "Products fetched successfully",
            data : products
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode : 500,
            message : error.message || "Internal Server Error"
        })
    }
}

export async function getProductById(req,res){
    try {
        const { productId } = req.params;
        
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({
            statusCode : 404,
            message : "Product not found"
        })  

        return res.status(200).json({
            statusCode : 200,
            message : "Product fetched successfully",
            data : product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode : 500,
            message : error.message || "Internal Server Error"
        })
    }
}






