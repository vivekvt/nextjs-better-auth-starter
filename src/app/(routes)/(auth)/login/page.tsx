import { type Metadata } from "next";
import SignInForm from "./form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <div className="from-background via-background to-muted/30 flex min-h-[calc(100vh-64px)] w-full items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center">
          <div className="from-primary to-primary/80 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r">
            <svg
              className="text-primary-foreground h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Sign in to your account with email verification
          </p>
        </div>

        {/* Form Container */}
        <div className="border-border bg-card/50 rounded-2xl border p-4 shadow-lg backdrop-blur-sm">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
