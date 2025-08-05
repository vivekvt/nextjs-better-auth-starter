import { z } from "zod";

export const SignUpEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Must be at least 2 characters" }),
  gender: z.enum(["male", "female"], {
    message: "Gender must be either 'male' or 'female'.",
  }),
});

export const SignUpOTPSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  name: z.string().min(2, { message: "Must be at least 2 characters" }),
  gender: z.enum(["male", "female"], {
    message: "Gender must be either 'male' or 'female'.",
  }),
  otp: z
    .string()
    .min(6, { message: "Please enter the 6-digit code" })
    .max(6, { message: "Code must be 6 digits" }),
});

export type SignUpEmailValues = z.infer<typeof SignUpEmailSchema>;
export type SignUpOTPValues = z.infer<typeof SignUpOTPSchema>;
