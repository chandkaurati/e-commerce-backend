import jwt, { decode } from "jsonwebtoken"

const verifyJwt =  async (req,res,next)=>{
    try {
      const token = req.cookies?.accessToken || req.headers['authorization']?.split(" ")[1]

      if(!token){
        return res.status(401).json({
            statusCode : 401,
            message : "token is not present"
        })
      }

      const decoded =  jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET)
      req.user_id = decoded.id;

      
      next()   
    } catch (error) {
        console.log(error.status)
        return res.status(500).json({
            statusCode : 500,
            message : error.message ||  "Internal Server Error"
        })
    }
}

export default verifyJwt