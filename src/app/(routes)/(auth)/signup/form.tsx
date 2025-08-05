"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  SignUpEmailSchema,
  SignUpEmailValues,
  SignUpOTPSchema,
  SignUpOTPValues,
} from "./validate";
import InputStartIcon from "../components/input-start-icon";
import { cn } from "@/lib/utils";
import { MailIcon, UserIcon, Hash } from "lucide-react";
import { GenderRadioGroup } from "../components/gender-radio-group";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [userDetails, setUserDetails] = useState<SignUpEmailValues | null>(
    null,
  );
  const router = useRouter();

  const detailsForm = useForm<SignUpEmailValues>({
    resolver: zodResolver(SignUpEmailSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
    },
  });

  const otpForm = useForm<SignUpOTPValues>({
    resolver: zodResolver(SignUpOTPSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
      otp: "",
    },
  });

  function onDetailsSubmit(data: SignUpEmailValues) {
    startTransition(async () => {
      try {
        const response = await emailOtp.sendVerificationOtp({
          email: data.email,
          type: "sign-in",
        });

        if (response.error) {
          toast.error(response.error.message);
        } else {
          setUserDetails(data);
          otpForm.setValue("name", data.name);
          otpForm.setValue("email", data.email);
          otpForm.setValue("gender", data.gender);
          setStep("otp");
          toast.success("Verification code sent to your email!");
        }
      } catch (error) {
        toast.error("Failed to send verification code");
      }
    });
  }

  function onOTPSubmit(data: SignUpOTPValues) {
    startTransition(async () => {
      try {
        const response = await signIn.emailOtp({
          email: data.email,
          otp: data.otp,
        });

        if (response.error) {
          toast.error(response.error.message);
        } else {
          toast.success("Account created successfully!");
          router.push("/");
        }
      } catch (error) {
        toast.error("Invalid verification code");
      }
    });
  }

  const getDetailsInputClassName = (fieldName: keyof SignUpEmailValues) =>
    cn(
      detailsForm.formState.errors[fieldName] &&
        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20",
    );

  const getOTPInputClassName = (fieldName: keyof SignUpOTPValues) =>
    cn(
      otpForm.formState.errors[fieldName] &&
        "border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20",
    );

  if (step === "details") {
    return (
      <Form {...detailsForm}>
        <form
          onSubmit={detailsForm.handleSubmit(onDetailsSubmit)}
          className="z-50 my-8 flex w-full flex-col gap-5"
        >
          <FormField
            control={detailsForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputStartIcon icon={UserIcon}>
                    <Input
                      placeholder="Full Name"
                      className={cn(
                        "peer ps-9",
                        getDetailsInputClassName("name"),
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

          <FormField
            control={detailsForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputStartIcon icon={MailIcon}>
                    <Input
                      placeholder="Email"
                      className={cn(
                        "peer ps-9",
                        getDetailsInputClassName("email"),
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

          <FormField
            control={detailsForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <GenderRadioGroup
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
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
          We sent a verification code to <strong>{userDetails?.email}</strong>
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
            onClick={() => setStep("details")}
            className="flex-1"
            disabled={isPending}
          >
            Back
          </Button>
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={() => userDetails && onDetailsSubmit(userDetails)}
          className="text-sm"
        >
          Resend code
        </Button>
      </form>
    </Form>
  );
}
