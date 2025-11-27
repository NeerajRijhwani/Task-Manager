import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
const invitationSchema = new Schema(
  {
    organization_id: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
    },
    inviteeEmail: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "revoked"],
      default: "pending",
      index: true,
    },
    hashedtoken: {
      type: String,
      required: true,
    },
    tokenExpiresAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);
invitationSchema.pre("save", function tokenhash(next) {
  if (!this.isModified("hashedtoken")) return next();
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  this.hashedtoken = hash;
  this.tokenExpiresAt = new Date(Date.now() + 30* 24 * 60 * 60 * 1000);
});

// partial index for ensuring no duplicate invite for same user from same org
inviteSchema.index(
  { organizationId: 1, inviteeEmail: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "pending",
      inviteeEmail: { $exists: true },
    },
  }
);
// TTL for deletion of inviation on expiration
inviteSchema.index(
  { tokenExpiresAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

export const Invitation = mongoose.model("Invitation", invitationSchema);
