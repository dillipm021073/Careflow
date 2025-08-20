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
  Download
} from "lucide-react";
import Header from "@/components/header";

interface PostpaidAccount {
  accountNumber: string;
  msisdn: string;
  firstName: string;
  lastName: string;
  planName: string;
  device: string;
  monthlyFee: string;
  billingCycle: string;
  accountStatus: string;
  loyaltyPoints: number;
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

export default function PostpaidAccount() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingBillingAddress, setEditingBillingAddress] = useState(false);

  // Mock postpaid account data
  const accountData: PostpaidAccount = {
    accountNumber: "1234567890",
    msisdn: "09171234567",
    firstName: "Juan",
    lastName: "Dela Cruz",
    planName: "Smart Postpaid Plan 1499",
    device: "iPhone 15 Pro",
    monthlyFee: "₱1,499.00",
    billingCycle: "15th of every month",
    accountStatus: "Active",
    loyaltyPoints: 2450
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

  // Mock bill data for last 6 months
  const billHistory: Bill[] = [
    { id: "bill-1", billDate: "Dec 15, 2024", dueDate: "Jan 5, 2025", amount: "₱1,499.00", status: "Paid", period: "Dec 2024" },
    { id: "bill-2", billDate: "Nov 15, 2024", dueDate: "Dec 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Nov 2024" },
    { id: "bill-3", billDate: "Oct 15, 2024", dueDate: "Nov 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Oct 2024" },
    { id: "bill-4", billDate: "Sep 15, 2024", dueDate: "Oct 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Sep 2024" },
    { id: "bill-5", billDate: "Aug 15, 2024", dueDate: "Sep 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Aug 2024" },
    { id: "bill-6", billDate: "Jul 15, 2024", dueDate: "Aug 5, 2024", amount: "₱1,499.00", status: "Paid", period: "Jul 2024" }
  ];

  // Mock usage data
  const usageData: Usage[] = [
    { type: "Data", used: "18.5 GB", total: "25 GB", percentage: 74 },
    { type: "Voice", used: "450 min", total: "Unlimited", percentage: 45 },
    { type: "SMS", used: "120", total: "Unlimited", percentage: 12 }
  ];

  const accountSections = [
    { id: "account", title: "My Account", icon: User, description: "Account overview and status" },
    { id: "services", title: "My Services", icon: Smartphone, description: "Plans, devices, and MSISDN details" },
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
      case "services":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-6 h-6 text-smart-teal mr-3" />
                  <h4 className="font-semibold text-gray-900">Current Plan</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-smart-teal">{accountData.planName}</p>
                  <p className="text-gray-600">Monthly Fee: {accountData.monthlyFee}</p>
                  <p className="text-gray-600">Billing Cycle: {accountData.billingCycle}</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Smartphone className="w-6 h-6 text-smart-bright-green mr-3" />
                  <h4 className="font-semibold text-gray-900">Device</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-smart-bright-green">{accountData.device}</p>
                  <p className="text-gray-600">Device Plan: 24 months</p>
                  <p className="text-gray-600">Remaining: 18 months</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-smart-orange mr-3" />
                  <h4 className="font-semibold text-gray-900">MSISDN</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-smart-orange">{accountData.msisdn}</p>
                  <p className="text-gray-600">Account: {accountData.accountNumber}</p>
                  <div className="mt-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {accountData.accountStatus}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">My Profile</h3>
            
            {/* Personal Information - Read Only */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{customerProfile.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{customerProfile.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{customerProfile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{customerProfile.primaryPhone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded">{customerProfile.alternatePhone}</p>
                </div>
              </div>
            </Card>

            {/* Contact Address - Read Only */}
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Contact Address</h4>
              <div className="space-y-3">
                <p className="text-gray-900">{customerProfile.contactAddress.street}</p>
                <p className="text-gray-900">{customerProfile.contactAddress.city}, {customerProfile.contactAddress.province}</p>
                <p className="text-gray-900">{customerProfile.contactAddress.postalCode}</p>
              </div>
            </Card>

            {/* Billing Address - Editable */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">Billing Address</h4>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyBillingToContact}
                    data-testid="copy-contact-address"
                    className="bg-white text-black border-gray-300 hover:bg-gray-50"
                  >
                    Same as Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingBillingAddress(!editingBillingAddress)}
                    data-testid="edit-billing-address"
                    className="bg-white text-black border-gray-300 hover:bg-gray-50"
                  >
                    {editingBillingAddress ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </div>
              
              {editingBillingAddress ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
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
                      className="bg-white text-black border-gray-300 hover:bg-gray-50"
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
                  <p className="text-gray-900">{customerProfile.billingAddress.street}</p>
                  <p className="text-gray-900">{customerProfile.billingAddress.city}, {customerProfile.billingAddress.province}</p>
                  <p className="text-gray-900">{customerProfile.billingAddress.postalCode}</p>
                </div>
              )}
            </Card>
          </div>
        );

      case "bills":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Billing History (Last 6 Months)</h3>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
            <div className="space-y-4">
              {billHistory.map((bill) => (
                <Card key={bill.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-smart-teal bg-opacity-10 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-smart-teal" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{bill.period}</h4>
                        <p className="text-sm text-gray-600">Bill Date: {bill.billDate}</p>
                        <p className="text-sm text-gray-600">Due Date: {bill.dueDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{bill.amount}</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {bill.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "usage":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Usage</h3>
            <div className="space-y-4">
              {usageData.map((usage) => (
                <Card key={usage.type} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{usage.type}</h4>
                    <span className="text-sm text-gray-600">{usage.used} of {usage.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-smart-bright-green h-2 rounded-full" 
                      style={{ width: `${usage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right mt-2">
                    <span className="text-sm font-medium text-gray-700">{usage.percentage}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case "loyalty":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Rewards</h3>
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-smart-teal to-smart-bright-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900">{accountData.loyaltyPoints.toLocaleString()}</h4>
                <p className="text-gray-600">Available Points</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-smart-teal">Gold</p>
                  <p className="text-sm text-gray-600">Current Status</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-smart-bright-green">₱245.00</p>
                  <p className="text-sm text-gray-600">Rewards Value</p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {accountData.firstName} {accountData.lastName}</p>
                  <p><span className="font-medium">Mobile:</span> {accountData.msisdn}</p>
                  <p><span className="font-medium">Account:</span> {accountData.accountNumber}</p>
                  <p><span className="font-medium">Status:</span> <Badge variant="secondary" className="bg-green-100 text-green-800">{accountData.accountStatus}</Badge></p>
                </div>
              </Card>
              <Card className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Current Plan</h4>
                <div className="space-y-2">
                  <p className="text-lg font-bold text-smart-teal">{accountData.planName}</p>
                  <p><span className="font-medium">Monthly Fee:</span> {accountData.monthlyFee}</p>
                  <p><span className="font-medium">Device:</span> {accountData.device}</p>
                  <p><span className="font-medium">Next Bill:</span> Jan 15, 2025</p>
                </div>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(135deg, hsl(178 70% 25%) 0%, hsl(178 60% 35%) 30%, hsl(120 100% 35%) 70%, hsl(120 100% 45%) 100%)`
      }}
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
          <p className="text-green-200">Manage your postpaid services and account</p>
        </div>

        {/* Account Services Cards - Horizontal Layout */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {accountSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    selectedSection === section.id 
                      ? 'bg-smart-teal text-white shadow-xl scale-105' 
                      : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
                  }`}
                  data-testid={`nav-${section.id}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                      selectedSection === section.id 
                        ? 'bg-white bg-opacity-20' 
                        : 'bg-smart-teal bg-opacity-10'
                    }`}>
                      <IconComponent className={`w-6 h-6 ${
                        selectedSection === section.id ? 'text-white' : 'text-smart-teal'
                      }`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
                    <p className={`text-xs opacity-80 ${
                      selectedSection === section.id ? 'text-white' : 'text-gray-600'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        {selectedSection && (
          <Card className="bg-white rounded-2xl p-8 border-0">
            {renderSectionContent()}
          </Card>
        )}
        
        {/* Default Content when no section is selected */}
        {!selectedSection && (
          <Card className="bg-white rounded-2xl p-8 border-0">
            <div className="text-center py-12">
              <User className="w-16 h-16 mx-auto text-smart-teal mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to My Account</h3>
              <p className="text-gray-600 mb-6">Select a service above to view and manage your account details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{accountData.firstName} {accountData.lastName}</h4>
                  <p className="text-gray-600">{accountData.msisdn}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{accountData.planName}</h4>
                  <p className="text-gray-600">{accountData.monthlyFee}/month</p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}