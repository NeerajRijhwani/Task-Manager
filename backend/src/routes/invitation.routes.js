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
  .route("/invitation")
  .post(verifyJWT, verifyAuthorization, createInvitation);
router
  .route("/sentinvitation")
  .get(verifyJWT, verifyAuthorization, getsentInvites);
router
  .route("/receiveinvitation")
  .get(verifyJWT, verifyAuthorization, getrecieveInvites);
router
  .route("/rejectinvitation")
  .post(verifyJWT, verifyAuthorization, RejectInvitation);
