import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorhandler} from "./middlewares/ErrorHandler.middleware.js";
const app=express()

app.use(cors({
    // origin: process.env.CORS_ORIGIN, // Adjust this to your frontend's URL
    // credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json({ limit:'16kb'}));
app.use(express.urlencoded({ extended: true, limit:'16kb' }));
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/users" , userRouter)
//http://localhost:8000/api/v1/users/register

app.use(errorhandler)
export {app}