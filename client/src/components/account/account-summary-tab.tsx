import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const accountSummaryData = {
  name: "Sam Aquino",
  accountNumber: "0999135609",
  status: "In collection",
  pastDue: "2750.89",
  address: "2.2 Ferdinand comer Franco, AKATI, METRO MANILA, 1207",
  email: "superemailtest321@mailinator.com",
  brand: "SMART",
  creditLimit: "3996.00",
  balance: "2750.89",
  dueDate: "30/08/25",
  billingTrend: "0.00",
  previousBill: "2750.89",
  newCharges: "0.00",
  servicesConsumed: "0.00",
  totalToPay: "2750.89",
};

export function AccountSummaryTab() {
  return (
    <div className="space-y-6">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p className="font-bold">Account Status</p>
        <p>This account is in collection. PHP {accountSummaryData.pastDue} past due as of Jan 2023.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-6">
          <h3 className="font-semibold mb-4">Account Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {accountSummaryData.name}</p>
            <p><span className="font-medium">Address:</span> {accountSummaryData.address}</p>
            <p><span className="font-medium">Email:</span> {accountSummaryData.email}</p>
            <p><span className="font-medium">Brand:</span> <Badge>{accountSummaryData.brand}</Badge></p>
            <p><span className="font-medium">Credit Limit:</span> {accountSummaryData.creditLimit}</p>
          </div>
        </Card>

        <Card className="md:col-span-1 p-6">
          <h3 className="font-semibold mb-4">My Balance</h3>
          <div className="space-y-2 text-sm">
            <p className="text-3xl font-bold">₱{accountSummaryData.balance}</p>
            <p>Due by: {accountSummaryData.dueDate}</p>
            <p className="text-red-500">Past Due Amount: ₱{accountSummaryData.pastDue}</p>
            <Button>Pay Now</Button>
          </div>
        </Card>

        <Card className="md:col-span-1 p-6">
          <h3 className="font-semibold mb-4">Billing Trend</h3>
          <p className="text-2xl font-bold">₱{accountSummaryData.billingTrend}</p>
          <p className="text-sm text-gray-500">Average of last 4 bills</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Bill Summary (30/07)</h3>
        <div className="flow-root">
          <dl className="-my-4 divide-y divide-gray-200 text-sm">
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Previous Bill (30/06)</dt>
              <dd className="font-medium">₱{accountSummaryData.previousBill}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">New Charges</dt>
              <dd className="font-medium">₱{accountSummaryData.newCharges}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Services Consumed</dt>
              <dd className="font-medium">₱{accountSummaryData.servicesConsumed}</dd>
            </div>
            <div className="flex items-center justify-between py-4 font-bold">
              <dt>Total to Pay</dt>
              <dd>₱{accountSummaryData.totalToPay}</dd>
            </div>
          </dl>
        </div>
      </Card>
    </div>
  );
}
