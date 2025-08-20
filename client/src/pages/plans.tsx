import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Database,
  Phone,
  MessageSquare,
  Calendar,
  Star,
  Check,
  ArrowRight
} from "lucide-react";
import Header from "@/components/header";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Plan {
  id: string;
  name: string;
  type: string;
  price: string;
  dataAllowance: number | null;
  voiceMinutes: number | null;
  smsCount: number | null;
  validityDays: number | null;
  description: string | null;
  isActive: boolean;
}

const planFeatures = {
  prepaid: [
    "Pay as you use",
    "No monthly commitment",
    "Complete control over spending",
    "Easy top-up options"
  ],
  postpaid: [
    "Monthly billing",
    "Higher data allowances",
    "Premium services included",
    "Device installment options"
  ]
};

// Extended plan data
const allPlans = [
  {
    id: "plan-1",
    name: "Smart Prepaid 99",
    type: "prepaid",
    price: "99.00",
    dataAllowance: 2048,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 7,
    description: "2GB data + unlimited calls & texts to all networks for 7 days",
    isActive: true,
    popular: false
  },
  {
    id: "plan-2",
    name: "Smart Prepaid 599",
    type: "prepaid",
    price: "599.00",
    dataAllowance: 12288,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 30,
    description: "12GB data + unlimited calls & texts to all networks",
    isActive: true,
    popular: true
  },
  {
    id: "plan-3",
    name: "Smart Postpaid 999",
    type: "postpaid",
    price: "999.00",
    dataAllowance: 15360,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 30,
    description: "15GB data + unlimited calls & texts + access to streaming apps",
    isActive: true,
    popular: false
  },
  {
    id: "plan-4",
    name: "Smart Postpaid 1899",
    type: "postpaid",
    price: "1899.00",
    dataAllowance: 25600,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 30,
    description: "25GB data + unlimited calls & texts + Netflix access",
    isActive: true,
    popular: true
  },
  {
    id: "plan-5",
    name: "Smart Prepaid 199",
    type: "prepaid",
    price: "199.00",
    dataAllowance: 4096,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 15,
    description: "4GB data + unlimited calls & texts for 15 days",
    isActive: true,
    popular: false
  },
  {
    id: "plan-6",
    name: "Smart Postpaid 2999",
    type: "postpaid",
    price: "2999.00",
    dataAllowance: 51200,
    voiceMinutes: 0,
    smsCount: 0,
    validityDays: 30,
    description: "50GB data + unlimited calls & texts + premium streaming bundle",
    isActive: true,
    popular: false
  }
];

export default function PlansPage() {
  const [selectedPlanType, setSelectedPlanType] = useState<"all" | "prepaid" | "postpaid">("all");
  const { toast } = useToast();

  const { data: customer } = useQuery({
    queryKey: ['/api/customers/customer-1'],
  });

  const subscribePlanMutation = useMutation({
    mutationFn: (data: any) => apiRequest.post("/api/transactions", data),
    onSuccess: (_, variables) => {
      const plan = allPlans.find(p => p.id === variables.planId);
      toast({
        title: "Plan Subscription Successful!",
        description: `Successfully subscribed to ${plan?.name}. You will receive a confirmation SMS shortly.`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/customers'] });
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: "Unable to subscribe to plan. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubscribe = (plan: typeof allPlans[0]) => {
    subscribePlanMutation.mutate({
      customerId: "customer-1",
      type: "plan_subscription",
      amount: plan.price,
      status: "pending",
      description: `Plan subscription: ${plan.name}`,
      planId: plan.id
    });
  };

  const filteredPlans = allPlans.filter(plan => {
    return selectedPlanType === "all" || plan.type === selectedPlanType;
  });

  const formatDataAmount = (mb: number | null) => {
    if (!mb) return "No data";
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1)}GB`;
    }
    return `${mb}MB`;
  };

  const formatCalls = (minutes: number | null) => {
    if (minutes === 0) return "Unlimited calls";
    if (!minutes) return "No calls included";
    return `${minutes} minutes`;
  };

  const formatSms = (count: number | null) => {
    if (count === 0) return "Unlimited texts";
    if (!count) return "No texts included";
    return `${count} texts`;
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
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
              <CreditCard className="text-smart-bright-green h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Plans</h1>
              <p className="text-green-200">Choose the perfect plan for your needs</p>
            </div>
          </div>
        </section>

        {/* Plan Type Filter */}
        <div className="mb-8">
          <Card className="card-gradient rounded-2xl p-6 border-0">
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { id: "all", name: "All Plans" },
                { id: "prepaid", name: "Prepaid Plans" },
                { id: "postpaid", name: "Postpaid Plans" }
              ].map((type) => (
                <Button
                  key={type.id}
                  variant={selectedPlanType === type.id ? "default" : "outline"}
                  onClick={() => setSelectedPlanType(type.id as any)}
                  className={`px-8 py-2 ${
                    selectedPlanType === type.id 
                      ? 'bg-smart-teal text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  data-testid={`filter-${type.id}`}
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`card-gradient rounded-2xl p-6 border-0 hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-smart-orange ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-smart-orange text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <Badge 
                  variant="secondary" 
                  className={`mb-4 ${
                    plan.type === 'prepaid' 
                      ? 'bg-smart-teal text-white' 
                      : 'bg-smart-bright-green text-white'
                  }`}
                >
                  {plan.type === 'prepaid' ? 'Prepaid' : 'Postpaid'}
                </Badge>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid={`plan-name-${plan.id}`}>
                  {plan.name}
                </h3>
                
                <div className="text-4xl font-bold text-smart-teal mb-2">
                  ₱{plan.price}
                </div>
                
                <p className="text-sm text-gray-600">
                  {plan.type === 'prepaid' ? 'One-time payment' : 'Monthly subscription'}
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-6 text-center" data-testid={`plan-desc-${plan.id}`}>
                {plan.description}
              </p>

              {/* Plan Features */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Database className="text-smart-teal h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{formatDataAmount(plan.dataAllowance)}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-smart-bright-green h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700">{formatCalls(plan.voiceMinutes)}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="text-purple-600 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700">{formatSms(plan.smsCount)}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="text-smart-orange h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Valid for {plan.validityDays} day{plan.validityDays !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Plan Type Benefits */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {plan.type === 'prepaid' ? 'Prepaid Benefits:' : 'Postpaid Benefits:'}
                </h4>
                <ul className="space-y-1">
                  {planFeatures[plan.type as keyof typeof planFeatures].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Check className="h-3 w-3 text-smart-bright-green flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Button */}
              <Button
                onClick={() => handleSubscribe(plan)}
                disabled={subscribePlanMutation.isPending}
                className="w-full bg-smart-teal hover:bg-smart-dark-teal text-white py-3"
                data-testid={`button-subscribe-${plan.id}`}
              >
                {subscribePlanMutation.isPending ? (
                  "Processing..."
                ) : (
                  <>
                    {plan.type === 'prepaid' ? 'Subscribe Now' : 'Apply for Plan'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {/* Plan Comparison CTA */}
        <div className="mt-12 text-center">
          <Card className="card-gradient rounded-2xl p-8 border-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need help choosing?</h2>
            <p className="text-gray-600 mb-6">
              Compare plans side by side or chat with our customer support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-smart-teal text-smart-teal hover:bg-smart-teal hover:text-white">
                Compare Plans
              </Button>
              <Button className="bg-smart-teal hover:bg-smart-dark-teal text-white">
                Chat with Support
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}