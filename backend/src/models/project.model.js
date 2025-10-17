import mongoose, { Schema } from "mongoose";
import { Organization } from "./organization.models.js";
import ApiError from "../utils/ApiError.js"
const projectSchema = new Schema(
  {
    organization_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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

projectSchema.pre("save", async function (next) {
  const org = Organization.findById(this.organization_Id);
  if (!org) throw new ApiError(404, "organization does not exist");
  const orgmembers = org.members.map((mem) => mem.user);
  const checkvalid = this.members.filter((m) => !orgmembers.includes(m.user));
  if (checkvalid.length > 0) {
    throw new ApiError(404, "members does not exist in the organization");
  }
  next();
});

export const Project = mongoose.model("Project", projectSchema);
