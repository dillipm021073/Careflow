import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  Smartphone, 
  FileText, 
  BarChart3, 
  Gift,
  ChevronRight,
  Phone,
  Calendar,
  Download,
  ShoppingCart,
  Clock
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StarryBackground from "@/components/starry-background";

interface ServiceDetail {
  msisdn: string;
  planName: string;
  device: string;
  monthlyFee: string;
  status: string;
  devicePlanMonths?: number;
  devicePlanRemaining?: number;
}

interface PostpaidAccount {
  accountNumber: string;
  firstName: string;
  lastName: string;
  billingCycle: string;
  accountStatus: string;
  loyaltyPoints: number;
  services: ServiceDetail[];
  // Keep legacy fields for backward compatibility
  msisdn: string;
  planName: string;
  device: string;
  monthlyFee: string;
}

interface CustomerProfile {
  firstName: string;
  lastName: string;
  email: string;
  primaryPhone: string;
  alternatePhone: string;
  contactAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  billingAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
}

interface Bill {
  id: string;
  billDate: string;
  dueDate: string;
  amount: string;
  status: string;
  period: string;
}

interface Usage {
  type: string;
  used: string;
  total: string;
  percentage: number;
}

interface Payment {
  id: string;
  date: string;
  amount: string;
  method: string;
  status: string;
  refNumber: string;
  description: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: string[];
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function PostpaidAccount() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingBillingAddress, setEditingBillingAddress] = useState(false);

  // Mock postpaid account data with multiple services
  const accountData: PostpaidAccount = {
    accountNumber: "1234567890",
    firstName: "Juan",
    lastName: "Dela Cruz",
    billingCycle: "15th of every month",
    accountStatus: "Active",
    loyaltyPoints: 2450,
    // Legacy fields for backward compatibility
    msisdn: "09171234567",
    planName: "Smart Postpaid Plan 1499",
    device: "iPhone 15 Pro",
    monthlyFee: "₱1,499.00",
    // Multiple services
    services: [
      {
        msisdn: "09171234567",
        planName: "Smart Postpaid Plan 1499",
        device: "iPhone 15 Pro",
        monthlyFee: "₱1,499.00",
        status: "Active",
        devicePlanMonths: 24,
        devicePlanRemaining: 18
      },
      {
        msisdn: "09281234568",
        planName: "Smart Postpaid Plan 999",
        device: "Samsung Galaxy A54",
        monthlyFee: "₱999.00",
        status: "Active",
        devicePlanMonths: 24,
        devicePlanRemaining: 12
      },
      {
        msisdn: "09391234569",
        planName: "Smart Postpaid Plan 599",
        device: "Basic Phone",
        monthlyFee: "₱599.00",
        status: "Active"
      }
    ]
  };

  // Mock customer profile data
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>({
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@email.com",
    primaryPhone: "09171234567",
    alternatePhone: "09281234567",
    contactAddress: {
      street: "123 Rizal Street, Barangay San Antonio",
      city: "Makati City",
      province: "Metro Manila",
      postalCode: "1203"
    },
    billingAddress: {
      street: "456 Business District Avenue, Barangay Poblacion",
      city: "Makati City", 
      province: "Metro Manila",
      postalCode: "1226"
    }
  });

  // Mock bill data for last 6 months - including unpaid bills
  const billHistory: Bill[] = [
    { id: "bill-1", billDate: "Jan 15, 2025", dueDate: "Feb 5, 2025", amount: "₱1,499.00", status: "Unpaid", period: "Jan 2025" },
    { id: "bill-2", billDate: "Dec 15, 2024", dueDate: "Jan 5, 2025", amount: "₱1,499.00", status: "Paid", period: "Dec 2024" },
    { id: "bill-3", billDate: "Nov 15, 2024", dueDate: "Dec 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Nov 2024" },
    { id: "bill-4", billDate: "Oct 15, 2024", dueDate: "Nov 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Oct 2024" },
    { id: "bill-5", billDate: "Sep 15, 2024", dueDate: "Oct 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Sep 2024" },
    { id: "bill-6", billDate: "Aug 15, 2024", dueDate: "Sep 5, 2024", amount: "₱1,499.00", status: "Unpaid", period: "Aug 2024" }
  ];

  // Mock usage data
  const usageData: Usage[] = [
    { type: "Data", used: "18.5 GB", total: "25 GB", percentage: 74 },
    { type: "Voice", used: "450 min", total: "Unlimited", percentage: 45 },
    { type: "SMS", used: "120", total: "Unlimited", percentage: 12 }
  ];

  // Mock payment history - last 5 payments
  const paymentHistory: Payment[] = [
    { id: "pay-1", date: "Jan 5, 2025", amount: "₱1,499.00", method: "GCash", status: "Successful", refNumber: "REF20250105001", description: "Monthly Bill Payment - Jan 2025" },
    { id: "pay-2", date: "Dec 5, 2024", amount: "₱1,499.00", method: "Credit Card", status: "Successful", refNumber: "REF20241205001", description: "Monthly Bill Payment - Dec 2024" },
    { id: "pay-3", date: "Nov 5, 2024", amount: "₱1,499.00", method: "PayMaya", status: "Successful", refNumber: "REF20241105001", description: "Monthly Bill Payment - Nov 2024" },
    { id: "pay-4", date: "Oct 5, 2024", amount: "₱1,499.00", method: "Bank Transfer", status: "Successful", refNumber: "REF20241005001", description: "Monthly Bill Payment - Oct 2024" },
    { id: "pay-5", date: "Sep 5, 2024", amount: "₱1,499.00", method: "GCash", status: "Successful", refNumber: "REF20240905001", description: "Monthly Bill Payment - Sep 2024" }
  ];

  // Mock orders data
  const ordersData: Order[] = [
    { 
      id: "ord-1", 
      orderNumber: "ORD20250118001", 
      date: "Jan 18, 2025", 
      items: ["Smart WiFi Prepaid Home LTE"], 
      total: "₱1,995.00", 
      status: "processing",
      estimatedDelivery: "Jan 22, 2025"
    },
    { 
      id: "ord-2", 
      orderNumber: "ORD20250110002", 
      date: "Jan 10, 2025", 
      items: ["Smart Bro Pocket WiFi", "Smart Prepaid SIM"], 
      total: "₱2,499.00", 
      status: "delivered",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "Jan 12, 2025"
    },
    { 
      id: "ord-3", 
      orderNumber: "ORD20241228003", 
      date: "Dec 28, 2024", 
      items: ["iPhone 15 Pro Max 256GB - Natural Titanium"], 
      total: "₱84,990.00", 
      status: "delivered",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "Dec 30, 2024"
    }
  ];

  const accountSections = [
    { id: "account", title: "My Account", icon: User, description: "Account overview and status" },
    { id: "services", title: "My Services", icon: Smartphone, description: "Plans, devices, and MSISDN details" },
    { id: "orders", title: "My Orders", icon: ShoppingCart, description: "Track your orders and deliveries" },
    { id: "profile", title: "My Profile", icon: User, description: "Personal information and preferences" },
    { id: "bills", title: "My Bills", icon: FileText, description: "Billing history and statements" },
    { id: "usage", title: "My Usages", icon: BarChart3, description: "Data, voice, and SMS usage" },
    { id: "payments", title: "My Payments", icon: CreditCard, description: "Payment methods and history" },
    { id: "loyalty", title: "My Loyalty Points", icon: Gift, description: "Rewards and loyalty program" }
  ];

  const copyBillingToContact = () => {
    setCustomerProfile(prev => ({
      ...prev,
      billingAddress: { ...prev.contactAddress }
    }));
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "orders":
        const incompleteOrders = ordersData.filter(order => 
          order.status === "pending" || order.status === "processing" || order.status === "shipped"
        );
        const completedOrders = ordersData.filter(order => 
          order.status === "delivered" || order.status === "cancelled"
        ).slice(0, 2);

        const getStatusColor = (status: string) => {
          switch(status) {
            case "pending": return "bg-yellow-100 text-yellow-800";
            case "processing": return "bg-blue-100 text-blue-800";
            case "shipped": return "bg-purple-100 text-purple-800";
            case "delivered": return "bg-green-100 text-green-800";
            case "cancelled": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
          }
        };

        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">My Orders</h3>
            
            {/* Incomplete Orders */}
            {incompleteOrders.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-smart-bright-green">Active Orders</h4>
                {incompleteOrders.map((order) => (
                  <div key={order.id} className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-smart-bright-green">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-black">Order #{order.orderNumber}</h4>
                          <p className="text-sm text-black">Placed on {order.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-black">
                        <span className="text-gray-600">Items:</span>
                        <ul className="ml-4 mt-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="text-black">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      {order.trackingNumber && (
                        <p className="text-black">
                          <span className="text-gray-600">Tracking:</span> {order.trackingNumber}
                        </p>
                      )}
                      {order.estimatedDelivery && (
                        <p className="text-black">
                          <span className="text-gray-600">Est. Delivery:</span> {order.estimatedDelivery}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <p className="text-lg font-bold text-smart-bright-green">{order.total}</p>
                        <Button variant="outline" size="sm" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                          <Clock className="w-4 h-4 mr-2" />
                          Track Order
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">Recent Completed Orders</h4>
                {completedOrders.map((order) => (
                  <div key={order.id} className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-black">Order #{order.orderNumber}</h4>
                          <p className="text-sm text-gray-400">Placed on {order.date}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className={getStatusColor(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-black">
                        <span className="text-gray-600">Items:</span>
                        <ul className="ml-4 mt-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="text-gray-600">• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <p className="text-lg font-bold text-black">{order.total}</p>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                            <Download className="w-4 h-4 mr-2" />
                            Invoice
                          </Button>
                          <Button variant="outline" size="sm" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All Orders Button */}
            <div className="text-center">
              <Button variant="outline" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                View All Orders
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "services":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Service Details</h3>
              <div className="text-sm text-gray-400">
                Account: {accountData.accountNumber} | Billing Cycle: {accountData.billingCycle}
              </div>
            </div>
            
            {/* Services List */}
            <div className="space-y-6">
              {accountData.services.map((service, index) => (
                <div key={index} className="border border-gray-300 rounded-2xl p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-smart-bright-green">Service {index + 1}</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {service.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-300">
                      <div className="flex items-center mb-4">
                        <CreditCard className="w-6 h-6 text-smart-bright-green mr-3" />
                        <h4 className="font-semibold text-black">Plan Details</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-smart-bright-green">{service.planName}</p>
                        <p className="text-black">Monthly Fee: {service.monthlyFee}</p>
                        <p className="text-black">MSISDN: {service.msisdn}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-300">
                      <div className="flex items-center mb-4">
                        <Smartphone className="w-6 h-6 text-smart-bright-green mr-3" />
                        <h4 className="font-semibold text-black">Device</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-smart-bright-green">{service.device}</p>
                        {service.devicePlanMonths && (
                          <>
                            <p className="text-black">Device Plan: {service.devicePlanMonths} months</p>
                            <p className="text-black">Remaining: {service.devicePlanRemaining} months</p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-300">
                      <div className="flex items-center mb-4">
                        <Phone className="w-6 h-6 text-smart-bright-green mr-3" />
                        <h4 className="font-semibold text-black">Contact Number</h4>
                      </div>
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-smart-bright-green">{service.msisdn}</p>
                        <p className="text-black">Type: Postpaid</p>
                        <div className="mt-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {service.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Monthly Summary */}
            <div className="mt-6 p-4 bg-white rounded-xl border border-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-black font-semibold">Total Monthly Fee (All Services):</span>
                <span className="text-2xl font-bold text-smart-bright-green">
                  ₱{accountData.services.reduce((total, service) => 
                    total + parseFloat(service.monthlyFee.replace(/[₱,]/g, '')), 0
                  ).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">My Profile</h3>
            
            {/* Personal Information - Read Only */}
            <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
              <h4 className="font-semibold text-black mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                  <p className="text-black bg-gray-100 p-2 rounded">{customerProfile.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                  <p className="text-black bg-gray-100 p-2 rounded">{customerProfile.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                  <p className="text-black bg-gray-100 p-2 rounded">{customerProfile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Primary Phone</label>
                  <p className="text-black bg-gray-100 p-2 rounded">{customerProfile.primaryPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Alternate Phone</label>
                  <p className="text-black bg-gray-100 p-2 rounded">{customerProfile.alternatePhone}</p>
                </div>
              </div>
            </div>

            {/* Contact Address - Read Only */}
            <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
              <h4 className="font-semibold text-black mb-4">Contact Address</h4>
              <div className="space-y-3">
                <p className="text-black">{customerProfile.contactAddress.street}</p>
                <p className="text-black">{customerProfile.contactAddress.city}, {customerProfile.contactAddress.province}</p>
                <p className="text-black">{customerProfile.contactAddress.postalCode}</p>
              </div>
            </div>

            {/* Billing Address - Editable */}
            <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-black">Billing Address</h4>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyBillingToContact}
                    data-testid="copy-contact-address"
                    className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                  >
                    Same as Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingBillingAddress(!editingBillingAddress)}
                    data-testid="edit-billing-address"
                    className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                  >
                    {editingBillingAddress ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </div>
              
              {editingBillingAddress ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={customerProfile.billingAddress.street}
                      onChange={(e) => setCustomerProfile(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, street: e.target.value }
                      }))}
                      data-testid="input-billing-street"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={customerProfile.billingAddress.city}
                        onChange={(e) => setCustomerProfile(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, city: e.target.value }
                        }))}
                        data-testid="input-billing-city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Province</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={customerProfile.billingAddress.province}
                        onChange={(e) => setCustomerProfile(prev => ({
                          ...prev,
                          billingAddress: { ...prev.billingAddress, province: e.target.value }
                        }))}
                        data-testid="input-billing-province"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={customerProfile.billingAddress.postalCode}
                      onChange={(e) => setCustomerProfile(prev => ({
                        ...prev,
                        billingAddress: { ...prev.billingAddress, postalCode: e.target.value }
                      }))}
                      data-testid="input-billing-postal"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setEditingBillingAddress(false)}
                      className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-smart-teal hover:bg-smart-teal/90 text-white"
                      onClick={() => setEditingBillingAddress(false)}
                      data-testid="save-billing-address"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-black">{customerProfile.billingAddress.street}</p>
                  <p className="text-black">{customerProfile.billingAddress.city}, {customerProfile.billingAddress.province}</p>
                  <p className="text-black">{customerProfile.billingAddress.postalCode}</p>
                </div>
              )}
            </div>
          </div>
        );

      case "bills":
        const handlePayNow = (bill: Bill) => {
          // In production, this would redirect to payment gateway with bill details
          alert(`Go to pay now site\n\nBill Details:\n- Period: ${bill.period}\n- Amount: ${bill.amount}\n- Due Date: ${bill.dueDate}\n- Bill ID: ${bill.id}`);
        };

        // Calculate max amount for scaling
        const maxBillAmount = Math.max(...billHistory.map(bill => 
          parseFloat(bill.amount.replace(/[₱,]/g, ''))
        ));

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Billing History (Last 6 Months)</h3>
              <Button variant="outline" size="sm" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            
            {/* Bill Histogram */}
            <div className="p-6 bg-white rounded-xl border border-gray-300">
              <div className="space-y-4">
                {/* Y-axis labels and bars */}
                <div className="relative">
                  <div className="flex items-end justify-between space-x-2" style={{ minHeight: '250px' }}>
                    {billHistory.slice().reverse().map((bill, index) => {
                      const amount = parseFloat(bill.amount.replace(/[₱,]/g, ''));
                      const height = Math.max((amount / maxBillAmount) * 90, 20);
                      const isUnpaid = bill.status === "Unpaid";
                      
                      return (
                        <div key={bill.id} className="flex-1 flex flex-col items-center">
                          {/* Bar */}
                          <div className="relative w-full flex flex-col items-center justify-end flex-grow">
                            <div 
                              className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer relative ${
                                isUnpaid ? 'bg-red-500' : 'bg-smart-bright-green'
                              }`}
                              style={{ height: `${height}%`, minHeight: '40px' }}
                              onClick={() => isUnpaid && handlePayNow(bill)}
                            >
                              {/* Amount label on top of bar */}
                              <div className="absolute -top-6 left-0 right-0 text-center">
                                <span className="text-xs text-black font-semibold">
                                  {bill.amount}
                                </span>
                              </div>
                              {/* Status indicator */}
                              {isUnpaid && (
                                <div className="absolute top-2 left-0 right-0 text-center">
                                  <Badge variant="secondary" className="bg-white text-red-500 text-xs">
                                    Unpaid
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Month label */}
                          <div className="mt-2 text-center">
                            <p className="text-xs text-black">{bill.period.split(' ')[0]}</p>
                            <p className="text-xs text-black">{bill.period.split(' ')[1]}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-smart-bright-green rounded"></div>
                    <span className="text-xs text-black">Paid</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-xs text-black">Unpaid (Click to pay)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm text-gray-600 mb-2">Total Paid</h4>
                <p className="text-2xl font-bold text-smart-bright-green">
                  ₱{billHistory.filter(b => b.status === "Paid").reduce((sum, bill) => 
                    sum + parseFloat(bill.amount.replace(/[₱,]/g, '')), 0
                  ).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {billHistory.filter(b => b.status === "Paid").length} bills
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-red-500">
                <h4 className="text-sm text-gray-600 mb-2">Outstanding</h4>
                <p className="text-2xl font-bold text-red-500">
                  ₱{billHistory.filter(b => b.status === "Unpaid").reduce((sum, bill) => 
                    sum + parseFloat(bill.amount.replace(/[₱,]/g, '')), 0
                  ).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {billHistory.filter(b => b.status === "Unpaid").length} bills pending
                </p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-sm text-gray-600 mb-2">Average Bill</h4>
                <p className="text-2xl font-bold text-black">
                  ₱{(billHistory.reduce((sum, bill) => 
                    sum + parseFloat(bill.amount.replace(/[₱,]/g, '')), 0
                  ) / billHistory.length).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-600 mt-1">Per month</p>
              </div>
            </div>
          </div>
        );

      case "usage":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Current Usage Analytics</h3>
            
            {/* Combined Usage Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radial Progress Charts */}
              <div className="p-6 bg-white rounded-xl border border-gray-300">
                <h4 className="text-sm font-semibold text-black mb-4">Usage Overview</h4>
                <div className="grid grid-cols-3 gap-4">
                  {usageData.map((usage) => {
                    const radius = 45;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDashoffset = circumference - (usage.percentage / 100) * circumference;
                    
                    return (
                      <div key={usage.type} className="flex flex-col items-center">
                        <div className="relative">
                          <svg className="w-24 h-24 transform -rotate-90">
                            {/* Background circle */}
                            <circle
                              cx="48"
                              cy="48"
                              r={radius}
                              stroke="rgb(55, 65, 81)"
                              strokeWidth="8"
                              fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                              cx="48"
                              cy="48"
                              r={radius}
                              stroke={usage.percentage > 80 ? 'rgb(239, 68, 68)' : usage.percentage > 60 ? 'rgb(251, 191, 36)' : 'rgb(0, 255, 102)'}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center transform rotate-0">
                            <span className="text-lg font-bold text-black">{usage.percentage}%</span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-black mt-2">{usage.type}</p>
                        <p className="text-xs text-black">{usage.used}</p>
                        <p className="text-xs text-black">of {usage.total}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Horizontal Bar Chart */}
              <div className="p-6 bg-white rounded-xl border border-gray-300">
                <h4 className="text-sm font-semibold text-black mb-4">Detailed Breakdown</h4>
                <div className="space-y-4">
                  {usageData.map((usage) => (
                    <div key={usage.type}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{usage.type}</span>
                        <span className="text-xs text-black">{usage.used} / {usage.total}</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-700 rounded-full h-6">
                          <div 
                            className={`h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-500 ${
                              usage.percentage > 80 ? 'bg-red-500' : 
                              usage.percentage > 60 ? 'bg-yellow-500' : 
                              'bg-smart-bright-green'
                            }`}
                            style={{ width: `${usage.percentage}%` }}
                          >
                            <span className="text-xs text-black font-semibold">{usage.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Usage Trend Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Daily Average</span>
                    <span className="text-black">0.62 GB / 15 min / 4 SMS</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Usage Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-xs text-gray-600 mb-2">Days Remaining</h4>
                <p className="text-2xl font-bold text-black">12</p>
                <p className="text-xs text-gray-600">Until reset</p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-xs text-gray-600 mb-2">Peak Usage</h4>
                <p className="text-2xl font-bold text-smart-bright-green">7-9 PM</p>
                <p className="text-xs text-gray-600">Daily pattern</p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-xs text-gray-600 mb-2">Most Used</h4>
                <p className="text-2xl font-bold text-black">Data</p>
                <p className="text-xs text-gray-600">74% consumed</p>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <h4 className="text-xs text-gray-600 mb-2">Projected</h4>
                <p className="text-2xl font-bold text-yellow-600">92%</p>
                <p className="text-xs text-gray-600">By month end</p>
              </div>
            </div>
            
            {/* Usage History Mini Chart */}
            <div className="p-4 bg-white rounded-xl border border-gray-300">
              <h4 className="text-sm font-semibold text-black mb-3">7-Day Usage Trend</h4>
              <div className="flex items-end justify-between space-x-1" style={{ height: '80px' }}>
                {[65, 72, 68, 74, 70, 73, 74].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-smart-bright-green rounded-t opacity-70 hover:opacity-100 transition-opacity"
                      style={{ height: `${value}%` }}
                    ></div>
                    <span className="text-xs text-black mt-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "payments":
        // Get payment method colors
        const getPaymentMethodColor = (method: string) => {
          switch(method) {
            case 'GCash': return 'bg-blue-500';
            case 'Credit Card': return 'bg-purple-500';
            case 'PayMaya': return 'bg-green-500';
            case 'Bank Transfer': return 'bg-orange-500';
            default: return 'bg-gray-500';
          }
        };

        // Calculate outstanding amounts for pie chart
        const outstandingBills = billHistory.filter(b => b.status === "Unpaid");
        const totalOutstanding = outstandingBills.reduce((sum, bill) => 
          sum + parseFloat(bill.amount.replace(/[₱,]/g, '')), 0
        );

        // Calculate angles for pie chart
        let startAngle = 0;
        const pieData = outstandingBills.map((bill, index) => {
          const amount = parseFloat(bill.amount.replace(/[₱,]/g, ''));
          const percentage = (amount / totalOutstanding) * 100;
          const angle = (percentage / 100) * 360;
          const data = {
            bill,
            percentage,
            startAngle,
            endAngle: startAngle + angle,
            color: index === 0 ? 'rgb(239, 68, 68)' : index === 1 ? 'rgb(251, 191, 36)' : 'rgb(249, 115, 22)'
          };
          startAngle += angle;
          return data;
        });

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Payment Analytics</h3>
              <Button variant="outline" size="sm" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
            
            {/* Payment Timeline */}
            <div className="p-6 bg-white rounded-xl border border-gray-300">
              <h4 className="text-sm font-semibold text-black mb-4">Payment Timeline</h4>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
                
                {/* Timeline items */}
                <div className="space-y-6">
                  {paymentHistory.map((payment, index) => {
                    const amount = parseFloat(payment.amount.replace(/[₱,]/g, ''));
                    const maxAmount = Math.max(...paymentHistory.map(p => 
                      parseFloat(p.amount.replace(/[₱,]/g, ''))
                    ));
                    const barWidth = (amount / maxAmount) * 100;
                    
                    return (
                      <div key={payment.id} className="relative flex items-center">
                        {/* Timeline dot */}
                        <div className="absolute left-6 w-4 h-4 bg-smart-bright-green rounded-full border-2 border-white z-10"></div>
                        
                        {/* Content */}
                        <div className="ml-16 flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-xs text-gray-600">{payment.date}</p>
                              <p className="text-sm text-black font-medium">{payment.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-black">{payment.amount}</p>
                              <p className="text-xs text-gray-600">{payment.method}</p>
                            </div>
                          </div>
                          
                          {/* Payment amount bar */}
                          <div className="w-full bg-gray-700 rounded-full h-4">
                            <div 
                              className={`h-4 rounded-full flex items-center justify-end pr-2 transition-all duration-500 ${getPaymentMethodColor(payment.method)}`}
                              style={{ width: `${barWidth}%` }}
                            >
                              <span className="text-xs text-white font-semibold">{payment.refNumber}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Payment Method Legend */}
              <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span className="text-xs text-black">GCash</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span className="text-xs text-black">Credit Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs text-black">PayMaya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-xs text-black">Bank Transfer</span>
                </div>
              </div>
            </div>
            
            {/* Outstanding Balance Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="p-6 bg-white rounded-xl border border-gray-300">
                <h4 className="text-sm font-semibold text-black mb-4">Outstanding Balance Breakdown</h4>
                {outstandingBills.length > 0 ? (
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg className="w-48 h-48">
                        {pieData.map((segment, index) => {
                          const { startAngle, endAngle, color } = segment;
                          const startAngleRad = (startAngle * Math.PI) / 180;
                          const endAngleRad = (endAngle * Math.PI) / 180;
                          const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
                          
                          const x1 = 96 + 80 * Math.cos(startAngleRad - Math.PI / 2);
                          const y1 = 96 + 80 * Math.sin(startAngleRad - Math.PI / 2);
                          const x2 = 96 + 80 * Math.cos(endAngleRad - Math.PI / 2);
                          const y2 = 96 + 80 * Math.sin(endAngleRad - Math.PI / 2);
                          
                          return (
                            <path
                              key={index}
                              d={`M 96 96 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                              fill={color}
                              stroke="white"
                              strokeWidth="2"
                              className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                          );
                        })}
                        {/* Center total */}
                        <circle cx="96" cy="96" r="40" fill="white" />
                        <text x="96" y="90" textAnchor="middle" className="fill-black text-xs font-bold">
                          Total
                        </text>
                        <text x="96" y="106" textAnchor="middle" className="fill-red-400 text-sm font-bold">
                          ₱{totalOutstanding.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </text>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-green-400 font-semibold">All bills paid!</p>
                    <p className="text-gray-400 text-sm mt-2">No outstanding balance</p>
                  </div>
                )}
                
                {/* Outstanding Bills List */}
                {outstandingBills.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {pieData.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded" style={{ backgroundColor: segment.color }}></div>
                          <span className="text-xs text-gray-600">{segment.bill.period}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-black font-medium">{segment.bill.amount}</span>
                          <span className="text-xs text-black ml-2">({segment.percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Payment Statistics */}
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-gray-300">
                  <h4 className="text-xs text-gray-600 mb-2">Total Paid (Last 5)</h4>
                  <p className="text-2xl font-bold text-smart-bright-green">
                    ₱{paymentHistory.reduce((sum, payment) => 
                      sum + parseFloat(payment.amount.replace(/[₱,]/g, '')), 0
                    ).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-black">5 successful payments</p>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-gray-300">
                  <h4 className="text-xs text-gray-600 mb-2">Preferred Method</h4>
                  <p className="text-2xl font-bold text-black">GCash</p>
                  <p className="text-xs text-black">2 of 5 payments</p>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-gray-300">
                  <h4 className="text-xs text-gray-600 mb-2">Average Payment</h4>
                  <p className="text-2xl font-bold text-black">
                    ₱{(paymentHistory.reduce((sum, payment) => 
                      sum + parseFloat(payment.amount.replace(/[₱,]/g, '')), 0
                    ) / paymentHistory.length).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-black">Per transaction</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button variant="outline" className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300">
                View All Payment History
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case "loyalty":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Smart Rewards</h3>
            <div className="p-6 bg-green-900 bg-opacity-90 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-green-600">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-smart-teal to-smart-bright-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">{accountData.loyaltyPoints.toLocaleString()}</h4>
                <p className="text-green-100">Available Points</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-300">
                  <p className="text-lg font-bold text-smart-bright-green">Gold</p>
                  <p className="text-sm text-black">Current Status</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-300">
                  <p className="text-lg font-bold text-smart-bright-green">₱245.00</p>
                  <p className="text-sm text-black">Rewards Value</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Account Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
                <h4 className="font-semibold text-black mb-4">Account Information</h4>
                <div className="space-y-2">
                  <p className="text-black"><span className="font-medium text-gray-600">Name:</span> {accountData.firstName} {accountData.lastName}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Mobile:</span> {accountData.msisdn}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Account:</span> {accountData.accountNumber}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Status:</span> <Badge variant="secondary" className="bg-green-100 text-green-800">{accountData.accountStatus}</Badge></p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200">
                <h4 className="font-semibold text-black mb-4">Current Plan</h4>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-smart-bright-green">{accountData.planName}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Monthly Fee:</span> {accountData.monthlyFee}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Device:</span> {accountData.device}</p>
                  <p className="text-black"><span className="font-medium text-gray-600">Next Bill:</span> Jan 15, 2025</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen night-sky">
      <StarryBackground />
      <div className="relative z-10">
        <Header />
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <p className="text-green-100">Manage your postpaid services and account</p>
        </div>

        {/* Account Services Cards - Horizontal Layout */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {accountSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`aspect-square p-4 rounded-xl transition-all duration-300 ${
                    selectedSection === section.id 
                      ? 'bg-smart-teal text-black border-2 border-black shadow-xl scale-105' 
                      : 'bg-white text-black border border-gray-300 hover:shadow-2xl hover:-translate-y-1 hover:border-smart-bright-green'
                  }`}
                  data-testid={`nav-${section.id}`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <IconComponent className={`w-8 h-8 mb-2 ${
                      selectedSection === section.id ? 'text-red-500' : 'text-smart-bright-green'
                    }`} />
                    <h3 className={`font-bold text-xs text-center text-black`}>{section.title}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {selectedSection && (
          <div className="bg-black bg-opacity-50 rounded-2xl p-8 backdrop-blur-sm">
            {renderSectionContent()}
          </div>
        )}
        
        {/* Default Content when no section is selected - 360 Degree Dashboard View */}
        {!selectedSection && (
          <div className="bg-black bg-opacity-30 rounded-2xl p-6 backdrop-blur-sm">
            {/* 360 Degree Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Account Info Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <User className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Account Info</h4>
                </div>
                <p className="text-black font-bold">{accountData.firstName} {accountData.lastName}</p>
                <p className="text-gray-600 text-sm">Account: {accountData.accountNumber}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2 text-xs">
                  {accountData.accountStatus}
                </Badge>
              </div>

              {/* Services Summary Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <Smartphone className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Active Services</h4>
                </div>
                <p className="text-2xl font-bold text-smart-bright-green">{accountData.services.length}</p>
                <p className="text-gray-600 text-xs">Total Monthly</p>
                <p className="text-black font-semibold">₱{accountData.services.reduce((total, service) => 
                  total + parseFloat(service.monthlyFee.replace(/[₱,]/g, '')), 0
                ).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>

              {/* Current Bill Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Current Bill</h4>
                </div>
                <p className="text-2xl font-bold text-black">₱{accountData.services.reduce((total, service) => 
                  total + parseFloat(service.monthlyFee.replace(/[₱,]/g, '')), 0
                ).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-gray-600 text-xs">Due: Feb 5, 2025</p>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 mt-2 text-xs">
                  Pending
                </Badge>
              </div>

              {/* Data Usage Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <BarChart3 className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Data Usage</h4>
                </div>
                <p className="text-2xl font-bold text-black">18.5 GB</p>
                <p className="text-gray-600 text-xs">of 25 GB</p>
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div className="bg-smart-bright-green h-1.5 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>

              {/* Loyalty Points Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Loyalty Points</h4>
                </div>
                <p className="text-2xl font-bold text-smart-bright-green">{accountData.loyaltyPoints.toLocaleString()}</p>
                <p className="text-gray-600 text-xs">Points Available</p>
                <p className="text-black text-sm mt-1">≈ ₱245.00</p>
              </div>

              {/* Recent Payments Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <CreditCard className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Last Payment</h4>
                </div>
                <p className="text-2xl font-bold text-black">₱1,499.00</p>
                <p className="text-gray-600 text-xs">Jan 5, 2025</p>
                <Badge variant="secondary" className="bg-green-100 text-green-800 mt-2 text-xs">
                  Successful
                </Badge>
              </div>

              {/* Primary Service Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <Phone className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Primary Line</h4>
                </div>
                <p className="text-black font-bold">{accountData.services[0].msisdn}</p>
                <p className="text-gray-600 text-xs">{accountData.services[0].planName}</p>
                <p className="text-smart-bright-green text-sm mt-1">{accountData.services[0].device}</p>
              </div>

              {/* Billing Cycle Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-300 hover:border-smart-bright-green transition-all">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-smart-bright-green mr-2" />
                  <h4 className="font-semibold text-black text-sm">Billing Cycle</h4>
                </div>
                <p className="text-black font-bold">Monthly</p>
                <p className="text-gray-600 text-xs">Next bill date</p>
                <p className="text-smart-bright-green text-sm mt-1">Feb 15, 2025</p>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="mt-6 p-4 bg-green-900 bg-opacity-20 rounded-xl border border-green-600">
              <h4 className="font-semibold text-white mb-3 text-sm">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button 
                  onClick={() => setSelectedSection('bills')}
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                >
                  Pay Bill
                </Button>
                <Button 
                  onClick={() => setSelectedSection('services')}
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                >
                  View Services
                </Button>
                <Button 
                  onClick={() => setSelectedSection('usage')}
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                >
                  Check Usage
                </Button>
                <Button 
                  onClick={() => setSelectedSection('loyalty')}
                  variant="outline" 
                  size="sm"
                  className="bg-black text-white border-gray-600 hover:bg-smart-teal hover:text-black hover:border-smart-teal transition-all duration-300"
                >
                  Redeem Points
                </Button>
              </div>
            </div>

            {/* Services Overview Table */}
            <div className="mt-6">
              <h4 className="font-semibold text-white mb-3 text-sm">Services Overview</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-xs text-gray-400 pb-2">Service</th>
                      <th className="text-left text-xs text-gray-400 pb-2">Number</th>
                      <th className="text-left text-xs text-gray-400 pb-2">Plan</th>
                      <th className="text-left text-xs text-gray-400 pb-2">Monthly</th>
                      <th className="text-left text-xs text-gray-400 pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountData.services.map((service, index) => (
                      <tr key={index} className="border-b border-gray-800">
                        <td className="py-2 text-white text-sm">Service {index + 1}</td>
                        <td className="py-2 text-white text-sm">{service.msisdn}</td>
                        <td className="py-2 text-gray-400 text-sm">{service.planName}</td>
                        <td className="py-2 text-white text-sm">{service.monthlyFee}</td>
                        <td className="py-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            {service.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}