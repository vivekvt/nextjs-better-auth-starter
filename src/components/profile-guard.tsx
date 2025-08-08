import { getMe } from "@/actions/user";
import { redirect } from "next/navigation";
import { needsProfileCompletion } from "@/lib/profile-utils";
import { PROFILE_COMPLETION_REDIRECT } from "@/routes";

interface ProfileGuardProps {
  children: React.ReactNode;
}

export default async function ProfileGuard({ children }: ProfileGuardProps) {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  if (needsProfileCompletion(user)) {
    redirect(PROFILE_COMPLETION_REDIRECT);
  }

  return <>{children}</>;
}
