import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload, expiresIn = "15m")=>{
   return  jwt.sign(payload, process.env.JWT_ACCESSTOKEN_SECRET, {
    expiresIn
   } )
}

export const generateRefreshToken = (payload, expiresIn="7d")=>{
    return jwt.sign(payload, process.env.JWT_REFRESHTOKEN_SECRET, {
        expiresIn
    })
}