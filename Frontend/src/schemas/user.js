import { z } from "zod";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .regex(
        passwordRegex,
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
      ),
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(8, "Must be min 8 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .regex(
      passwordRegex,
      "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    ),
});
