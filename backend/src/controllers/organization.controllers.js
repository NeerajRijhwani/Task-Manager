import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Organization } from "../models/organization.models.js";
import { Project } from "../models/project.model.js";
import { Todo } from "../models/todo.models.js";
import { Invitation } from "../models/invitation.models.js";
import { TransactionHandler } from "../utils/TransactionHandler.js";
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
const AddOrganizationMember = TransactionHandler(async (req, res, next, session) => {
  //take data from frontend
  //check validation
  // check if user and role exists in newmember field
  //check if organization is exists and is updated
  //if not throw error else return response successfully
  const invitation_token = req.params?.token;
  if (!invitation_token) {
    throw new ApiError(400, "All fields are required");
  }
  const invitation = await Invitation.find({
    hashedtoken:invitation_token,
    to: req.user._id,
    status: "pending",
  }).session(session);
  if (!invitation) {
    throw new ApiError(400, "Invitation Doesnt exists");
  }
  invitation.status = "accepted";
  await invitation.save().session(session);
  let newmember={
    user:req.user._id,
    role:invitation.role
  }
  const updated_org = await Organization.findByIdAndUpdate(
    invitation.organization_id,
    {
      $push: {
        members: newmember,
      },
    },
    {
      new: true,
    }
  ).session(session);
  if (!updated_org) {
    throw new ApiError(500, "unable to add in organization");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updated_org,
        "Added successfully in the organization"
      )
    );
});

const DeleteOrganizationMember = AsyncHandler(async (req, res) => {
  // take data from frontend
  //validate it
  // check if organization and member exists if not throw error
  //update the organization by deleting member
  // return response successful
  const { member_id } = req.body;
  const user = await User.findById(member_id);
  if (!user) {
    throw new ApiError(500, "user to be deleted does not exists");
  }
  const updated_org = await Organization.findByIdAndUpdate(
    req.org._id,
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
  const { member } = req.body;
  if (!member) {
    throw new ApiError(404, "member cannot be empty");
  }
  if (!(member?.user && ["admin", "member"].includes(member?.role))) {
    throw new ApiError(
      400,
      "member does not contain user and role fields or invalid role"
    );
  }
  const updatedrole = await Organization.updateOne(
    { _id: req.org._id, "members.user": member?.user },
    {
      $set: {
        "members.$.role": member?.role,
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

const DeleteOrganization = TransactionHandler(
  async (req, res, next, session) => {
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
    const projects = await Project.find({ organization_id: orgid }).session(
      session
    );
    const projectids = projects.map((p) => p._id);
    const deletedprojects = await Project.deleteMany({
      _id: { $in: projectids  },
    }).session(session);
    const deletedtasks = await Todo.deleteMany({
      project_id: { $in: projectids  },
    }).session(session);
    const deletedorg =
      await Organization.findByIdAndDelete(orgid).session(session);
    if (!deletedorg) {
      throw new ApiError(500, "Something went wrong (X Organization)");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { deletedorg, deletedprojects, deletedtasks },
          "Organization deleted successfully"
        )
      );
  }
);
export {
  CreateOrganization,
  AddOrganizationMember,
  DeleteOrganizationMember,
  UpdateMemberRole,
  DeleteOrganization,
};
