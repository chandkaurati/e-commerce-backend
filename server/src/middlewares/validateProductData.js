import {validationResult} from "express-validator"
import fs from "node:fs"
const validateProductData = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        if(req.file?.path && fs.existsSync(req.file.path) ){
            fs.unlinkSync(req.file.path)
        }
        return res.status(400).json({errors : errors.array()})
    }
    next()

}

export default validateProductData