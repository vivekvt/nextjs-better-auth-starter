import { z } from "zod";

export const SignInEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});

export const SignInOTPSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  otp: z
    .string()
    .min(6, { message: "Please enter the 6-digit code" })
    .max(6, { message: "Code must be 6 digits" }),
});

export type SignInEmailValues = z.infer<typeof SignInEmailSchema>;
export type SignInOTPValues = z.infer<typeof SignInOTPSchema>;
