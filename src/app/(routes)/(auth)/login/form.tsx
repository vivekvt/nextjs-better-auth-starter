"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, emailOtp } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OTPInput } from "@/components/ui/otp-input";
import { toast } from "sonner";
import {
  SignInEmailSchema,
  SignInEmailValues,
  SignInOTPSchema,
  SignInOTPValues,
} from "./validate";
import { MailIcon, ArrowLeft } from "lucide-react";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<SignInEmailValues>({
    resolver: zodResolver(SignInEmailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<SignInOTPValues>({
    resolver: zodResolver(SignInOTPSchema),
    defaultValues: { email: "", otp: "" },
  });

  const sendOTP = async (email: string) => {
    const response = await emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (response.error) {
      toast.error(response.error.message);
      return false;
    }

    toast.success("Verification code sent!");
    return true;
  };

  const onEmailSubmit = (data: SignInEmailValues) => {
    startTransition(async () => {
      const success = await sendOTP(data.email);
      if (success) {
        setUserEmail(data.email);
        otpForm.setValue("email", data.email);
        otpForm.setValue("otp", "");
        setStep("otp");
      }
    });
  };

  const onOTPSubmit = (data: SignInOTPValues) => {
    startTransition(async () => {
      const response = await signIn.emailOtp({
        email: data.email,
        otp: data.otp,
      });

      if (response.error) {
        toast.error(response.error.message);
      } else {
        toast.success("Signed in successfully!");
        router.push("/");
      }
    });
  };

  if (step === "email") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Enter your email</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            We&apos;ll send you a verification code
          </p>
        </div>

        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="space-y-4"
        >
          <div className="relative">
            <MailIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              {...emailForm.register("email")}
              placeholder="Enter your email"
              type="email"
              disabled={isPending}
              className="pl-10"
            />
            {emailForm.formState.errors.email && (
              <p className="text-destructive mt-1 text-sm">
                {emailForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Sending..." : "Send verification code"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Check your email</h2>
        <p className="text-muted-foreground text-sm">
          We sent a code to{" "}
          <span className="text-foreground font-medium">{userEmail}</span>
        </p>
      </div>

      <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-6">
        <div>
          <OTPInput
            value={otpForm.watch("otp") || ""}
            onChange={(value) => otpForm.setValue("otp", value)}
            length={6}
            autoFocus
            disabled={isPending}
          />
          {otpForm.formState.errors.otp && (
            <p className="text-destructive mt-2 text-center text-sm">
              {otpForm.formState.errors.otp.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            disabled={isPending || (otpForm.watch("otp")?.length || 0) < 6}
            className="w-full"
          >
            {isPending ? "Verifying..." : "Verify & Sign In"}
          </Button>

          <div className="flex items-center justify-between text-sm">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep("email")}
              disabled={isPending}
              className="text-muted-foreground hover:text-foreground h-auto p-0"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Change email
            </Button>

            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => sendOTP(userEmail)}
              className="text-muted-foreground hover:text-foreground h-auto p-0"
            >
              Resend code
            </Button>
          </div>
        </div>
      </form>

      <div className="text-center">
        <p className="text-muted-foreground text-xs">
          Code expires in 5 minutes
        </p>
      </div>
    </div>
  );
}
