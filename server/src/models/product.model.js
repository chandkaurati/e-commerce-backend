import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   title : {
     type : String,
     required : true,
     minlength : 15,
   },

   description : {
    type : String,
    required : true,
    minlength : 20 ,
   },
   
   thumbNail : {
    type : String,
    required :  true,
   },

   images : {
    type : [String],
   },
   
   price : {
    type : Number,
    default : 0,
    required : true
   },

   stock : {
    default : 0,
    required : true,
    type : Number 
   },

   category : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Category",
    required : true
   },

   owner : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
   }

}, { timestamps : true })



export const Product = mongoose.model("Product", productSchema)