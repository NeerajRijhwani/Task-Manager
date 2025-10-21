import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Organization } from "../models/organization.models.js";
import { Project } from "../models/project.model.js";
import { Todo } from "../models/todo.models.js";
const CreateOrganization = AsyncHandler(async (req, res) => {
  // take data from frontend
  // validate it
  //create a organization
  // throw error if unable to do so
  //return successfull message
  const { name, description } = req.body;
  if (name == "") {
    throw new ApiError(400, "name of organization is mandatory");
  }
  const org = await Organization.create({
    name,
    description,
    createdBy: req.user._id,
    members: [{ user: req.user._id, role: "admin" }],
  });
  if (!org) {
    throw new ApiError(500, "Unable to create organization");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, org, "Organization created successfully"));
});
const AddOrganizationMember = AsyncHandler(async (req, res) => {
  //take data from frontend
  //check validation
  // check if user and role exists in newmember field
  //check if organization is exists and is updated
  //if not throw error else return response successfully
  const { orgid, newmember } = req.body;
  if (!newmember) {
    throw new ApiError(500, "member cannot be empty");
  }
  const user = await User.findById(newmember?.user);
  if (
    !(
      user &&
      newmember?.role.includes(["admin", "member"]) &&
      newmember.length == 2
    )
  ) {
    throw new ApiError(400, "User/role does not exist or invalid role");
  }
  const updated_org = await Organization.findByIdandUpdate(
    orgid,
    {
      $push: {
        members: newmember,
      },
    },
    {
      new: true,
    }
  );
  if (!updated_org) {
    throw new ApiError(500, "unable to add members in organization");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updated_org,
        "member added successfully in the organization"
      )
    );
});

const DeleteOrganizationMember = AsyncHandler(async (req, res) => {
  // take data from frontend
  //validate it
  // check if organization and member exists if not throw error
  //update the organization by deleting member
  // return response successful
  const { orgid, member_id } = req.body;
  const user = await User.findById(member_id);
  if (!user) {
    throw new ApiError(500, "user to be deleted does not exists");
  }
  const updated_org = await Organization.findByIdandUpdate(
    orgid,
    {
      $pull: {
        members: { user: member_id },
      },
    },
    {
      new: true,
    }
  );
  if (!updated_org) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updated_org,
        "member deleted successfully in the organization"
      )
    );
});

const UpdateMemberRole = AsyncHandler(async (req, res) => {
  const { orgid, member } = req.body;
  const callinguserorg = await Organization.findById(orgid);
  if (!callinguserorg.members.includes[{ user: req.user._id, role: "admin" }]) {
    throw new ApiError(400, "Unauthorized Request");
  }
  if (!member) {
    throw new ApiError(500, "member cannot be empty");
  }
  const updatedrole = await Organization.updateOne(
    { _id: orgid, "members.user": member._id },
    {
      $set: {
        "members.$.role": member.role,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedrole) {
    throw new ApiError(400, "unable to update member role in organization");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedrole,
        "member role updated successfully in the organization"
      )
    );
});

const DeleteOrganization = AsyncHandler(async (req, res) => {
  //take orgid from frontend
  //validate it
  // make sure user sending this request is admin in that organization
  // find projects related to orgid
  //find tasks in the project
  //delete tasks in the project
  //delete projects in the organization
  //delete organization
  // everything goes correclty returen response successful else throw error
  const orgid = req.params?._id;
  const projects = await Project.find({ organization_Id: orgid });
  if (projects) {
    projects.forEach(async (project) => {
      const tasks = await Todo.find({ project_id: project._id });
      if (!tasks) {
        return;
      }
      tasks.forEach(async (task) => {
        const deletedtask = await Todo.findByIdAndDelete(task._id);
        if (!deletedtask) {
          throw new ApiError(500, "Something went wrong (X Tasks)");
        }
      });
      const deletedproject = await Project.findByIdAndDelete(project._id);
      if (!deletedproject) {
        throw new ApiError(500, "Something went wrong (X Project)");
      }
    });
  }
  const deletedorg = await Organization.findByIdAndDelete(orgid);
  if (!deletedorg) {
    throw new ApiError(500, "Something went wrong (X Organization)");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedorg, "Organization deleted successfully")
    );
});
export {
  CreateOrganization,
  AddOrganizationMember,
  DeleteOrganizationMember,
  UpdateMemberRole,
  DeleteOrganization
};
