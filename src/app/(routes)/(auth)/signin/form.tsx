"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, emailOtp } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  SignInEmailSchema,
  SignInEmailValues,
  SignInOTPSchema,
  SignInOTPValues,
} from "./validate";
import InputStartIcon from "../components/input-start-icon";
import { cn } from "@/lib/utils";
import { MailIcon, Hash } from "lucide-react";

export default function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<SignInEmailValues>({
    resolver: zodResolver(SignInEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<SignInOTPValues>({
    resolver: zodResolver(SignInOTPSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  function onEmailSubmit(data: SignInEmailValues) {
    startTransition(async () => {
      try {
        const response = await emailOtp.sendVerificationOtp({
          email: data.email,
          type: "sign-in",
        });

        if (response.error) {
          toast.error(response.error.message);
        } else {
          setUserEmail(data.email);
          otpForm.setValue("email", data.email);
          setStep("otp");
          toast.success("Verification code sent to your email!");
        }
      } catch (error) {
        toast.error("Failed to send verification code");
      }
    });
  }

  function onOTPSubmit(data: SignInOTPValues) {
    startTransition(async () => {
      try {
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
      } catch (error) {
        toast.error("Invalid verification code");
      }
    });
  }

  const getEmailInputClassName = (fieldName: keyof SignInEmailValues) =>
    cn(
      emailForm.formState.errors[fieldName] &&
        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20",
    );

  const getOTPInputClassName = (fieldName: keyof SignInOTPValues) =>
    cn(
      otpForm.formState.errors[fieldName] &&
        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20",
    );

  if (step === "email") {
    return (
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="z-50 my-8 flex w-full flex-col gap-5"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputStartIcon icon={MailIcon}>
                    <Input
                      placeholder="Email"
                      className={cn(
                        "peer ps-9",
                        getEmailInputClassName("email"),
                      )}
                      disabled={isPending}
                      {...field}
                    />
                  </InputStartIcon>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="mt-5 w-full">
            {isPending ? "Sending..." : "Send Verification Code"}
          </Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit(onOTPSubmit)}
        className="z-50 my-8 flex w-full flex-col gap-5"
      >
        <div className="text-muted-foreground mb-4 text-center text-sm">
          We sent a verification code to <strong>{userEmail}</strong>
        </div>

        <FormField
          control={otpForm.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputStartIcon icon={Hash}>
                  <Input
                    placeholder="Enter 6-digit code"
                    className={cn("peer ps-9", getOTPInputClassName("otp"))}
                    disabled={isPending}
                    maxLength={6}
                    {...field}
                  />
                </InputStartIcon>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep("email")}
            className="flex-1"
            disabled={isPending}
          >
            Back
          </Button>
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Verifying..." : "Sign In"}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={() => onEmailSubmit({ email: userEmail })}
          className="text-sm"
        >
          Resend code
        </Button>
      </form>
    </Form>
  );
}
