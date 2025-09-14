import { Router } from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  ChangeAccountDetails,
  ChangeCurrentPassword,
  GetUserDetails,
  refreshAccessToken,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
//secured routes
router.route("/logout").post(verifyJWT, LogoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/update-account").patch(verifyJWT, ChangeAccountDetails);
router.route("/change-password").patch(verifyJWT, ChangeCurrentPassword);
router.route("/current-user").patch(verifyJWT, GetUserDetails);

export default router;
