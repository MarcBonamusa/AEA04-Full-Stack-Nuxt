import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  login: text("login"),
  password: text("password"),
});

export const golejadors = sqliteTable("golejadors", {
  id: integer("id").primaryKey({ autoIncrement: true }), 
  name: text("name"),
  team: text("team"),
  goals: integer("goals"),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
})