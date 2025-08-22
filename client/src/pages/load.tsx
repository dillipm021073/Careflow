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
import Footer from "@/components/footer";
import StarryBackground from "@/components/starry-background";
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
    mutationFn: (data: any) => apiRequest("POST", "/api/transactions", data),
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
    <div className="min-h-screen flex flex-col night-sky">
      <StarryBackground />
      <div className="relative z-10">
        <Header />
      </div>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
              <Zap className="text-smart-bright-green h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Buy Load</h1>
              <p className="text-green-100">Top up your Smart prepaid account</p>
            </div>
          </div>
        </section>

        {/* Mobile Number Section */}
        <Card className="bg-black rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Mobile Number</h2>
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

        {/* Load Options - Smart Style */}
        <Card className="bg-black rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-6">Select Load Amount</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {loadOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => setSelectedLoad(option)}
                className={`relative bg-black rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1 ${
                  selectedLoad?.id === option.id
                    ? 'ring-2 ring-smart-bright-green shadow-lg'
                    : 'border border-gray-600'
                }`}
                data-testid={`load-option-${option.id}`}
              >
                {option.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold text-xs">
                    POPULAR
                  </Badge>
                )}
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-xs text-gray-400 block">only</span>
                    <span className="text-2xl font-bold text-smart-bright-green">₱{option.amount}</span>
                  </div>
                  {option.bonus && (
                    <p className="text-sm text-orange-600 font-bold mb-1">
                      + ₱{option.bonus} bonus
                    </p>
                  )}
                  <p className="text-xs text-white mt-2">{option.validity}</p>
                </div>
                {selectedLoad?.id === option.id && (
                  <div className="absolute top-2 left-2">
                    <div className="w-5 h-5 rounded-full bg-smart-bright-green flex items-center justify-center">
                      <Check className="text-white h-3 w-3" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Method */}
        {selectedLoad && (
          <Card className="bg-black rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                    selectedPayment === method.id
                      ? 'border-smart-bright-green bg-smart-bright-green bg-opacity-20'
                      : 'border-gray-600 hover:border-smart-bright-green hover:bg-smart-bright-green hover:bg-opacity-10 bg-gray-900'
                  }`}
                  data-testid={`payment-${method.id}`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <p className="text-sm font-medium text-white">{method.name}</p>
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
          <Card className="bg-black rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Purchase Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Mobile Number:</span>
                <span className="font-mono text-white">{mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Load Amount:</span>
                <span className="font-semibold text-white">₱{selectedLoad.amount}</span>
              </div>
              {selectedLoad.bonus && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Bonus:</span>
                  <span className="font-semibold text-smart-bright-green">₱{selectedLoad.bonus}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Validity:</span>
                <span className="text-white">{selectedLoad.validity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span className="text-white">
                  {paymentMethods.find(p => p.id === selectedPayment)?.name}
                </span>
              </div>
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total Amount:</span>
                  <span className="text-smart-teal">₱{selectedLoad.amount}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Purchase Button - Smart Style */}
        {selectedLoad && selectedPayment && (
          <div className="text-center">
            <Button
              onClick={handlePurchase}
              disabled={purchaseLoadMutation.isPending}
              className="bg-smart-bright-green hover:bg-green-600 text-white font-bold px-12 py-3 text-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
              data-testid="button-purchase-load"
            >
              {purchaseLoadMutation.isPending ? "Processing..." : "Buy Now"}
            </Button>
            <p className="text-sm text-green-100 mt-4">
              Your load will be credited instantly after successful payment
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}