import { appConfig } from "@/lib/appConfig";
import ProfileGuard from "@/components/profile-guard";
import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfileGuard>
      <div className="container mx-auto min-h-[calc(100vh-64px)] px-4 py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to {appConfig.name}</h1>
            <p className="text-muted-foreground mt-2">
              Hello, {user.name}! This is your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">Profile</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Manage your account settings and preferences
              </p>
              <a 
                href="/profile" 
                className="text-primary hover:underline text-sm font-medium"
              >
                View Profile →
              </a>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Learn how to make the most of your account
              </p>
              <span className="text-muted-foreground text-sm">
                Coming soon...
              </span>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get help and find answers to your questions
              </p>
              <span className="text-muted-foreground text-sm">
                Coming soon...
              </span>
            </div>
          </div>
        </div>
      </div>
    </ProfileGuard>
  );
}
