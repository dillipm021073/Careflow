import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function MyServicesAndUsageTab() {
  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Please Note</AlertTitle>
        <AlertDescription>
          Hi! Looks like you have an unsettled balance on your bill. You may pay your bill online or go to the nearest Smart Store to settle your bill.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Application Status</AlertTitle>
        <AlertDescription>
          We regret to inform you that your Smart plan application cannot be granted at this time. You may file a ticket online to contact our customer representatives.
        </AlertDescription>
      </Alert>
    </div>
  );
}
