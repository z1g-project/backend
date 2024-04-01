import { createInsertSchema } from "drizzle-zod";
import { pgTable, unique, text } from "drizzle-orm/pg-core";

export const app = pgTable(
  "app",
  {
    name: text("name").primaryKey().notNull(),
    description: text("description").notNull().default(""),
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

export const insertAppSchema = createInsertSchema(app);
