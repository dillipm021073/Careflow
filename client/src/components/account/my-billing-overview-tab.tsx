import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const billingOverviewData = {
  payableAmount: "2750.89",
  previousBill: "2750.89",
  servicesConsumed: "0.00",
  totalToPay: "2750.89",
};

export function MyBillingOverviewTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Payable Amount</h3>
        <p className="text-3xl font-bold">₱{billingOverviewData.payableAmount}</p>
        <Button className="mt-4">Pay Now</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Bill Summary (30/07)</h3>
          <div className="flow-root">
            <dl className="-my-4 divide-y divide-gray-200 text-sm">
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Previous Bill (30/06)</dt>
                <dd className="font-medium">₱{billingOverviewData.previousBill}</dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Services Consumed</dt>
                <dd className="font-medium">₱{billingOverviewData.servicesConsumed}</dd>
              </div>
              <div className="flex items-center justify-between py-4 font-bold">
                <dt>Total to Pay</dt>
                <dd>₱{billingOverviewData.totalToPay}</dd>
              </div>
            </dl>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Bill Breakdown</h3>
          <p className="text-sm text-gray-500">Bill breakdown is not available in the provided data.</p>
        </Card>
      </div>
    </div>
  );
}
