import Header from "@/components/header";
import CategoryNavigation from "@/components/category-navigation";
import RecommendedCareFlows from "@/components/recommended-care-flows";
import DashboardOverview from "@/components/dashboard-overview";
import CareFlowTimeline from "@/components/care-flow-timeline";
import MobileAccessNote from "@/components/mobile-access-note";
import Footer from "@/components/footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen font-inter bg-smart-gradient">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryNavigation />
        <RecommendedCareFlows />
        <DashboardOverview />
        <CareFlowTimeline />
        <MobileAccessNote />
      </main>
      
      <Footer />
    </div>
  );
}
