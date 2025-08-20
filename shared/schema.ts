import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  role: text("role").notNull().default("nurse"), // nurse, doctor, admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const patients = pgTable("patients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  gender: text("gender").notNull(),
  phoneNumber: text("phone_number"),
  email: text("email"),
  address: text("address"),
  emergencyContact: text("emergency_contact"),
  medicalHistory: text("medical_history"),
  allergies: text("allergies"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const careFlows = pgTable("care_flows", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // cardiac, diabetes, mental-health, etc.
  status: text("status").notNull().default("active"), // active, completed, paused
  priority: text("priority").notNull().default("medium"), // low, medium, high, critical
  progress: integer("progress").notNull().default(0), // 0-100
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  assignedTo: varchar("assigned_to").notNull(),
  stages: jsonb("stages").notNull().default([]), // Array of care flow stages
  createdAt: timestamp("created_at").defaultNow(),
});

export const careFlowStages = pgTable("care_flow_stages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  careFlowId: varchar("care_flow_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, in-progress, completed
  order: integer("order").notNull(),
  dueDate: timestamp("due_date"),
  completedAt: timestamp("completed_at"),
  assignedTo: varchar("assigned_to"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  careFlowId: varchar("care_flow_id"),
  title: text("title").notNull(),
  description: text("description"),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").notNull().default(30), // minutes
  status: text("status").notNull().default("scheduled"), // scheduled, completed, cancelled
  assignedTo: varchar("assigned_to").notNull(),
  location: text("location"),
  type: text("type").notNull().default("in-person"), // in-person, telehealth
  createdAt: timestamp("created_at").defaultNow(),
});

export const medications = pgTable("medications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  careFlowId: varchar("care_flow_id"),
  name: text("name").notNull(),
  dosage: text("dosage").notNull(),
  frequency: text("frequency").notNull(),
  instructions: text("instructions"),
  prescribedBy: varchar("prescribed_by").notNull(),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id").notNull(),
  careFlowId: varchar("care_flow_id"),
  type: text("type").notNull(), // critical, warning, info
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientId: varchar("patient_id"),
  careFlowId: varchar("care_flow_id"),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // medication_given, appointment_scheduled, note_added, etc.
  title: text("title").notNull(),
  description: text("description"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas for API validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertPatientSchema = createInsertSchema(patients).omit({
  id: true,
  createdAt: true,
});

export const insertCareFlowSchema = createInsertSchema(careFlows).omit({
  id: true,
  createdAt: true,
});

export const insertCareFlowStageSchema = createInsertSchema(careFlowStages).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const insertMedicationSchema = createInsertSchema(medications).omit({
  id: true,
  createdAt: true,
});

export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Patient = typeof patients.$inferSelect;
export type InsertPatient = z.infer<typeof insertPatientSchema>;

export type CareFlow = typeof careFlows.$inferSelect;
export type InsertCareFlow = z.infer<typeof insertCareFlowSchema>;

export type CareFlowStage = typeof careFlowStages.$inferSelect;
export type InsertCareFlowStage = z.infer<typeof insertCareFlowStageSchema>;

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;

export type Medication = typeof medications.$inferSelect;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
