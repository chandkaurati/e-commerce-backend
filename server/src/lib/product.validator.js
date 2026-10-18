import {body} from "express-validator"

const productValidator = [
    body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required"),
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required"),
    body("price")
    .isFloat({ gt: 0 })
    .withMessage("Product price must be a positive number"),
    body("stock")
    .isInt({ gt: 0 })
    .withMessage("Product stock must be a positive integer"),
    body("category")
    .trim()
    .notEmpty()
    .withMessage("Product category is required")
];

export default productValidator