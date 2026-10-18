import Router from "express"
import {getProductById, getProducts } from "../controllers/public.product.controller.js"

const router = Router()

router.get("/all", getProducts)
router.get("/:productId", getProductById)

export default router
