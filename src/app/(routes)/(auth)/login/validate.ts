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
    .length(6, { message: "Verification code must be exactly 6 digits" })
    .regex(/^\d{6}$/, {
      message: "Verification code must contain only numbers",
    }),
});

export type SignInEmailValues = z.infer<typeof SignInEmailSchema>;
export type SignInOTPValues = z.infer<typeof SignInOTPSchema>;
