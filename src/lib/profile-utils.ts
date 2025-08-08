import { UserType } from "@/db/schema";

/**
 * Check if a user's profile is complete
 * A profile is considered complete when the user has a name
 */
export function isProfileComplete(user: UserType): boolean {
  return !!(user.name && user.name.trim().length > 0);
}

/**
 * Check if a user needs to complete their profile
 */
export function needsProfileCompletion(user: UserType): boolean {
  return !isProfileComplete(user);
}
