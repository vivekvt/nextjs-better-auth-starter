import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";
import { UserIcon } from "lucide-react";

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-6">
        <div className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <UserIcon className="text-muted-foreground h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <div className="bg-card space-y-6 rounded-lg border p-6">
          <div className="space-y-4">
            <div>
              <label className="text-muted-foreground text-sm font-medium">
                Email
              </label>
              <div className="bg-muted mt-1 rounded-md p-3 text-sm">
                {user.email}
              </div>
              <p className="text-muted-foreground mt-1 text-xs">
                Email cannot be changed
              </p>
            </div>

            <ProfileForm initialName={user.name} />
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h3 className="text-muted-foreground mb-2 text-sm font-medium">
            Account Information
          </h3>
          <div className="text-muted-foreground space-y-1 text-sm">
            <p>
              Member since: {new Date(user.createdAt!).toLocaleDateString()}
            </p>
            <p>Role: {user.role}</p>
            {user.gender && <p>Gender: {user.gender}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
