import { defineConfig } from "drizzle-kit";

const schemaName = process.env.DB_SCHEMA_NAME ?? "public";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  schemaFilter: [schemaName],
  dbCredentials: {
    url: process.env.DIRECT_URL!,
  },
  verbose: true,
  strict: true,
});
