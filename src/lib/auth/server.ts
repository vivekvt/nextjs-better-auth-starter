import { db } from "@/db";
import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { resend, senderEmail } from "@/lib/resend";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        try {
          await resend.emails.send({
            from: senderEmail!,
            to: email,
            subject:
              type === "sign-in"
                ? "Your Sign-in Code"
                : "Your Verification Code",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Your verification code</h2>
                <p>Enter this code to ${type === "sign-in" ? "sign in" : "verify your email"}:</p>
                <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                  ${otp}
                </div>
                <p>This code will expire in 5 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
            `,
          });
        } catch (error) {
          console.error("Failed to send OTP email:", error);
          throw error;
        }
      },
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      disableSignUp: false, // Allow auto sign-up on verification
    }),
  ],

});
