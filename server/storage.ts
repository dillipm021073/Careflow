import { 
  type User, 
  type InsertUser, 
  type Patient, 
  type InsertPatient,
  type CareFlow,
  type InsertCareFlow,
  type Alert,
  type InsertAlert,
  type Activity,
  type InsertActivity
} from "@shared/schema";
import { randomUUID } from "crypto";

interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  pendingTasks: number;
  alerts: number;
}

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Patient methods
  getAllPatients(): Promise<Patient[]>;
  getPatientById(id: string): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  
  // Care flow methods
  getAllCareFlows(): Promise<CareFlow[]>;
  getCareFlowById(id: string): Promise<CareFlow | undefined>;
  createCareFlow(careFlow: InsertCareFlow): Promise<CareFlow>;
  
  // Alert methods
  getAllAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  
  // Activity methods
  getRecentActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Dashboard methods
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private patients: Map<string, Patient>;
  private careFlows: Map<string, CareFlow>;
  private alerts: Map<string, Alert>;
  private activities: Map<string, Activity>;

  constructor() {
    this.users = new Map();
    this.patients = new Map();
    this.careFlows = new Map();
    this.alerts = new Map();
    this.activities = new Map();
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample patients
    const samplePatients: Patient[] = [
      {
        id: "patient-1",
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1965-05-15",
        gender: "Male",
        phoneNumber: "(555) 123-4567",
        email: "john.smith@email.com",
        address: "123 Main St, City, State 12345",
        emergencyContact: "Jane Smith - (555) 987-6543",
        medicalHistory: "Previous heart surgery in 2022",
        allergies: "Penicillin",
        createdAt: new Date("2024-01-15T00:00:00Z")
      },
      {
        id: "patient-2",
        firstName: "Sarah",
        lastName: "Davis",
        dateOfBirth: "1978-09-22",
        gender: "Female",
        phoneNumber: "(555) 234-5678",
        email: "sarah.davis@email.com",
        address: "456 Oak Ave, City, State 12345",
        emergencyContact: "Tom Davis - (555) 876-5432",
        medicalHistory: "Type 2 Diabetes diagnosed 2020",
        allergies: "None known",
        createdAt: new Date("2024-02-01T00:00:00Z")
      }
    ];

    samplePatients.forEach(patient => this.patients.set(patient.id, patient));

    // Sample care flows
    const sampleCareFlows: CareFlow[] = [
      {
        id: "flow-1",
        patientId: "patient-1",
        title: "Post-Surgical Recovery Flow",
        description: "Comprehensive cardiac rehabilitation program",
        category: "cardiac",
        status: "active",
        priority: "high",
        progress: 78,
        startDate: new Date("2024-03-15T00:00:00Z"),
        endDate: null,
        assignedTo: "user-1",
        stages: [
          { id: "stage-1", title: "Pre-Surgery Assessment", status: "completed" },
          { id: "stage-2", title: "Recovery Phase", status: "in-progress" },
          { id: "stage-3", title: "Rehabilitation", status: "pending" }
        ],
        createdAt: new Date("2024-03-15T00:00:00Z")
      },
      {
        id: "flow-2",
        patientId: "patient-2",
        title: "Type 2 Diabetes Management",
        description: "Complete diabetes care with glucose monitoring",
        category: "diabetes",
        status: "active",
        priority: "medium",
        progress: 92,
        startDate: new Date("2024-02-01T00:00:00Z"),
        endDate: null,
        assignedTo: "user-2",
        stages: [
          { id: "stage-1", title: "Initial Assessment", status: "completed" },
          { id: "stage-2", title: "Medication Management", status: "in-progress" },
          { id: "stage-3", title: "Lifestyle Counseling", status: "in-progress" }
        ],
        createdAt: new Date("2024-02-01T00:00:00Z")
      }
    ];

    sampleCareFlows.forEach(flow => this.careFlows.set(flow.id, flow));

    // Sample alerts
    const sampleAlerts: Alert[] = [
      {
        id: "alert-1",
        patientId: "patient-1",
        careFlowId: "flow-1",
        type: "critical",
        title: "High Blood Pressure Alert",
        message: "Patient Emma Wilson - BP: 180/110 mmHg",
        isRead: false,
        priority: "high",
        createdAt: new Date()
      },
      {
        id: "alert-2",
        patientId: "patient-2",
        careFlowId: "flow-2",
        type: "warning",
        title: "Medication Due",
        message: "Patient Robert Brown - Insulin due 2 hours ago",
        isRead: false,
        priority: "medium",
        createdAt: new Date()
      }
    ];

    sampleAlerts.forEach(alert => this.alerts.set(alert.id, alert));

    // Sample activities
    const sampleActivities: Activity[] = [
      {
        id: "activity-1",
        patientId: "patient-1",
        careFlowId: "flow-1",
        userId: "user-1",
        type: "medication_given",
        title: "Medication administered to John Smith",
        description: "Cardiac Care Flow • 2 minutes ago",
        metadata: {},
        createdAt: new Date()
      },
      {
        id: "activity-2",
        patientId: "patient-2",
        careFlowId: "flow-2",
        userId: "user-2",
        type: "appointment_scheduled",
        title: "Follow-up appointment scheduled for Sarah Davis",
        description: "Diabetes Management • 15 minutes ago",
        metadata: {},
        createdAt: new Date()
      }
    ];

    sampleActivities.forEach(activity => this.activities.set(activity.id, activity));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Patient methods
  async getAllPatients(): Promise<Patient[]> {
    return Array.from(this.patients.values());
  }

  async getPatientById(id: string): Promise<Patient | undefined> {
    return this.patients.get(id);
  }

  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const id = randomUUID();
    const patient: Patient = { 
      ...insertPatient, 
      id,
      createdAt: new Date()
    };
    this.patients.set(id, patient);
    return patient;
  }

  // Care flow methods
  async getAllCareFlows(): Promise<CareFlow[]> {
    return Array.from(this.careFlows.values());
  }

  async getCareFlowById(id: string): Promise<CareFlow | undefined> {
    return this.careFlows.get(id);
  }

  async createCareFlow(insertCareFlow: InsertCareFlow): Promise<CareFlow> {
    const id = randomUUID();
    const careFlow: CareFlow = { 
      ...insertCareFlow, 
      id,
      createdAt: new Date()
    };
    this.careFlows.set(id, careFlow);
    return careFlow;
  }

  // Alert methods
  async getAllAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => !alert.isRead);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = { 
      ...insertAlert, 
      id,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  // Activity methods
  async getRecentActivities(): Promise<Activity[]> {
    const activities = Array.from(this.activities.values());
    return activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { 
      ...insertActivity, 
      id,
      createdAt: new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }

  // Dashboard methods
  async getDashboardStats(): Promise<DashboardStats> {
    const totalPatients = this.patients.size;
    const todayAppointments = 18; // This would be calculated from real appointment data
    const pendingTasks = 5; // This would be calculated from real task data
    const alerts = Array.from(this.alerts.values()).filter(alert => !alert.isRead).length;

    return {
      totalPatients,
      todayAppointments,
      pendingTasks,
      alerts
    };
  }
}

export const storage = new MemStorage();
