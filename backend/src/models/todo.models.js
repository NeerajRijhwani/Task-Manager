import mongoose, { Schema } from "mongoose";
import Organization from "./organization.models.js";
import Project from "./project.model.js"
const todoSchema = new Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Moderate", "Low"],
      default: "High",
    },
    description: {
      type: String,
    },
    taskimage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed"],
      default: "Not Started",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);
todoSchema.pre("save", async function (next) {
  if(!validator.isDate(this.date)){
     throw new ApiError(400,"invalid date")
  }
  const isverified=false;
  const organizations = await Organization.find({
    members: {
      $in: { user: req.user._id },
    },
  });
  if(!organizations){
        throw new ApiError(400,"UnAuthorized Access")
    }
  organizations.forEach(async(org) => {
    const projects=await Project.find(org?._id)
    if(!projects){
        throw new ApiError(400,"UnAuthorized Access")
    }
    projects.forEach(function(pro){
      if(pro.members.include({user:req.user?._id})){
      isverified=true;
      }
    })
  });
  if(!isverified){
    throw new ApiError(400,"UnAuthorized Access")
  }
 next();
});

export const Todo = mongoose.model("Todo", todoSchema);
