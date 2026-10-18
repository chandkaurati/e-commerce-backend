import Router from "express"
import { upload } from "../middlewares/multer.js"
import { addProduct } from "../controllers/protected.product.controller.js"
import validateProductData from "../middlewares/validateProductData.js"
import productValidator from "../lib/product.validator.js"

const router = Router()

router.post("/add", upload.single("productImage"),productValidator, validateProductData, addProduct)
// router.put("/update/:productId", upload.single("productImage"), productValidator, validateProductData, updateProduct)

export default router
