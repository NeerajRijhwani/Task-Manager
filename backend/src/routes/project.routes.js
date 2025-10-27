import { Router } from "express";
import {
  verifyAuthorization,
  verifyJWT,
} from "../middlewares/Auth.middleware.js";
import {
  AddProjectMember,
  CreateProject,
  DeleteProject,
  DeleteProjectMember,
} from "../controllers/project.controllers.js";

const router = Router();

router.route("/createproject/:_id").post(verifyJWT,verifyAuthorization, CreateProject);
router
  .route("/addProjectmember/:_id/:proid")
  .post(verifyJWT, verifyAuthorization, AddProjectMember);
router
  .route("/deleteproject/:_id/:proid")
  .delete(verifyJWT, verifyAuthorization, DeleteProject);
router
  .route("/deleteProjectmember/:_id/:proid")
  .delete(verifyJWT, verifyAuthorization, DeleteProjectMember);

export default router;
