import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";
import CompleteProfileForm from "./complete-profile-form";
import { UserPlus } from "lucide-react";

export default async function CompleteProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  // If profile is already complete, redirect to home
  if (user.name && user.name.trim().length > 0) {
    redirect("/");
  }

  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <UserPlus className="text-primary h-6 w-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Please enter your name to continue using the app
          </p>
        </div>

        <div className="bg-card space-y-6 rounded-lg border p-6">
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Email
              </label>
              <div className="bg-muted mt-1 rounded-md p-2.5 text-sm">
                {user.email}
              </div>
            </div>

            <CompleteProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
