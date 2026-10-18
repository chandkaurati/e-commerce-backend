import express from "express";
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import protectedProductRoutes from "./routes/protected.product.routes.js"
import verifyJwt from "./middlewares/verifyJwt.js";
import verifyIsAdmin from "./middlewares/verifyIsAdmin.js";
import publicProductRoutes from "./routes/public.product.routes.js"
import cors from "cors"

const app = express();
app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.use(cookieParser())

app.use(cors())

app.use("/api/users", userRouter)
app.use("/api/products", publicProductRoutes)


app.use("/api/admin/products",  verifyJwt, verifyIsAdmin, protectedProductRoutes)



console.log(process.env.MONGO_URI)

export default app


