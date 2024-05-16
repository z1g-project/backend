import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
