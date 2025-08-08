import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorhandler} from "./middlewares/ErrorHandler.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
const app=express()
const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)
app.use(cors({
    // origin: process.env.CORS_ORIGIN, // Adjust this to your frontend's URL
    // credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json({ limit:'16kb'}));
app.use(express.urlencoded({ extended: true, limit:'16kb' }));
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"../../frontend/signup")))
app.use(express.static(path.join(__dirname,"../../frontend/")))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"
app.get("/register",((req,res)=> {
    res.sendFile(path.join(__dirname,"../../frontend/signup/index.html"))
}))
app.get("/login",((req,res)=>{
     res.sendFile(path.join(__dirname,"../../frontend/login/index.html"))
}))
//routes declaration
app.use("/api/v1/users" , userRouter)
//http://localhost:8000/api/v1/users/register

app.use(errorhandler)
export {app}