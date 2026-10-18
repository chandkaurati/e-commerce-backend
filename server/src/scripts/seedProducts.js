
import "dotenv/config";
import mongoose from "mongoose";
import dns from "node:dns"
// import { Product } from "../src/models/product.model.js";
// import { Category } from "../src/models/category.model.js";

dns.setServers(["1.1.1.1", "8.8.8.8"])

import {Product} from "../models/product.model.js"
import {Category} from "../models/category.model.js"

const products = [
  {
    title: "Classic Cotton Casual T-Shirt",
    description: "A comfortable cotton T-shirt for everyday casual wear.",
    thumbNail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    price: 599,
    stock: 50,
  },
  {
    title: "Slim Fit Denim Jeans",
    description: "Classic denim jeans with a modern slim fit and comfortable feel.",
    thumbNail: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    price: 1499,
    stock: 28,
  },
  {
    title: "Lightweight Running Shoes",
    description: "Lightweight shoes suitable for daily walks and workouts.",
    thumbNail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 2299,
    stock: 20,
  },
  {
    title: "Premium Oversized Graphic T-Shirt",
    description: "A relaxed oversized T-shirt with a modern streetwear fit.",
    thumbNail: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    price: 799,
    stock: 32,
  },
  {
    title: "Classic Button Down Shirt",
    description: "A versatile button down shirt for casual and smart occasions.",
    thumbNail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    price: 1299,
    stock: 18,
  },
  {
    title: "Comfortable Cotton Hoodie",
    description: "A cozy hoodie for relaxed outfits and cooler weather.",
    thumbNail: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    price: 1599,
    stock: 24,
  },
  {
    title: "Everyday Casual Sneakers",
    description: "Easy-to-style casual sneakers for everyday outfits.",
    thumbNail: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    price: 1899,
    stock: 16,
  },
  {
    title: "Classic Denim Jacket",
    description: "A versatile denim jacket for layering across casual outfits.",
    thumbNail: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0",
    price: 2499,
    stock: 12,
  },
  {
    title: "Comfortable Cotton Joggers",
    description: "Soft joggers suitable for lounging, travelling, and daily wear.",
    thumbNail: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea",
    price: 999,
    stock: 26,
  },
  {
    title: "Classic Crew Neck Sweatshirt",
    description: "A comfortable crew neck sweatshirt for everyday layering.",
    thumbNail: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    price: 1399,
    stock: 20,
  },
  {
    title: "Lightweight Summer Dress",
    description: "A breezy dress designed for comfortable warm-weather styling.",
    thumbNail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    price: 1799,
    stock: 14,
  },
  {
    title: "Classic Polarized Sunglasses",
    description: "Stylish sunglasses for everyday use and outdoor activities.",
    thumbNail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    price: 899,
    stock: 35,
  },
  {
    title: "Minimalist Everyday Backpack",
    description: "A practical backpack for college, commuting, and travel.",
    thumbNail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    price: 1199,
    stock: 22,
  },
  {
    title: "Classic Cotton Polo T-Shirt",
    description: "A smart casual polo shirt for everyday comfort and style.",
    thumbNail: "https://images.unsplash.com/photo-1625910513413-5fc45e9b7f8b",
    price: 899,
    stock: 25,
  },
  {
    title: "Casual Checked Flannel Shirt",
    description: "A casual checked shirt ideal for layering and weekend outfits.",
    thumbNail: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab",
    price: 1199,
    stock: 17,
  },
  {
    title: "Classic Leather Belt",
    description: "A timeless belt that pairs well with jeans and formal trousers.",
    thumbNail: "https://images.unsplash.com/photo-1624222247344-550fb8d5c1d5",
    price: 499,
    stock: 40,
  },
  {
    title: "Casual Summer Shorts",
    description: "Comfortable casual shorts designed for warm weather and travel.",
    thumbNail: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    price: 699,
    stock: 30,
  },
  {
    title: "Everyday Cotton Baseball Cap",
    description: "A casual baseball cap that complements everyday streetwear.",
    thumbNail: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    price: 399,
    stock: 45,
  },
  {
    title: "Classic Formal Trousers",
    description: "Smart formal trousers suitable for office wear and special occasions.",
    thumbNail: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    price: 1599,
    stock: 15,
  },
  {
    title: "Comfortable Winter Puffer Jacket",
    description: "A warm padded jacket designed for chilly days and outdoor activities.",
    thumbNail: "https://images.unsplash.com/photo-1544923246-77307dd654cb",
    price: 3499,
    stock: 10,
  },
];



async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from your .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    // Find or create the Clothing category.
    const category = await Category.findOneAndUpdate(
      { name: "Clothing" },
      { $setOnInsert: { name: "Clothing" } },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    // Build product documents with the correct category ID.
    const productDocuments = products.map((product) => ({
      ...product,
      category: category._id,
    }));

    // Validate before inserting.
    for (const product of productDocuments) {
      if (
        typeof product.description !== "string" ||
        product.description.length < 20
      ) {
        throw new Error(
          `Invalid description for product: ${product.title}`
        );
      }
    }

    // Remove only the demo products in this seed list.
    const demoTitles = products.map((product) => product.title);

    await Product.deleteMany({
      title: { $in: demoTitles },
    });

    const insertedProducts = await Product.insertMany(
      productDocuments
    );

    console.log(`Category: ${category.name}`);
    console.log(`Products inserted: ${insertedProducts.length}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

await seedProducts();
