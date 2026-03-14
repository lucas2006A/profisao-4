import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Comments table for user feedback
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  state: mysqlEnum("state", ["MT", "PR"]).notNull(),
  content: text("content").notNull(),
  approved: int("approved").default(0).notNull(), // 0 = pending, 1 = approved, -1 = rejected
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

// Economic data table
export const economicData = mysqlTable("economicData", {
  id: int("id").autoincrement().primaryKey(),
  state: mysqlEnum("state", ["MT", "PR"]).notNull(),
  metric: varchar("metric", { length: 100 }).notNull(), // e.g., "salary", "costOfLiving", "gdp"
  value: varchar("value", { length: 255 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull(), // e.g., "R$", "%", "ton"
  year: int("year").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EconomicData = typeof economicData.$inferSelect;
export type InsertEconomicData = typeof economicData.$inferInsert;

// AI Conversations table
export const aiConversations = mysqlTable("aiConversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  context: varchar("context", { length: 255 }), // e.g., "salary_comparison", "investment_analysis"
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AIConversation = typeof aiConversations.$inferSelect;
export type InsertAIConversation = typeof aiConversations.$inferInsert;