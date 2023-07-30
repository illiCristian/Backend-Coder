import { z } from "zod";

//Creamos un esquema para validar el registro
export const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});

//Creamos un esquema para validar el login
export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});
