import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Gift, 
  Smartphone, 
  CreditCard, 
  Bell,
  ArrowUpRight,
  Database,
  Phone,
  Timer,
  DollarSign,
  TrendingUp
} from "lucide-react";
import Header from "@/components/header";
import CategoryNavigation from "@/components/category-navigation";

interface DashboardStats {
  totalCustomers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  dataUsage: number;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  msisdn: string;
  customerType: string;
  accountStatus: string;
}

interface Plan {
  id: string;
  name: string;
  type: string;
  price: string;
  dataAllowance: number | null;
  description: string | null;
}

interface Promo {
  id: string;
  name: string;
  description: string | null;
  type: string;
  price: string;
  keyword: string | null;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  isRead: boolean;
}

export default function SelfCareDashboard() {
  const { data: stats, isLoading: isStatsLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  const { data: customer } = useQuery<Customer>({
    queryKey: ['/api/customers/customer-1'],
  });

  const { data: promos } = useQuery<Promo[]>({
    queryKey: ['/api/promos/featured'],
  });

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['/api/customers/customer-1/notifications'],
  });

  // Mock account data for the customer
  const accountData = {
    balance: "₱125.50",
    dataRemaining: "8.2 GB",
    validity: "15 days",
    planName: "Smart Prepaid 599"
  };

  return (
    <div 
      className="min-h-screen text-white bg-smart-dark-teal"
      style={{
        background: `linear-gradient(135deg, hsl(178 80% 20%) 0%, hsl(178 73% 40%) 50%, hsl(178 80% 20%) 100%)`
      }}
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {customer?.firstName || 'Valued Customer'}!
              </h1>
              <p className="text-green-200">
                Manage your Smart account and services
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-200">Account Status</p>
              <Badge variant="secondary" className="bg-smart-bright-green text-white">
                {customer?.accountStatus || 'Active'}
              </Badge>
            </div>
          </div>
        </section>

        {/* Account Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Load Balance</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="balance-amount">
                  {accountData.balance}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-orange bg-opacity-10 rounded-xl flex items-center justify-center">
                <DollarSign className="text-smart-orange h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Data Remaining</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="data-remaining">
                  {accountData.dataRemaining}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-teal bg-opacity-10 rounded-xl flex items-center justify-center">
                <Database className="text-smart-teal h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Plan Validity</p>
                <p className="text-2xl font-bold text-gray-900" data-testid="validity-days">
                  {accountData.validity}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-yellow bg-opacity-10 rounded-xl flex items-center justify-center">
                <Timer className="text-smart-yellow h-6 w-6" />
              </div>
            </div>
          </Card>

          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Plan</p>
                <p className="text-lg font-bold text-gray-900" data-testid="current-plan">
                  {accountData.planName}
                </p>
              </div>
              <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
                <CreditCard className="text-smart-bright-green h-6 w-6" />
              </div>
            </div>
          </Card>
        </section>

        {/* Category Navigation */}
        <CategoryNavigation />

        {/* Featured Promos Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-xl font-semibold">Featured Promos</h2>
              <p className="text-green-200 text-sm">Special offers just for you</p>
            </div>
            <Button 
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-smart-dark-teal"
              data-testid="button-view-all-promos"
            >
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promos?.map((promo) => (
              <Card key={promo.id} className="card-gradient rounded-2xl p-6 border-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-smart-yellow bg-opacity-10 rounded-xl flex items-center justify-center">
                    <Gift className="text-smart-yellow h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="bg-smart-bright-green text-white">
                    {promo.type}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" data-testid={`promo-name-${promo.id}`}>
                  {promo.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4" data-testid={`promo-desc-${promo.id}`}>
                  {promo.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-smart-teal">₱{promo.price}</span>
                  <Button 
                    size="sm" 
                    className="bg-smart-teal hover:bg-smart-dark-teal text-white"
                    data-testid={`button-subscribe-${promo.id}`}
                  >
                    Subscribe
                  </Button>
                </div>
                {promo.keyword && (
                  <p className="text-xs text-gray-500 mt-2">
                    Text <strong>{promo.keyword}</strong> to 8080
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-white text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 bg-smart-orange hover:bg-orange-600 text-white flex flex-col items-center justify-center"
              data-testid="button-buy-load"
            >
              <Zap className="h-6 w-6 mb-2" />
              Buy Load
            </Button>
            <Button 
              className="h-20 bg-smart-teal hover:bg-teal-600 text-white flex flex-col items-center justify-center"
              data-testid="button-check-balance"
            >
              <DollarSign className="h-6 w-6 mb-2" />
              Check Balance
            </Button>
            <Button 
              className="h-20 bg-smart-bright-green hover:bg-green-600 text-white flex flex-col items-center justify-center"
              data-testid="button-usage-history"
            >
              <TrendingUp className="h-6 w-6 mb-2" />
              Usage History
            </Button>
            <Button 
              className="h-20 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center"
              data-testid="button-customer-care"
            >
              <Phone className="h-6 w-6 mb-2" />
              Customer Care
            </Button>
          </div>
        </section>

        {/* Recent Notifications */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-white text-xl font-semibold">Notifications</h2>
              <p className="text-green-200 text-sm">Stay updated on your account</p>
            </div>
            <Button 
              variant="outline" 
              className="border-white bg-transparent text-white hover:bg-white hover:text-smart-dark-teal"
              data-testid="button-view-all-notifications"
            >
              View All
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {notifications?.slice(0, 3).map((notification) => (
              <Card key={notification.id} className="card-gradient rounded-2xl p-6 border-0">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-smart-teal bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Bell className="text-smart-teal h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 font-semibold" data-testid={`notification-title-${notification.id}`}>
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1" data-testid={`notification-message-${notification.id}`}>
                      {notification.message}
                    </p>
                    <Badge 
                      variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                      className="mt-2"
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}