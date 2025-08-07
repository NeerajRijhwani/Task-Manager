import { Router } from "express";
import{
    RegisterUser,
    LoginUser,
    LogoutUser
} from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router=Router()



router.route("/register").post(RegisterUser)
router.route("/login").post(LoginUser)
//secured routes
router.route("/logout").post(verifyJWT,LogoutUser)
export default router;