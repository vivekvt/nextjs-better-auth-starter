import * as schema from "./schema";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL! // Use DATABASE_URL in production for pooling
    : process.env.DIRECT_URL!, // Use DIRECT_URL in development for direct access
);
export const db = drizzle(client, { schema });
