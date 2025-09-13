import { Router } from "express";
import {
  AddTask,
  DeleteTask,
  GetTasks,
  UpdateTaskDetails,
  UpdateTaskImage,
} from "../controllers/todo.controllers.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addtask").post(
  verifyJWT,
  upload.fields([
    {
      name: "taskimage",
      maxCount: 1,
    },
  ]),
  AddTask
);

router.route("/deleteTask/:_id").delete(verifyJWT, DeleteTask);
router.route("/updatetodo/:_id").patch(verifyJWT, UpdateTaskDetails);
router.route("/updatetodoimage/:_id").patch(
  verifyJWT,
  upload.fields([
    {
      name: "taskimage",
      maxCount: 1,
    },
  ]),
  UpdateTaskImage
);
router.route("/Tasks").get(verifyJWT, GetTasks);

export default router;
