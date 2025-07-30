import { pgTable, integer, text, serial, varchar } from "drizzle-orm/pg-core";

export const cart = pgTable("cart", {
  _id: serial("_id").primaryKey(),
  product_id: text("product_id").notNull(),
  color: text("color").notNull(),
  user_id: text("user_id").notNull(),
  quantity: integer("quantity").notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  sentiment:varchar("sentiment", {length:255}).notNull()
});