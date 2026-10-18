import { Router } from "express";
import { loginValidator, signupValidator } from "../lib/auth.validators.js";
import validateUserData from "../middlewares/validateUserData.js";
import {getCurrentuser, loginUser, logoutUser, refreshTokens, registerUser } from "../controllers/user.controllers.js";
import verifyJwt from "../middlewares/verifyJwt.js";


const router = Router()


router.post("/register", signupValidator, validateUserData,  registerUser)
router.post("/login", loginValidator, validateUserData, loginUser )
router.post("/logout", verifyJwt, logoutUser)
router.get("/me", verifyJwt, getCurrentuser)
router.post("/refreshTokens", refreshTokens )


export default router