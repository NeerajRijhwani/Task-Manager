import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Todo } from "../models/todo.models.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const AddTask = AsyncHandler(async (req, res) => {
  // get details of task from frontend
  // validation - not empty
  // check for task image
  // if uploaded then upload it to cloudinary
  // create todo object-create db entry
  // return successful message

  const { project_id,title, date, priority, description,members} = req.body;
  if (project_id==""||title == "" || date == "" || priority == "") {
    throw new ApiError(400, "ALl fields are Required");
  }
  let taskimageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.taskimage) &&
    req.files.taskimage.length > 0
  ) {
    taskimageLocalPath = req.files?.taskimage[0].path;
  }
  const task_image = await uploadOnCloudinary(taskimageLocalPath);
  const Task = await Todo.create({
    project_id,
    title,
    date,
    priority,
    description,
    taskimage: task_image?.url || "",
    owner: req.user._id,
    members
  });
  const createdTask = await Todo.findById(Task._id);
  if (!createdTask) {
    throw new ApiError(500, "Something went wrong");
  }
  console.log(req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, createdTask, "Task saved successfully"));
});
const DeleteTask = AsyncHandler(async (req, res) => {
  //get details from frontend
  //validate the details[check if empty or not]
  //find the task from taskid
  //remove the task image from cloudinary*
  //remove the task
  //return successful message
  const task_id = req.params._id;
  if (!task_id) {
    throw new ApiError(400, "all fields are required");
  }
  const deletedtodo = await Todo.findByIdAndDelete(task_id);
  if (!deletedtodo) {
    throw new ApiError(400, "task not found");
  }
  const todo = await Todo.findById(task_id);
  if (todo) {
    throw new ApiError(500, "Server Error unable to delete task");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedtodo, "Task successfully deleted"));
});
const UpdateTaskDetails = AsyncHandler(async (req, res) => {
  //get details from frontend
  //validate the details
  //find the task
  //update details
  //check if details are updated in backend
  //return successful message

  const { title, date, priority, description } = req.body;
  if (title == "" || date == "" || priority == "") {
    throw new ApiError(400, "All fields are Required");
  }
  const task_id = req.params._id;
  const Updatedtodo = await Todo.findByIdAndUpdate(
    task_id,
    {
      $set: {
        title,
        date,
        priority,
        description,
      },
    },
    { new: true }
  );
  if (!Updatedtodo) {
    throw new ApiError(500, "Something went wrong while updating");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        UpdateTaskDetails,
        "Task details Updated successfully"
      )
    );
});
const UpdateTaskImage = AsyncHandler(async (req, res) => {
  //get image from frontend
  //validate if its a image
  //get the url of previous image uploaded on cloudinary
  //delete it
  //add the new image and update the todo with new url
  //return successful message

  const taskimagePath = req.files?.taskimage[0].path;
  if (!taskimagePath) {
    throw new ApiError(400, "Task Image File to be updated is missing");
  }
  const task_id = req.params._id;
  const Task = await Todo.findById(task_id);
  if (!Task) {
    throw new ApiError(400, "Task Not found");
  }
  const deletedTaskimage = await deleteFromCloudinary(Task.taskimage);
  if (!deletedTaskimage) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the previous image"
    );
  }
  const uploadedTaskimage = await uploadOnCloudinary(taskimagePath);
  if (!uploadedTaskimage) {
    throw new ApiError(500, "Something went wrong while uploading the image");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    task_id,
    {
      $set: {
        taskimage: uploadedTaskimage.url,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Task Image updated successfully"));
});
const GetTasks = AsyncHandler(async (req, res) => {
  const user = req.user;
  let Tasks = await Todo.find({ owner: user._id });
  if (!Tasks) throw new ApiError(500, "Unable to Fetch Tasks");
  return res
    .status(200)
    .json(new ApiResponse(200, Tasks, "Tasks Fetched Successfully"));
});
const UpdateTaskStatus = AsyncHandler(async (req, res) => {
  //get task id from params and status from body
  //validate task id and status
  //check if task belongs to the logged in user
  //find the task and update status
  //return taskstatus updated

  const task_id = req.params?._id;
  const { status } = req.body;
  if (!task_id) {
    throw new ApiError(400, "Task id is required");
  }
  const statusvalues = ["Not Started", "In Progress", "Completed"];
  if (!statusvalues.includes(status))
    throw new ApiError(400, "Status is required");
  const Task = await Todo.findById(task_id);
  if (!Task || Task.owner !== req.user._id)
    throw new ApiError(404, "Invalid Task Id");
  task_id.status = status;
  await Task.save({validateBeforeSave:false});
  return res
    .status(200)
    .json(new ApiResponse(200, Task, "Task Status Updated Successfully"));
});
export {
  AddTask,
  DeleteTask,
  UpdateTaskDetails,
  UpdateTaskImage,
  GetTasks,
  UpdateTaskStatus,
};
