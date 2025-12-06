import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorhandler } from "./middlewares/ErrorHandler.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Adjust this to your frontend's URL
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../../frontend/signup")));
app.use(express.static(path.join(__dirname, "../../frontend/")));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/users/register

import todoRouter from "./routes/todo.routes.js";
app.use("/api/v1/todo", todoRouter);

import projectrouter from "./routes/project.routes.js";
app.use("/api/v1/project", projectrouter);
import organizationrouter from "./routes/organization.routes.js";
app.use("/api/v1/organization", organizationrouter);

import invitationrouter from "./routes/invitation.routes.js";
app.use("/api/v1/invitation", invitationrouter);
// app.use(errorhandler)
export { app };
