import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string({ required_error: "first_name is required" }),
  last_name: z.string({ required_error: "last_name is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});
