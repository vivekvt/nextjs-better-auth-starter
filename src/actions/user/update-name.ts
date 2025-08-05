"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserName(name: string) {
  try {
    // Get current session
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Validate name
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        error: "Name is required",
      };
    }

    if (name.trim().length > 100) {
      return {
        success: false,
        error: "Name must be less than 100 characters",
      };
    }

    // Update user name in database
    await db
      .update(user)
      .set({
        name: name.trim(),
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    // Revalidate profile page and home page to reflect changes
    revalidatePath("/profile");
    revalidatePath("/");

    return {
      success: true,
      message: "Name updated successfully",
    };
  } catch (error) {
    console.error("Failed to update user name:", error);
    return {
      success: false,
      error: "Failed to update name. Please try again.",
    };
  }
}
