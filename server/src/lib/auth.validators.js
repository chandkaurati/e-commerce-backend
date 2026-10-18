import {body} from "express-validator"


export const signupValidator = [
    body("userName")
    .trim()
    .notEmpty()
    .withMessage("User name is required"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("please provide a valid email address"),

    body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    ),
]


export const loginValidator = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("please provide a valid email address"),

    body("password")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    ),
]