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
            subject: "Your Sign-in Code",
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Sign-in Code</title>
              </head>
              <body style="margin: 0; padding: 20px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
                <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0;">
                      Your Sign-in Code
                    </h1>
                    <p style="color: #6b7280; font-size: 16px; margin: 8px 0 0;">
                      Enter this code to sign in to your account
                    </p>
                  </div>
                  
                  <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
                    <div style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #111827; font-family: 'Courier New', monospace;">
                      ${otp}
                    </div>
                  </div>
                  
                  <div style="text-align: center; color: #6b7280; font-size: 14px;">
                    <p style="margin: 16px 0 0;">
                      This code expires in 5 minutes.<br>
                      If you didn't request this, please ignore this email.
                    </p>
                  </div>
                  
                </div>
              </body>
              </html>
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
