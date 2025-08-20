import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  msisdn: text("msisdn").notNull().unique(), // Mobile number
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  dateOfBirth: text("date_of_birth"),
  address: text("address"),
  customerType: text("customer_type").notNull(), // prepaid, postpaid
  accountStatus: text("account_status").notNull().default("active"), // active, suspended, disconnected
  registrationDate: timestamp("registration_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plans = pgTable("plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // prepaid, postpaid
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  dataAllowance: integer("data_allowance"), // in MB
  voiceMinutes: integer("voice_minutes"),
  smsCount: integer("sms_count"),
  validityDays: integer("validity_days"),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  planId: varchar("plan_id").notNull(),
  status: text("status").notNull().default("active"), // active, expired, cancelled
  activationDate: timestamp("activation_date").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  autoRenewal: boolean("auto_renewal").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usage = pgTable("usage", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  subscriptionId: varchar("subscription_id").notNull(),
  dataUsed: integer("data_used").notNull().default(0), // in MB
  voiceUsed: integer("voice_used").notNull().default(0), // in minutes
  smsUsed: integer("sms_used").notNull().default(0),
  usageDate: timestamp("usage_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  type: text("type").notNull(), // topup, plan_purchase, addon_purchase, bill_payment
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("completed"), // pending, completed, failed
  referenceNumber: text("reference_number"),
  paymentMethod: text("payment_method"), // gcash, paymaya, card, bank
  createdAt: timestamp("created_at").defaultNow(),
});

export const promos = pgTable("promos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // data, voice, sms, combo
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  dataAmount: integer("data_amount"), // in MB
  voiceMinutes: integer("voice_minutes"),
  smsCount: integer("sms_count"),
  validityHours: integer("validity_hours"),
  keyword: text("keyword"), // SMS keyword to avail
  isActive: boolean("is_active").notNull().default(true),
  category: text("category").notNull().default("regular"), // featured, regular, limited
  createdAt: timestamp("created_at").defaultNow(),
});

export const customerPromos = pgTable("customer_promos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  promoId: varchar("promo_id").notNull(),
  status: text("status").notNull().default("active"), // active, expired, cancelled
  activationDate: timestamp("activation_date").defaultNow(),
  expiryDate: timestamp("expiry_date").notNull(),
  remainingData: integer("remaining_data"),
  remainingVoice: integer("remaining_voice"),
  remainingSms: integer("remaining_sms"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  type: text("type").notNull(), // usage_alert, payment_due, promo_expiry, system_update
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  priority: text("priority").notNull().default("normal"), // low, normal, high, urgent
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas for API validation
export const insertCustomerSchema = createInsertSchema(customers).omit({
  id: true,
  createdAt: true,
});

export const insertPlanSchema = createInsertSchema(plans).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
});

export const insertUsageSchema = createInsertSchema(usage).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertPromoSchema = createInsertSchema(promos).omit({
  id: true,
  createdAt: true,
});

export const insertCustomerPromoSchema = createInsertSchema(customerPromos).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = z.infer<typeof insertPlanSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;

export type Usage = typeof usage.$inferSelect;
export type InsertUsage = z.infer<typeof insertUsageSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Promo = typeof promos.$inferSelect;
export type InsertPromo = z.infer<typeof insertPromoSchema>;

export type CustomerPromo = typeof customerPromos.$inferSelect;
export type InsertCustomerPromo = z.infer<typeof insertCustomerPromoSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
