import { Router } from "express";
import {
  CreateOrganization,
  DeleteOrganizationMember,
  AddOrganizationMember,
  UpdateMemberRole,
  DeleteOrganization,
} from "../controllers/organization.controllers.js";
import {
  verifyJWT,
  verifyAuthorization,
} from "../middlewares/Auth.middleware.js";
const router = Router();
//routes need to be tested
//create route is successfull
router.route("/createorg").post(verifyJWT, CreateOrganization);
  // add orgmember route is successfull
router
  .route("/addorgmember/:_id")
  .post(verifyJWT, verifyAuthorization, AddOrganizationMember);
router
  .route("/deleteorgmember/:_id")
  .delete(verifyJWT, verifyAuthorization, DeleteOrganizationMember);
  //updaterole route is successful
router
  .route("/updaterole/:_id")
  .patch(verifyJWT, verifyAuthorization, UpdateMemberRole);
router
  .route("/deleteorg/:_id")
  .delete(verifyJWT, verifyAuthorization, DeleteOrganization);

export default router;
