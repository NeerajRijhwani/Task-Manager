import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Organization } from "../models/organization.models.js";
import { Invitation } from "../models/invitation.models.js";

const createInvitation = AsyncHandler(async (req, res) => {
  const { inviteeEmail, to, role } = req.body;
  const userRegistered = true;
  if (inviteeEmail == "" || to == "" || role == "") {
    throw new ApiError(400, "All fields are required");
  }
  const invitee =await User.findById(to);
  if (!invitee) {
    to = "";
    userRegistered = false;
  }
  const invitation =await Invitation.create({
    organization_id: req.org._id,
    inviteeEmail,
    to,
    from: req.user._id,
  });
  if (!invitation) {
    throw new ApiError(400, "Unable to create Invitation");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, invitation, "Invitation Sent Successfully"));
});

const getrecieveInvites=AsyncHandler(async(req,res)=>{
    const invitations=await Invitation.find({to:req.user._id,status:"pending"}).select("-status -hashedtoken -tokenCreatedAt -tokenExpiresAt -acceptedAt -revokedAt")
    if(!invitations){
        return res.status(200).json(new ApiResponse(200,null,"No Invitations.Check Back LAter"))
    }
    return res.status(200).json(new ApiResponse(200,invitations,"Invitations expires after 7 days"))
})
const getsentInvites=AsyncHandler(async(req,res)=>{
    const invitations=await Invitation.find({from:req.user._id,status:"pending"}).select("-status -hashedtoken -tokenCreatedAt -tokenExpiresAt -acceptedAt -revokedAt")
    if(!invitations){
        return res.status(200).json(new ApiResponse(200,null,"No Invitations.Check Back LAter"))
    }
    return res.status(200).json(new ApiResponse(200,invitations,"Invitations expires after 7 days"))
})


const RejectInvitation=AsyncHandler(async(req,res)=>{
   try {
     const invitation_token=req.params?.token
    if(!invitation_token){
        throw new ApiError(400,"All fields are required")
    }
    const invitation=await Invitation.find({hashedtoken:invitation_token,to:req.user._id,status:"pending"})
    if(!invitation){
        throw new ApiError(400,"Invitation Doesnt exists or expired")
    }
    invitation.status="revoked"
    await invitation.save();

    return res.status(200).json(new ApiResponse(200,null,"Invite rejected successfully"))
   } catch (error) {
    throw new ApiError(500,"Something went wrong")
   }
})

export default {
  createInvitation,
  RejectInvitation,
  getsentInvites,
  getrecieveInvites,

}
