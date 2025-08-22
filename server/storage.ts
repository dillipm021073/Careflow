import { 
  type Customer, 
  type InsertCustomer, 
  type Plan, 
  type InsertPlan,
  type Subscription,
  type InsertSubscription,
  type Promo,
  type InsertPromo,
  type Transaction,
  type InsertTransaction,
  type Usage,
  type InsertUsage,
  type Notification,
  type InsertNotification
} from "@shared/schema";
import { randomUUID } from "crypto";

interface DashboardStats {
  totalCustomers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  dataUsage: number;
}

export interface IStorage {
  // Customer methods
  getCustomer(id: string): Promise<Customer | undefined>;
  getCustomerByMsisdn(msisdn: string): Promise<Customer | undefined>;
  getAllCustomers(): Promise<Customer[]>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  
  // Plan methods
  getAllPlans(): Promise<Plan[]>;
  getPlanById(id: string): Promise<Plan | undefined>;
  getActivePlans(): Promise<Plan[]>;
  createPlan(plan: InsertPlan): Promise<Plan>;
  
  // Subscription methods
  getCustomerSubscriptions(customerId: string): Promise<Subscription[]>;
  getSubscriptionById(id: string): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  
  // Promo methods
  getActivePromos(): Promise<Promo[]>;
  getFeaturedPromos(): Promise<Promo[]>;
  getPromoById(id: string): Promise<Promo | undefined>;
  createPromo(promo: InsertPromo): Promise<Promo>;
  
