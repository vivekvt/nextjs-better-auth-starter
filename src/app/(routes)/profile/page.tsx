import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import ProfileGuard from "@/components/profile-guard";
import { UserIcon } from "lucide-react";

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfileGuard>
      <div className="container mx-auto min-h-[calc(100vh-64px)] max-w-2xl px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                <UserIcon className="text-muted-foreground h-5 w-5" />
              </div>
              <h1 className="text-3xl font-bold">Profile</h1>
            </div>
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
                <p className="text-muted-foreground mt-1 text-xs">
                  Email cannot be changed
                </p>
              </div>

              <ProfileForm initialName={user.name || ""} />
            </div>
          </div>
        </div>
      </div>
    </ProfileGuard>
  );
}
