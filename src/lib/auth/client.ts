import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const { signIn, signUp, signOut, useSession, getSession, emailOtp } =
  createAuthClient({
    plugins: [emailOTPClient()],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
  });
