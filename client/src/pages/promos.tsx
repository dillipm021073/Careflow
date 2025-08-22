import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Gift, 
  Database,
  Phone,
  MessageSquare,
  Clock,
  Search,
  Star,
  ArrowRight
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StarryBackground from "@/components/starry-background";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Promo {
  id: string;
  name: string;
  description: string | null;
  type: string;
  price: string;
  dataAmount: number | null;
  voiceMinutes: number | null;
  smsCount: number | null;
  validityHours: number | null;
  keyword: string | null;
  isActive: boolean;
  category: string;
}

const promoCategories = [
  { id: "all", name: "All Promos", icon: Gift },
  { id: "featured", name: "Featured", icon: Star },
  { id: "data", name: "Data Promos", icon: Database },
  { id: "combo", name: "Call & Text", icon: Phone },
  { id: "social", name: "Social Media", icon: MessageSquare }
];

// Extended promo data
const allPromos = [
  {
    id: "promo-1",
    name: "GIGA50",
    description: "2GB data valid for 3 days",
    type: "data",
    price: "50.00",
    dataAmount: 2048,
    voiceMinutes: null,
    smsCount: null,
    validityHours: 72,
    keyword: "GIGA50",
    category: "featured"
  },
  {
    id: "promo-2",
    name: "ALLNET20",
    description: "Unlimited calls and texts to all networks for 1 day",
    type: "combo",
    price: "20.00",
    dataAmount: null,
    voiceMinutes: 0,
    smsCount: 0,
    validityHours: 24,
    keyword: "ALLNET20",
    category: "combo"
  },
  {
    id: "promo-3",
    name: "GIGA99",
    description: "4GB data + unlimited texts to all networks for 7 days",
    type: "combo",
    price: "99.00",
    dataAmount: 4096,
    voiceMinutes: null,
    smsCount: 0,
    validityHours: 168,
    keyword: "GIGA99",
    category: "featured"
  },
  {
    id: "promo-4",
    name: "SOCIAL10",
    description: "Unlimited Facebook and Instagram for 1 day",
    type: "social",
    price: "10.00",
    dataAmount: null,
    voiceMinutes: null,
    smsCount: null,
    validityHours: 24,
    keyword: "SOCIAL10",
    category: "social"
  },
  {
    id: "promo-5",
    name: "SURF299",
    description: "15GB data + unlimited calls and texts for 30 days",
    type: "combo",
    price: "299.00",
    dataAmount: 15360,
    voiceMinutes: 0,
    smsCount: 0,
    validityHours: 720,
    keyword: "SURF299",
    category: "featured"
  },
  {
    id: "promo-6",
    name: "DATA15",
    description: "1GB data valid for 1 day",
    type: "data",
    price: "15.00",
    dataAmount: 1024,
    voiceMinutes: null,
    smsCount: null,
    validityHours: 24,
    keyword: "DATA15",
    category: "data"
  }
];

import { GridSkeleton } from "@/components/ui/grid-skeleton";
import { EmptyState } from "@/components/ui/empty-state";

