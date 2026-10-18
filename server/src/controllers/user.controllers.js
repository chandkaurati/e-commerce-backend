import { User } from "../models/user.model.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import { compare, hash } from "../utils/hash.js"
import jwt from "jsonwebtoken"


export async function registerUser(req,res){
    try {
        
      const {userName, email, password} = req.body

      const isUserExists = await User.findOne({email : email})
      
      if(isUserExists){
        return res.status(409).json({
            statusCode : 409,
            message : "User already exists with email"
        })
      }

      const hashedPassword = await hash(password)

      const newUser = await User.create({
        userName : userName,
        email : email,
        password : hashedPassword,
      })

      const accessToken = generateAccessToken({id : newUser._id}, "15m")
      const refreshToken = generateRefreshToken({id : newUser._id}, "3d")

      newUser.refreshToken = refreshToken
    
      await newUser.save()

      const createdUser = newUser.toObject();
      delete createdUser.password;

      const options = {
        httpOnly : true,
        secure : true,
      }

      res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        statusCode : 200,
        message : "user registered sucessFully",
        data : createdUser
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : null,
            statusCode : 500,
            error : error,
            message : error.message || "Internal Server errror"
        })
    }
}


export async function loginUser(req,res){
      try {

        const {email, password} = req.body;

        const user = await User.findOne({email : email})

        if(!user){
          return res.status(404).json({
            statusCode : 404,
            message : "User not found with this email"
          })
        }

        const isPasswordCorrect = await compare(user.password, password)
        if(!isPasswordCorrect){
           return res.status(401).json({
            statusCode : 401,
            message : "incorrect password"
          })
        }

      const accessToken = generateAccessToken({id : user._id}, "15m")
      const refreshToken = generateRefreshToken({id : user._id}, "3d")

      user.refreshToken = refreshToken
    
      await user.save()

      const createdUser = user.toObject();
      delete createdUser.password;
      delete createdUser.refreshToken;

      const options = {
        httpOnly : true,
        secure : true,
      }

      res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        statusCode : 200,
        message : "user logged in sucessFully",
        data : createdUser
      })

      } catch (error) {
        console.log(error)
        return res.status(500).json({
            data : null,
            statusCode : 500,
            error : error,
            message : error.message || "Internal Server errror"
        })
      }
}


export async function logoutUser(req,res){
    try {
      
      await User.findOneAndUpdate({_id : req.user_id},
        {
          $unset : {
            refreshToken : 1,
          }
        },
        {returnDocument : "after"}
      )

      const options = {
        httpOnly : true,
        secure : true,
      }

      return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        statusCode : 200,
        message : "User logged out successFully"
      })
    } catch (error) {
       console.log(error)
        return res.status(500).json({
            data : null,
            statusCode : 500,
            error : error,
            message : error.message || "Internal Server errror"
        })
    }
}

export async function  getCurrentuser(req,res) {
    try {
      const user = await User.findById(req.user_id).select("-password -refreshToken")
      return res.status(200).
      json({
       statusCode : 200,
       data : user,
      })
    } catch (error) {
       console.log(error)
       return res.status(500).json({
            data : null,
            statusCode : 500,
            error : error,
            message : error.message || "Internal Server errror"
        })
    }
}


export async function refreshTokens(req,res){
  const incommingRefreshToken = req.cookies?.refreshToken || 
  req.headers["Authorization"]?.split(" ")[0]
  try {
    const decoded = jwt.verify(incommingRefreshToken, process.env.JWT_REFRESHTOKEN_SECRET)
    const user = await User.findById(decoded?.id)
    if(!user){
      return res.status(400).json({
        statusCode : 400,
        message : "Invalid refresh token"
      })
    }

    if(incommingRefreshToken != user?.refreshToken){
      return res.status(400).json({
        message : "RefreshToken is used ot expired"
      })
    }

    const newAccessToken = generateAccessToken({id : user._id}, "15m")
    const newRefreshToken = generateRefreshToken({id: user._id}, "7d" )

    user.refreshToken = newRefreshToken

    await user.save()


    return res.
     cookie("accessToken", newAccessToken)
    .cookie("refreshToken", newRefreshToken)
    .status(200).json({message : "Tokens refreshed successFully"})

  } catch (error) {
    return res.status(500)
    .json({
      message : error.message || "Internal server error"
    })
  }
}