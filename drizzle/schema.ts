import { createInsertSchema } from "drizzle-zod";
import { pgTable, unique, text, boolean } from "drizzle-orm/pg-core";
import App from "next/app";

export const app = pgTable(
  "app",
  {
    name: text("name").primaryKey().notNull(),
    description: text("description").notNull().default(""),
    featured: boolean("featured").notNull().default(false),
    url: text("url").notNull(),
    image: text("image").notNull(),
    icon: text("icon").notNull().default(""),
  },
  (table) => {
    return {
      appNameUnique: unique("app_name_unique").on(table.name),
    };
  },
);
export type SelectApp = typeof app.$inferSelect;

export const insertAppSchema = createInsertSchema(app);
