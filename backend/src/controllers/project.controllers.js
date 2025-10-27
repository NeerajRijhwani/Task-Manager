import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TransactionHandler } from "../utils/TransactionHandler.js";
import { User } from "../models/user.models.js";
import { Organization } from "../models/organization.models.js";
import { Project } from "../models/project.model.js";
import { Todo } from "../models/todo.models.js";

const CreateProject = AsyncHandler(async (req, res) => {
  //get data from frontend
  //validate it
  // create project[admin only]
  // return project created succesfully
  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is Required");
  }
  const org = req.org;

  const project = await Project.create({
    name,
    description,
    organization_Id: org._id,
    members: [{ user: req.user._id }],
  });
  if (!project) {
    throw new ApiError(500, "Project cannot be created");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project Created Successfully"));
});

const AddProjectMember = AsyncHandler(async (req, res) => {
  // take member details from frontend
  //validate it
  // check if user exists and if user is organization member
  // check if project exists
  // add userid in project
  // return user added succesfully
  const { member } = req.body;
  const project_id = req.params?.proid;
  if (!(member && member?.user && Object.keys(member).length == 1)) {
    throw new ApiError(400, "member is required ");
  }
  const user = await User.findById(member.user);
  if (!user) {
    throw new ApiError(400, "User does not Exists");
  }
  const checkorgmember = req.org.members.some((x) => x.user == member.user);
  if (!checkorgmember) {
    throw new ApiError(
      400,
      "Cannot Add member in Project not present in organization"
    );
  }
  if (!project_id) {
    throw new ApiError(400, "project id is required");
  }
  const project = await Project.findById(project_id);
  if (!project || !project?.organization_Id.equals(req.org._id)) {
    console.log(project?.organization_Id, req.org._id);
    throw new ApiError(400, "Project not found in the Organization");
  }
  project.members.push({ user: member.user });
  await project.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, project, "member added succesfully in Project"));
});

const DeleteProjectMember = AsyncHandler(async (req, res) => {
  // take member details from frontend
  //validate it
  // check if user exists and if user is organization member
  // check if project exists
  // delete userid from project
  // return user deleted succesfully
  const { member } = req.body;
  const project_id = req.params?.proid;
  if (!(member && member?.user && Object.keys(member).length == 1)) {
    throw new ApiError(400, "member is required ");
  }
  const user = await User.findById(member.user);
  if (!user) {
    throw new ApiError(400, "User does not Exists");
  }
  const checkorgmember = req.org.members.some((x) => x.user == member.user);
  if (!checkorgmember) {
    throw new ApiError(
      400,
      "Cannot delete member in Project who is not present in organization"
    );
  }
  if (!project_id) {
    throw new ApiError(400, "project id is required");
  }
  const project = await Project.findById(project_id);
  if (!project || !project?.organization_Id.equals(req.org._id)) {
    throw new ApiError(400, "Project not found in the Organization");
  }
  const index = project.members.findIndex((x) => x.user == member.user);
  if (index > -1) {
    project.members.splice(index, 1);
  }
  await project.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, project, "member added succesfully in Project"));
});

const DeleteProject = TransactionHandler(async (req, res, next, session) => {
  const pro_id = req.params?.proid;
  if (!pro_id) {
    throw new ApiError(400, "project id is required");
  }
  const project = await Project.findById(pro_id).session(session);
  if (!project) {
    throw new ApiError(400, "Project Not Found");
  }
  const deletedtasks = await Todo.deleteMany({ project_id: pro_id }).session(
    session
  );
  const deletedproject = await Project.deleteOne({ _id: pro_id }).session(
    session
  );
  if (deletedproject.deletedCount === 0) {
    throw new ApiError(500, "Something went wrong when deleting project");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedproject, deletedtasks },
        "Project deleted Successfully"
      )
    );
});

export { CreateProject, AddProjectMember, DeleteProject, DeleteProjectMember };
