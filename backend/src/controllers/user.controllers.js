import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

const RegisterUser = AsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createduser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered successfully"));
});
const generateAccessandRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};
const LoginUser = AsyncHandler(async (req, res) => {
  //take info from frontend
  //validation-not empty
  // check if username/email exists in db
  // if yes check password is correct or not
  //Access and refresh token and send it through cookie
  // user successfully logged in

  const { email, password } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "User does not exists");
  }
  const IsPasswordValid = await user.IsPasswordCorrect(password);
  if (!IsPasswordValid) {
    throw new ApiError(400, "Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedinUser,
          accessToken,
          refreshToken,
        },
        "User logged in Succesfully"
      )
    );
});
const LogoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
const refreshAccessToken = AsyncHandler(async (req, res) => {
  const incomingrefreshtoken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingrefreshtoken) throw new ApiError(401, "Unauthorized Request");

  try {
    const decodedToken = jwt.verify(
      incomingrefreshtoken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(400, "Invalid Refresh Token");
    if (incomingrefreshtoken !== user.refreshToken)
      throw new ApiError(400, "Refresh Token is expired ");
    const options = {
      httponly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } =
      await generateAccessandRefreshToken(user._id);
    return res
      .status(200)
      .cookie("acessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        200,
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "AccessToken refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid RefreshToken");
  }
});
const GetUserDetails = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User Details Fetched Successfully"));
});
const ChangeCurrentPassword = AsyncHandler(async (req, res) => {
  const { oldpassword, newpassword } = req.body;
  const user = await User.findById(req.user?._id);
  const checkpassword = user.IsPasswordCorrect(oldpassword);
  if (!checkpassword) throw new ApiError(401, " Old Password is incorrect");
  user.password = newpassword;
  await user.save({ validateBeforeSave: false });
});
const ChangeAccountDetails = AsyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) throw new ApiError(401, "All Fields Are required");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshtoken");
  if (!user) throw new ApiError(500, "Unable to Update Details");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details Updated Successfully"));
});

export {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetUserDetails,
  ChangeCurrentPassword,
  ChangeAccountDetails,
  refreshAccessToken,
};
