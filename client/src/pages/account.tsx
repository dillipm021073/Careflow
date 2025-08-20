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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {accountData.accountStatus}
                  </Badge>
                </div>
              </Card>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-2xl p-6 border-0">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Account Services</h2>
              <div className="space-y-2">
                {accountSections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                        selectedSection === section.id 
                          ? 'bg-smart-teal text-white' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      data-testid={`nav-${section.id}`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-5 h-5 mr-3" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white rounded-2xl p-8 border-0">
              {renderSectionContent()}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}