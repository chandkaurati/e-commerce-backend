import { User } from "../models/user.model.js";



const verifyIsAdmin = async(req,res,next)=>{
    try {
        const userId = req.user_id;
        if(!userId) return res.status(401).json({message : "unAuthorized request"})
        
        const user = await User.findById(req.user_id)

        if(!user){
            return res.status(401).json({
                message : "user not found"
            })
        }

        if(!user.isAdmin){
            return res.status(401).json({
                message : "UnAuthorized request"
            })
        }

        req.user = user
        next()
        
    } catch (error) {
        return res.status(500).json({
            data : null,
            statusCode : 500,
            error : error,
            message : error.message || "Internal Server errror"
        })
    }
}


export default verifyIsAdmin