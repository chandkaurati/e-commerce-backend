
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";


export async function addProduct(req,res){
    try {

        const {title , description, name, price, stock, category} = req.body;

        if(!req?.file.path){
            return res.status(400).json({statusCode : 400})
        }
        
        const result = await uploadOnCloudinary(req.file?.path)
        
        if(!result) return res.status(400).json({
            statusCode : 400,
            message : "Image upload failed"
        })

        const url = result.secure_url;
        const userId = req.user_id;

        
        let createdCategory = undefined;

        const existingCategory = await Category.findOne({ name : category })
        if(!existingCategory){
           createdCategory = await Category.create({ name : category })
        }

        const product = await Product.create({
            title,
            description,
            name,
            thumbNail : url,
            price,
            stock,
            owner : userId,
            category : existingCategory?._id || createdCategory?._id
        })

        return res.status(200).json({ 
            message : "Product added successfully",
            data : product,
            statusCode : 200    
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            statusCode : 500,
            message : error.message || "Internal Server Error"
        })
    }
}

export async function updateProduct(req,res){
     const { productId } = req.params;
     if(!productId) return res.status(400).json({
        statusCode : 400,
        message : "ProductId is required"
     })
     try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({
            statusCode : 404,
            message : "Product not found"
        })

        const { title, description, name, price, stock, category } = req.body;

        
        
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            title : title || product.title,
            description : description || product.description,
            name : name || product.name,
            price : price || product.price,
            stock : stock || product.stock,
            category : category || product.category
        },{returnDocument : "after"})

        return res.status(200).json({
            statusCode : 200,
            message : "Product updated successfully",
            data : updatedProduct
        })

     } catch (error) {
        return res.status(500).json({
            statusCode : 500,
            message : error.message || "Internal Server Error"
        })  
     }
}