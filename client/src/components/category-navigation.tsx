import { Card } from "@/components/ui/card";
import { 
  ClipboardList, 
  Users, 
  CalendarCheck, 
  Pill, 
  BarChart3, 
  AlertTriangle 
} from "lucide-react";

const categories = [
  {
    title: "Care Plans",
    icon: ClipboardList,
    color: "healthcare-blue",
    testId: "category-care-plans"
  },
  {
    title: "Patients",
    icon: Users,
    color: "success-green",
    testId: "category-patients"
  },
  {
    title: "Appointments",
    icon: CalendarCheck,
    color: "warning-amber",
    testId: "category-appointments"
  },
  {
    title: "Medications",
    icon: Pill,
    color: "purple-600",
    testId: "category-medications"
  },
  {
    title: "Reports",
    icon: BarChart3,
    color: "pink-600",
    testId: "category-reports"
  },
  {
    title: "Emergency",
    icon: AlertTriangle,
    color: "danger-red",
    testId: "category-emergency"
  }
];

export default function CategoryNavigation() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-lg font-semibold">Manage by Category</h2>
          <p className="text-teal-200 text-sm">Quick access to care management tools</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.title}
              className="card-gradient rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105 border-0"
              data-testid={category.testId}
            >
              <div className="text-center">
                <div className={`w-12 h-12 bg-${category.color} bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-opacity-20 transition-all duration-300`}>
                  <IconComponent className={`text-${category.color} h-6 w-6`} />
                </div>
                <h3 className="text-gray-800 font-medium text-sm">{category.title}</h3>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
