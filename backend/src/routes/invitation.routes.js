import { Router } from "express";
import {
  createInvitation,
  RejectInvitation,
  getrecieveInvites,
  getsentInvites,
} from "../controllers/invitation.controllers.js";

import {
  verifyJWT,
  verifyAuthorization,
} from "../middlewares/Auth.middleware.js";
const router = Router();

router
  .route("/:_id")
  .post(verifyJWT, verifyAuthorization, createInvitation);
router
  .route("/sentinvitation/:_id")
  .get(verifyJWT, verifyAuthorization, getsentInvites);
router
  .route("/receiveinvitation")
  .get(verifyJWT, getrecieveInvites);
router
  .route("/rejectinvitation/:_id")
  .post(verifyJWT, verifyAuthorization, RejectInvitation);

  export default router