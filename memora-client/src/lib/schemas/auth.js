import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long"),
});

export const signupSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data)=> data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] //attach the error to the field
})