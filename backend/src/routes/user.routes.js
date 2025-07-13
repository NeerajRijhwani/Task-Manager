import { Router } from "express";
import{
    RegisterUser
} from "../controllers/user.controllers.js"




Router.route("/register").post(RegisterUser)