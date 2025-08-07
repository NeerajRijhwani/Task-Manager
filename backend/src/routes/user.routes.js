import { Router } from "express";
import{
    RegisterUser,
    LoginUser
} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router=Router()



router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
export default router;