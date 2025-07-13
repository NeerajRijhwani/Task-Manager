import {AsyncHandler} from "../utils/AsyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"


const RegisterUser= AsyncHandler(async (req,res)=>{
    const{username,email,password}=req.body

    if(
        [username,email,password].some((field)=>field?.trim==="")
    )
    {
        throw new ApiError(400,"All Fields are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"Username or email already exists")
    }

    const user=await User.create({
        username,
        email,
        password
    })

    const createduser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

     if(!createduser)
    {
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createduser , "User registered successfully")
    )
})





export{RegisterUser}