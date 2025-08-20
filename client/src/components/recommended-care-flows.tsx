import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Brain } from "lucide-react";

const careFlows = [
  {
    id: 1,
    category: "CARDIAC CARE",
    title: "Post-Surgical Recovery Flow",
    description: "Comprehensive cardiac rehabilitation program with monitoring and medication management",
    progress: 78,
    activePatients: 12,
    nextReview: "Today",
    color: "healthcare-blue",
    bgColor: "from-blue-500 to-blue-600",
    icon: Heart
  },
  {
    id: 2,
    category: "DIABETES CARE",
    title: "Type 2 Diabetes Management",
    description: "Complete diabetes care with glucose monitoring, medication, and lifestyle guidance",
    progress: 92,
    activePatients: 28,
    metric: "Avg. HbA1c: 7.2%",
    color: "success-green",
    bgColor: "from-green-500 to-green-600",
    icon: TrendingUp
  },
  {
    id: 3,
    category: "MENTAL HEALTH",
    title: "Anxiety & Depression Treatment Plan",
    description: "Integrated mental health care with therapy sessions and medication monitoring",
    progress: 85,
    activePatients: 15,
    nextReview: "Tomorrow",
    color: "purple-600",
    bgColor: "from-purple-600 to-purple-700",
    icon: Brain
  }
];

export default function RecommendedCareFlows() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold">Recommended Care Flows</h2>
          <p className="text-teal-200 text-sm">Personalized care plans based on current patient needs</p>
        </div>
        <Button 
          variant="ghost" 
          className="text-teal-bright hover:text-white transition-colors duration-200 text-sm font-medium"
          data-testid="button-view-all-flows"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careFlows.map((flow) => {
          const IconComponent = flow.icon;
          return (
            <Card 
              key={flow.id}
              className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border-0"
              data-testid={`care-flow-${flow.id}`}
            >
              <div className={`bg-gradient-to-r ${flow.bgColor} p-6 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium">
                      {flow.category}
                    </span>
                    <IconComponent className="h-6 w-6 opacity-30" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: flow.title.replace(' ', '<br>') }} />
                  <p className="text-white text-opacity-90 text-sm mb-4">{flow.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{flow.category.includes('DIABETES') ? 'Compliance Rate' : 'Progress'}</span>
                      <span>{flow.progress}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${flow.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <div className="opacity-80">{flow.activePatients} Active Patients</div>
                      <div className="font-semibold">
                        {flow.metric ? flow.metric : `Next Review: ${flow.nextReview}`}
                      </div>
                    </div>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm font-medium transition-all duration-200"
                      data-testid={`button-manage-flow-${flow.id}`}
                    >
                      {flow.category.includes('DIABETES') ? 'View Details' : 
                       flow.category.includes('MENTAL') ? 'Schedule' : 'Manage Flow'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
        <div className="w-8 h-2 bg-teal-bright rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
      </div>
    </section>
  );
}
