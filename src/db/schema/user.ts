import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { gender, role } from ".";
import { z } from "zod";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  role: role("role").default("member").notNull(),
  gender: gender("gender").default("male"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export type UserType = typeof user.$inferSelect;

export const loginSchema = z.object({
  username: z.string().min(4, { message: "Username is required" }),
  password: z
    .string()
    .min(6, { message: "Password lenght at least 6 characters" }),
});

const disallowedUsernamePatterns = [
  "admin",
  "superuser",
  "superadmin",
  "root",
  "jabirdev",
  "cakfan",
  "withcakfan",
];

export const setupSchema = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  username: z
    .string()
    .min(4, { message: "Username is required" })
    .regex(/^[a-zA-Z0-0_-]+$/, "Only letters, numbers, - and _ allowed")
    .refine(
      (username) => {
        for (const pattern of disallowedUsernamePatterns) {
          if (username.toLowerCase().includes(pattern)) {
            return false;
          }
        }
        return true;
      },
      { message: "Username contains disallowed words" },
    ),
  gender: z.string().refine(
    (val) => {
      return val === "male" || val === "female";
    },
    {
      message: "Gender must be either 'male' or 'female'",
    },
  ),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SetupValues = z.infer<typeof setupSchema>;