  // Transaction methods
  getCustomerTransactions(customerId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Usage methods
  getCustomerUsage(customerId: string): Promise<Usage[]>;
  createUsage(usage: InsertUsage): Promise<Usage>;
  
  // Notification methods
  getCustomerNotifications(customerId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  
  // Dashboard methods
  getDashboardStats(): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private customers: Map<string, Customer>;
  private plans: Map<string, Plan>;
  private subscriptions: Map<string, Subscription>;
  private promos: Map<string, Promo>;
  private transactions: Map<string, Transaction>;
  private usage: Map<string, Usage>;
  private notifications: Map<string, Notification>;

  constructor() {
    this.customers = new Map();
    this.plans = new Map();
    this.subscriptions = new Map();
    this.promos = new Map();
    this.transactions = new Map();
    this.usage = new Map();
    this.notifications = new Map();
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample customers
    const sampleCustomers: Customer[] = [
      {
        id: "customer-1",
        msisdn: "09171234567",
        firstName: "Juan",
        lastName: "Dela Cruz",
        email: "juan.delacruz@email.com",
        dateOfBirth: "1990-05-15",
        address: "123 Rizal Street, Makati City, Metro Manila",
        customerType: "prepaid",
        accountStatus: "active",
        registrationDate: new Date("2023-01-15T00:00:00Z"),
        createdAt: new Date("2023-01-15T00:00:00Z")
      },
      {
        id: "customer-2",
        msisdn: "09289876543",
        firstName: "Maria",
        lastName: "Santos",
        email: "maria.santos@email.com",
        dateOfBirth: "1985-09-22",
        address: "456 EDSA, Quezon City, Metro Manila",
        customerType: "postpaid",
        accountStatus: "active",
        registrationDate: new Date("2023-02-01T00:00:00Z"),
        createdAt: new Date("2023-02-01T00:00:00Z")
      }
    ];

    sampleCustomers.forEach(customer => this.customers.set(customer.id, customer));

    // Sample plans
    const samplePlans: Plan[] = [
      {
        id: "plan-1",
        name: "Smart Prepaid 599",
        type: "prepaid",
        price: "599.00",
        dataAllowance: 12288, // 12GB
        voiceMinutes: 0, // Unlimited
        smsCount: 0, // Unlimited
        validityDays: 30,
        description: "12GB data + unlimited calls & texts to all networks",
        isActive: true,
        createdAt: new Date("2023-01-01T00:00:00Z")
      },
      {
        id: "plan-2",
        name: "Smart Postpaid 1899",
        type: "postpaid",
        price: "1899.00",
        dataAllowance: 25600, // 25GB
        voiceMinutes: 0, // Unlimited
        smsCount: 0, // Unlimited
        validityDays: 30,
        description: "25GB data + unlimited calls & texts + Netflix access",
        isActive: true,
        createdAt: new Date("2023-01-01T00:00:00Z")
      }
    ];

    samplePlans.forEach(plan => this.plans.set(plan.id, plan));

    // Sample promos
    const samplePromos: Promo[] = [
      {
        id: "promo-1",
        name: "GIGA50",
        description: "2GB data valid for 3 days",
        type: "data",
        price: "50.00",
        dataAmount: 2048, // 2GB
        voiceMinutes: null,
        smsCount: null,
        validityHours: 72,
        keyword: "GIGA50",
        isActive: true,
        category: "featured",
        createdAt: new Date("2024-01-01T00:00:00Z")
      },
      {
        id: "promo-2",
        name: "ALLNET20",
        description: "Unlimited calls and texts to all networks for 1 day",
        type: "combo",
        price: "20.00",
        dataAmount: null,
        voiceMinutes: 0, // Unlimited
        smsCount: 0, // Unlimited
        validityHours: 24,
        keyword: "ALLNET20",
        isActive: true,
        category: "regular",
        createdAt: new Date("2024-01-01T00:00:00Z")
      }
    ];

    samplePromos.forEach(promo => this.promos.set(promo.id, promo));

    // Sample subscriptions
    const sampleSubscriptions: Subscription[] = [
      {
        id: "sub-1",
        customerId: "customer-1",
        planId: "plan-1",
        status: "active",
        activationDate: new Date("2024-01-15T00:00:00Z"),
        expiryDate: new Date("2024-02-14T00:00:00Z"),
        autoRenewal: true,
        createdAt: new Date("2024-01-15T00:00:00Z")
      },
      {
        id: "sub-2",
        customerId: "customer-2",
        planId: "plan-2",
        status: "active",
        activationDate: new Date("2023-12-01T00:00:00Z"),
        expiryDate: null,
        autoRenewal: true,
        createdAt: new Date("2023-12-01T00:00:00Z")
      }
    ];

    sampleSubscriptions.forEach(subscription => this.subscriptions.set(subscription.id, subscription));

    // Sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: "txn-1",
        customerId: "customer-1",
        type: "load_purchase",
        amount: "100.00",
        status: "completed",
        description: "Load purchase via GCash",
        referenceNumber: "GCH20240115001",
        paymentMethod: "gcash",
        createdAt: new Date("2024-01-15T00:00:00Z")
      },
      {
        id: "txn-2",
        customerId: "customer-2",
        type: "bill_payment",
        amount: "1899.00",
        status: "completed",
        description: "Monthly postpaid bill payment",
        referenceNumber: "BP20240101001",
        paymentMethod: "credit_card",
        createdAt: new Date("2024-01-01T00:00:00Z")
      }
    ];

    sampleTransactions.forEach(transaction => this.transactions.set(transaction.id, transaction));

    // Sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: "notif-1",
        customerId: "customer-1",
        type: "usage_alert",
        title: "Data Usage Alert",
        message: "You've used 80% of your data allowance. Buy load to continue browsing.",
        isRead: false,
        priority: "normal",
        createdAt: new Date()
      },
      {
        id: "notif-2",
        customerId: "customer-2",
        type: "payment_due",
        title: "Bill Payment Reminder",
        message: "Your monthly bill of PHP 1,899 is due tomorrow. Pay now to avoid service interruption.",
        isRead: false,
        priority: "high",
        createdAt: new Date()
      }
    ];

    sampleNotifications.forEach(notification => this.notifications.set(notification.id, notification));
  }

  // Customer methods
  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByMsisdn(msisdn: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      (customer) => customer.msisdn === msisdn,
    );
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = randomUUID();
    const customer: Customer = { 
      ...insertCustomer,
      dateOfBirth: insertCustomer.dateOfBirth ?? null,
      address: insertCustomer.address ?? null,
      id,
      registrationDate: new Date(),
      createdAt: new Date()
    };
    this.customers.set(id, customer);
    return customer;
  }

  // Plan methods
  async getAllPlans(): Promise<Plan[]> {
    return Array.from(this.plans.values());
  }

  async getPlanById(id: string): Promise<Plan | undefined> {
    return this.plans.get(id);
  }

  async getActivePlans(): Promise<Plan[]> {
    return Array.from(this.plans.values()).filter(plan => plan.isActive);
  }

  async createPlan(insertPlan: InsertPlan): Promise<Plan> {
    const id = randomUUID();
    const plan: Plan = { 
      ...insertPlan, 
      id,
      createdAt: new Date()
    };
    this.plans.set(id, plan);
    return plan;
  }

  // Subscription methods
  async getCustomerSubscriptions(customerId: string): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values()).filter(
      subscription => subscription.customerId === customerId
    );
  }

  async getSubscriptionById(id: string): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }

  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = { 
      ...insertSubscription, 
      id,
      createdAt: new Date()
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  // Promo methods
  async getActivePromos(): Promise<Promo[]> {
    return Array.from(this.promos.values()).filter(promo => promo.isActive);
  }

  async getFeaturedPromos(): Promise<Promo[]> {
    return Array.from(this.promos.values()).filter(promo => promo.isActive && promo.category === "featured");
  }

  async getPromoById(id: string): Promise<Promo | undefined> {
    return this.promos.get(id);
  }

  async createPromo(insertPromo: InsertPromo): Promise<Promo> {
    const id = randomUUID();
    const promo: Promo = { 
      ...insertPromo, 
      id,
      createdAt: new Date()
    };
    this.promos.set(id, promo);
    return promo;
  }

  // Transaction methods
  async getCustomerTransactions(customerId: string): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.customerId === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id,
      createdAt: new Date()
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  // Usage methods
  async getCustomerUsage(customerId: string): Promise<Usage[]> {
    return Array.from(this.usage.values())
      .filter(usage => usage.customerId === customerId)
      .sort((a, b) => b.usageDate.getTime() - a.usageDate.getTime());
  }

  async createUsage(insertUsage: InsertUsage): Promise<Usage> {
    const id = randomUUID();
    const usage: Usage = { 
      ...insertUsage, 
      id,
      createdAt: new Date()
    };
    this.usage.set(id, usage);
    return usage;
  }

  // Notification methods
  async getCustomerNotifications(customerId: string): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.customerId === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = { 
      ...insertNotification, 
      id,
      createdAt: new Date()
    };
    this.notifications.set(id, notification);
    return notification;
  }

  // Dashboard methods
  async getDashboardStats(): Promise<DashboardStats> {
    const totalCustomers = this.customers.size;
    const activeSubscriptions = Array.from(this.subscriptions.values())
      .filter(sub => sub.status === "active").length;
    const monthlyRevenue = 125000; // This would be calculated from real transaction data
    const dataUsage = 78; // This would be calculated as percentage

    return {
      totalCustomers,
      activeSubscriptions,
      monthlyRevenue,
      dataUsage
    };
  }
}

export const storage = new MemStorage();
