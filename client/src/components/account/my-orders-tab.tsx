import { EmptyState } from "@/components/ui/empty-state";
import { ShoppingCart } from "lucide-react";

export function MyOrdersTab() {
  return (
    <EmptyState
      icon={<ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />}
      title="No order history"
      description="You haven't placed any orders yet."
    />
  );
}
