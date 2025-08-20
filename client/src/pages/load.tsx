import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  CreditCard, 
  Smartphone,
  ArrowRight,
  Check,
  DollarSign
} from "lucide-react";
import Header from "@/components/header";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LoadOption {
  id: string;
  amount: string;
  bonus?: string;
  validity: string;
  popular?: boolean;
}

const loadOptions: LoadOption[] = [
  { id: "load-15", amount: "15", validity: "3 days" },
  { id: "load-30", amount: "30", validity: "7 days" },
  { id: "load-60", amount: "60", validity: "15 days", popular: true },
  { id: "load-100", amount: "100", bonus: "10", validity: "30 days" },
  { id: "load-150", amount: "150", bonus: "20", validity: "30 days" },
  { id: "load-300", amount: "300", bonus: "50", validity: "45 days", popular: true },
  { id: "load-500", amount: "500", bonus: "100", validity: "60 days" },
  { id: "load-1000", amount: "1000", bonus: "250", validity: "90 days" }
];

const paymentMethods = [
  { id: "gcash", name: "GCash", icon: "💳" },
  { id: "paymaya", name: "PayMaya", icon: "💰" },
  { id: "credit_card", name: "Credit Card", icon: "💳" },
  { id: "bank_transfer", name: "Bank Transfer", icon: "🏦" }
];

export default function LoadPage() {
  const [selectedLoad, setSelectedLoad] = useState<LoadOption | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState("09171234567");
  const { toast } = useToast();

  const { data: customer } = useQuery({
    queryKey: ['/api/customers/customer-1'],
  });

  const purchaseLoadMutation = useMutation({
    mutationFn: (data: any) => apiRequest.post("/api/transactions", data),
    onSuccess: () => {
      toast({
        title: "Load Purchase Successful!",
        description: `₱${selectedLoad?.amount} load has been added to your account.`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/customers'] });
      setSelectedLoad(null);
      setSelectedPayment("");
    },
    onError: (error) => {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your load purchase.",
        variant: "destructive"
      });
    }
  });

  const handlePurchase = () => {
    if (!selectedLoad || !selectedPayment) return;
    
    purchaseLoadMutation.mutate({
      customerId: "customer-1",
      type: "load_purchase",
      amount: selectedLoad.amount,
      status: "pending",
      description: `Load purchase ₱${selectedLoad.amount}`,
      paymentMethod: selectedPayment
    });
  };

  return (
    <div 
      className="min-h-screen text-white bg-smart-dark-teal"
      style={{
        background: `linear-gradient(135deg, hsl(178 80% 20%) 0%, hsl(178 73% 40%) 50%, hsl(178 80% 20%) 100%)`
      }}
    >
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-smart-orange bg-opacity-10 rounded-xl flex items-center justify-center">
              <Zap className="text-smart-orange h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Buy Load</h1>
              <p className="text-green-200">Top up your Smart prepaid account</p>
            </div>
          </div>
        </section>

        {/* Mobile Number Section */}
        <Card className="card-gradient rounded-2xl p-6 mb-8 border-0">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Mobile Number</h2>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-smart-teal bg-opacity-10 rounded-lg flex items-center justify-center">
              <Smartphone className="text-smart-teal h-5 w-5" />
            </div>
            <div className="flex-1">
              <Input
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="text-lg font-mono"
                data-testid="input-mobile-number"
              />
            </div>
            <Badge variant="secondary" className="bg-smart-bright-green text-white">
              Smart Prepaid
            </Badge>
          </div>
        </Card>

        {/* Load Options */}
        <Card className="card-gradient rounded-2xl p-6 mb-8 border-0">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Load Amount</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loadOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedLoad(option)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedLoad?.id === option.id
                    ? 'border-smart-teal bg-smart-teal bg-opacity-10'
                    : 'border-gray-200 hover:border-smart-teal hover:bg-smart-teal hover:bg-opacity-5'
                }`}
                data-testid={`load-option-${option.id}`}
              >
                {option.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-smart-orange text-white text-xs">
                    Popular
                  </Badge>
                )}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="text-smart-teal h-4 w-4" />
                    <span className="text-2xl font-bold text-gray-900">₱{option.amount}</span>
                  </div>
                  {option.bonus && (
                    <p className="text-sm text-smart-bright-green font-medium mb-1">
                      + ₱{option.bonus} bonus
                    </p>
                  )}
                  <p className="text-xs text-gray-600">{option.validity} validity</p>
                </div>
                {selectedLoad?.id === option.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="text-smart-teal h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Method */}
        {selectedLoad && (
          <Card className="card-gradient rounded-2xl p-6 mb-8 border-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                    selectedPayment === method.id
                      ? 'border-smart-teal bg-smart-teal bg-opacity-10'
                      : 'border-gray-200 hover:border-smart-teal hover:bg-smart-teal hover:bg-opacity-5'
                  }`}
                  data-testid={`payment-${method.id}`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <p className="text-sm font-medium text-gray-900">{method.name}</p>
                  {selectedPayment === method.id && (
                    <div className="mt-2">
                      <Check className="text-smart-teal h-4 w-4 mx-auto" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Purchase Summary */}
        {selectedLoad && selectedPayment && (
          <Card className="card-gradient rounded-2xl p-6 mb-8 border-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Purchase Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mobile Number:</span>
                <span className="font-mono text-gray-900">{mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Load Amount:</span>
                <span className="font-semibold text-gray-900">₱{selectedLoad.amount}</span>
              </div>
              {selectedLoad.bonus && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Bonus:</span>
                  <span className="font-semibold text-smart-bright-green">₱{selectedLoad.bonus}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Validity:</span>
                <span className="text-gray-900">{selectedLoad.validity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900">
                  {paymentMethods.find(p => p.id === selectedPayment)?.name}
                </span>
              </div>
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total Amount:</span>
                  <span className="text-smart-teal">₱{selectedLoad.amount}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Purchase Button */}
        {selectedLoad && selectedPayment && (
          <div className="text-center">
            <Button
              onClick={handlePurchase}
              disabled={purchaseLoadMutation.isPending}
              className="bg-smart-teal hover:bg-smart-dark-teal text-white px-12 py-3 text-lg font-semibold"
              data-testid="button-purchase-load"
            >
              {purchaseLoadMutation.isPending ? (
                "Processing..."
              ) : (
                <>
                  Confirm Purchase
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            <p className="text-sm text-green-200 mt-4">
              Your load will be credited instantly after successful payment
            </p>
          </div>
        )}
      </main>
    </div>
  );
}