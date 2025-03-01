import { pgSchema } from "drizzle-orm/pg-core";

export const dbSchema = pgSchema(process.env.DB_SCHEMA_NAME!);
