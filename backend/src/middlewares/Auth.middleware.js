import {ApiError} from "../utils/ApiError.js";
import {AsyncHandler} from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js"
import { Organization } from "../models/organization.models.js";

export const verifyJWT = AsyncHandler(async (req,res,next)=>{
try {
    const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Invalid Access Token")
    }
    req.user=user;
    next();
} catch (error) {
    throw new ApiError(401,error?.message|| "Invalid Access Token")
}
})
export const verifyAuthorization=AsyncHandler(async(req,res,next)=>{
    try {
        const orgid=req.params._id;
        const org= await Organization.findById(orgid);
        if(!org){
            throw new ApiError(400,"Organization not found");
        }
        const checkcall=org.members.includes([{user:req.user._id, role:"admin"}])
        if(!checkcall){
            throw new ApiError(401,"UnAuthorized Request Detected");
        }
        req.org=org;
        next();
    } catch (error) {
         throw new ApiError(401,error?.message||"UnAuthorized Request Detected");
    }
})