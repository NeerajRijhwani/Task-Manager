import { Router } from "express";
import {
  CreateOrganization,
  DeleteOrganizationMember,
  AddOrganizationMember,
  UpdateMemberRole,
  DeleteOrganization,
} from "../controllers/organization.controllers";
import { verifyJWT ,verifyAuthorization} from "../middlewares/Auth.middleware.js";
const router = Router();
//routes need to be tested
router.route("/createorg").post(verifyJWT,CreateOrganization)
router.route("/addorgmember/:_id").post(verifyJWT,verifyAuthorization,AddOrganizationMember)
router.route("/deleteorgmember/:_id").delete(verifyJWT,verifyAuthorization,DeleteOrganizationMember)
router.route("/updaterole/:_id").patch(verifyJWT,verifyAuthorization,UpdateMemberRole)
router.route("/deleteorg/:_id").delete(verifyJWT,verifyAuthorization,DeleteOrganization)