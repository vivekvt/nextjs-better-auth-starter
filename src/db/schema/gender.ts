import { pgEnum } from "drizzle-orm/pg-core";

export const gender = pgEnum("gender", ["male", "female"]);
