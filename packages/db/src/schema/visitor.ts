import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const visitor = pgTable("visitor", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  purpose: text("purpose").notNull(),
  organization: text("organization").notNull(),
  designation: text("designation").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
