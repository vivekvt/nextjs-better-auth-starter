export const publicRoutes: string[] = ["/", "/about"];

export const authRoutes: string[] = ["/login"];

// Routes that require authentication but not a complete profile
export const profileCompletionRoutes: string[] = ["/complete-profile"];

export const apiAuthPrefix: string = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";

export const PROFILE_COMPLETION_REDIRECT: string = "/complete-profile";
