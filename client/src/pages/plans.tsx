import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Database,
  Phone,
  MessageSquare,
  Calendar,
  Download,
  Eye,
  Bell,
  Settings,
  TrendingUp,
  DollarSign
} from "lucide-react";
import Header from "@/components/header";

interface AccountSummary {
  currentBalance: string;
  dueAmount: string;
  dueDate: string;
  planName: string;
  dataUsed: number;
  dataLimit: number;
  voiceUsed: number;
  smsUsed: number;
  billCycle: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: string;
  description: string;
  date: Date;
  status: string;
}

export default function PostpaidAccountPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "usage" | "bills" | "services">("overview");

  const { data: customer } = useQuery({
    queryKey: ['/api/customers/customer-2'], // Using postpaid customer
  });

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ['/api/customers/customer-2/transactions'],
  });

  // Mock postpaid account data
  const accountSummary: AccountSummary = {
    currentBalance: "0.00",
    dueAmount: "1,899.00",
    dueDate: "February 15, 2024",
    planName: "Smart Postpaid 1899",
    dataUsed: 18.5,
    dataLimit: 25,
    voiceUsed: 245,
    smsUsed: 156,
    billCycle: "16th of each month"
  };

  const dataUsagePercentage = (accountSummary.dataUsed / accountSummary.dataLimit) * 100;

  const quickActions = [
    { icon: DollarSign, title: "Pay Bill", desc: "Pay your monthly bill", color: "smart-orange" },
    { icon: Download, title: "Download Bill", desc: "Get your latest bill", color: "smart-teal" },
    { icon: TrendingUp, title: "Usage Details", desc: "View detailed usage", color: "smart-bright-green" },
    { icon: Settings, title: "Manage Services", desc: "Add or remove services", color: "purple-600" }
  ];

  return (
    <div 
      className="min-h-screen text-white bg-smart-dark-teal"
      style={{
        background: `linear-gradient(135deg, hsl(178 80% 20%) 0%, hsl(178 73% 40%) 50%, hsl(178 80% 20%) 100%)`
      }}
    >
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-smart-teal bg-opacity-10 rounded-xl flex items-center justify-center">
                <CreditCard className="text-smart-teal h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Account</h1>
                <p className="text-green-200">Postpaid account summary and management</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-smart-bright-green text-white">
              Postpaid
            </Badge>
          </div>
        </section>

        {/* Account Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="current-balance">
                  ₱{accountSummary.currentBalance}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
                <DollarSign className="text-smart-bright-green h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Amount Due</p>
                <p className="text-2xl font-bold text-smart-red" data-testid="amount-due">
                  ₱{accountSummary.dueAmount}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-red bg-opacity-10 rounded-xl flex items-center justify-center">
                <Bell className="text-smart-red h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Due Date</p>
                <p className="text-lg font-bold text-gray-900" data-testid="due-date">
                  {accountSummary.dueDate}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-orange bg-opacity-10 rounded-xl flex items-center justify-center">
                <Calendar className="text-smart-orange h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Plan</p>
                <p className="text-lg font-bold text-gray-900" data-testid="current-plan">
                  {accountSummary.planName}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-teal bg-opacity-10 rounded-xl flex items-center justify-center">
                <CreditCard className="text-smart-teal h-6 w-6" />
              </div>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  className={`h-24 bg-${action.color} hover:bg-opacity-80 text-white flex flex-col items-center justify-center`}
                  data-testid={`quick-action-${index}`}
                >
                  <IconComponent className="h-6 w-6 mb-2" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs opacity-90">{action.desc}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </section>

        {/* Usage Overview */}
        <section className="mb-8">
          <Card className="card-gradient rounded-2xl p-6 border-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage Overview</h2>
            
            {/* Data Usage */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Database className="text-smart-teal h-5 w-5" />
                  <span className="text-gray-700 font-medium">Data Usage</span>
                </div>
                <span className="text-sm text-gray-600">
                  {accountSummary.dataUsed}GB of {accountSummary.dataLimit}GB
                </span>
              </div>
              <Progress value={dataUsagePercentage} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">
                {(accountSummary.dataLimit - accountSummary.dataUsed).toFixed(1)}GB remaining
              </p>
            </div>

            {/* Voice and SMS Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
                  <Phone className="text-smart-bright-green h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Voice Calls</p>
                  <p className="text-2xl font-bold text-gray-900">{accountSummary.voiceUsed} mins</p>
                  <p className="text-xs text-gray-500">This billing cycle</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-600 bg-opacity-10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-purple-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Text Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{accountSummary.smsUsed}</p>
                  <p className="text-xs text-gray-500">This billing cycle</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recent Transactions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-semibold">Recent Transactions</h2>
            <Button 
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-smart-dark-teal"
              data-testid="button-view-all-transactions"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {transactions?.slice(0, 3).map((transaction) => (
              <Card key={transaction.id} className="card-gradient rounded-2xl p-6 border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-smart-teal bg-opacity-10 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-smart-teal h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold" data-testid={`transaction-desc-${transaction.id}`}>
                        {transaction.description}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-smart-teal">₱{transaction.amount}</p>
                    <Badge variant="secondary" className="bg-smart-bright-green text-white">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Bill Cycle Information */}
        <div className="mt-8">
          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing Information</h3>
              <p className="text-gray-600">
                Your next bill will be generated on <strong>{accountSummary.billCycle}</strong>
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-smart-teal text-smart-teal hover:bg-smart-teal hover:text-white"
                data-testid="button-billing-details"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Billing Details
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}