export default function PromosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ['/api/customers/customer-1'],
  });

  const subscribePromoMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/transactions", data),
    onSuccess: (_, variables) => {
      const promo = allPromos.find(p => p.id === variables.promoId);
      toast({
        title: "Promo Subscribed!",
        description: `Successfully subscribed to ${promo?.name}. Check your SMS for confirmation.`
      });
      queryClient.invalidateQueries({ queryKey: ['/api/customers'] });
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: "Unable to subscribe to promo. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubscribe = (promo: typeof allPromos[0]) => {
    subscribePromoMutation.mutate({
      customerId: "customer-1",
      type: "promo_subscription",
      amount: promo.price,
      status: "pending",
      description: `Promo subscription: ${promo.name}`,
      promoId: promo.id
    });
  };

  const filteredPromos = allPromos.filter(promo => {
    const categoryMatch = selectedCategory === "all" || promo.category === selectedCategory;
    const searchMatch = searchQuery === "" || 
      promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const formatDataAmount = (mb: number | null) => {
    if (!mb) return null;
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(mb % 1024 === 0 ? 0 : 1)}GB`;
    }
    return `${mb}MB`;
  };

  const formatValidity = (hours: number | null) => {
    if (!hours) return null;
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen flex flex-col night-sky">
      <StarryBackground />
      <div className="relative z-10">
        <Header />
      </div>
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <section className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-smart-bright-green bg-opacity-10 rounded-xl flex items-center justify-center">
              <Gift className="text-smart-bright-green h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Promos & Add-ons</h1>
              <p className="text-green-100">Choose from our latest promotional offers</p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <div className="mb-8">
          <Card className="bg-black rounded-xl p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <label htmlFor="search-promos" className="sr-only">Search Promos</label>
                  <Input
                    id="search-promos"
                    placeholder="Search promos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 text-white border-gray-600"
                    data-testid="input-search-promos"
                  />
                </div>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {promoCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 whitespace-nowrap ${
                        selectedCategory === category.id 
                          ? 'bg-smart-teal text-white border-2 border-black' 
                          : 'bg-black text-white border border-gray-600 hover:border-smart-teal'
                      }`}
                      data-testid={`filter-${category.id}`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Promos Grid - Smart Style */}
        {isCustomerLoading ? (
          <GridSkeleton />
        ) : filteredPromos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPromos.map((promo) => (
              <div key={promo.id} className="bg-black rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 flex flex-col">
                {/* Promo Image Area */}
                <div className="relative bg-gradient-to-br from-smart-teal to-smart-dark-teal p-6">
                  <div className="absolute top-2 right-2">
                    {promo.category === "featured" && (
                      <Badge className="bg-yellow-400 text-black font-bold">
                        FEATURED
                      </Badge>
                    )}
                  </div>
                  <div className="text-center">
                    <Gift className="mx-auto h-12 w-12 text-white mb-2" />
                    <h3 className="text-white font-bold text-lg">{promo.name}</h3>
                  </div>
                </div>
                
                {/* Promo Details */}
                <div className="p-4 flex flex-col h-full">
                  <p className="text-white text-sm mb-3 flex-grow" data-testid={`promo-desc-${promo.id}`}>
                    {promo.description}
                  </p>
                  
                  {/* Price Display */}
                  <div className="text-center mb-3">
                    <span className="text-sm text-gray-400">only</span>
                    <div className="text-2xl font-bold text-smart-bright-green">₱{promo.price}</div>
                  </div>

                  {/* Features */}
                  <div className="space-y-1 mb-4 text-xs flex-grow">
                    {promo.dataAmount && (
                      <div className="flex items-center space-x-1">
                        <Database className="text-smart-teal h-3 w-3" />
                        <span className="text-white">{formatDataAmount(promo.dataAmount)} data</span>
                      </div>
                    )}
                    {promo.voiceMinutes === 0 && (
                      <div className="flex items-center space-x-1">
                        <Phone className="text-smart-bright-green h-3 w-3" />
                        <span className="text-white">Unlimited calls</span>
                      </div>
                    )}
                    {promo.smsCount === 0 && (
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="text-purple-600 h-3 w-3" />
                        <span className="text-white">Unlimited texts</span>
                      </div>
                    )}
                    {promo.validityHours && (
                      <div className="flex items-center space-x-1">
                        <Clock className="text-smart-orange h-3 w-3" />
                        <span className="text-white">Valid for {formatValidity(promo.validityHours)}</span>
                      </div>
                    )}
                  </div>

                  {/* Buy Now Button */}
                  <Button
                    onClick={() => handleSubscribe(promo)}
                    disabled={subscribePromoMutation.isPending}
                    className="w-full bg-smart-teal hover:bg-smart-teal/90 text-white font-bold py-2 px-4 rounded transition-all duration-300 disabled:opacity-50"
                    data-testid={`button-subscribe-${promo.id}`}
                  >
                    {subscribePromoMutation.isPending ? "Processing..." : "Buy Now"}
                  </Button>
                  
                  {promo.keyword && (
                    <div className="text-center mt-2">
                      <p className="text-xs text-gray-400">Text <strong className="text-white">{promo.keyword}</strong> to 8080</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Gift className="mx-auto h-12 w-12 text-gray-400 mb-4" />}
            title="No promos found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </main>
      <Footer />
    </div>
  );
}