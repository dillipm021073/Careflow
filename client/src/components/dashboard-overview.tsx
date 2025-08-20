import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { 
  UserX, 
  CalendarCheck, 
  AlertCircle, 
  Bell, 
  Plus, 
  UserPlus, 
  CalendarPlus,
  Check,
  Clock,
  ExternalLink,
  ArrowRight
} from "lucide-react";

interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  pendingTasks: number;
  alerts: number;
}

const mockStats: DashboardStats = {
  totalPatients: 247,
  todayAppointments: 18,
  pendingTasks: 5,
  alerts: 3
};

const recentActivities = [
  {
    id: 1,
    icon: Check,
    title: "Medication administered to John Smith",
    subtitle: "Cardiac Care Flow • 2 minutes ago",
    type: "success"
  },
  {
    id: 2,
    icon: CalendarCheck,
    title: "Follow-up appointment scheduled for Sarah Davis",
    subtitle: "Diabetes Management • 15 minutes ago",
    type: "info"
  },
  {
    id: 3,
    icon: AlertCircle,
    title: "Lab results require attention for Mike Johnson",
    subtitle: "Mental Health Flow • 32 minutes ago",
    type: "warning"
  }
];

const criticalAlerts = [
  {
    id: 1,
    type: "critical",
    title: "High Blood Pressure Alert",
    patient: "Emma Wilson",
    detail: "BP: 180/110 mmHg",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    detailColor: "text-red-600"
  },
  {
    id: 2,
    type: "warning",
    title: "Medication Due",
    patient: "Robert Brown",
    detail: "Insulin - Due 2 hours ago",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    detailColor: "text-amber-600"
  },
  {
    id: 3,
    type: "info",
    title: "Care Plan Review",
    patient: "Lisa Anderson",
    detail: "Scheduled for today",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    detailColor: "text-blue-600"
  }
];

export default function DashboardOverview() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
    queryFn: () => Promise.resolve(mockStats), // Will be replaced with actual API call
  });

  const displayStats = stats || mockStats;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {/* Quick Stats and Recent Activity */}
      <div className="lg:col-span-2">
        <h2 className="text-white text-xl font-semibold mb-6">Today's Overview</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-gradient rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300 border-0">
            <div className="w-10 h-10 bg-healthcare-blue bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <UserX className="text-healthcare-blue h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800" data-testid="stat-total-patients">
              {isLoading ? "..." : displayStats.totalPatients}
            </div>
            <div className="text-gray-600 text-xs">Total Patients</div>
          </Card>

          <Card className="card-gradient rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300 border-0">
            <div className="w-10 h-10 bg-success-green bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CalendarCheck className="text-success-green h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800" data-testid="stat-today-appointments">
              {isLoading ? "..." : displayStats.todayAppointments}
            </div>
            <div className="text-gray-600 text-xs">Today's Visits</div>
          </Card>

          <Card className="card-gradient rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300 border-0">
            <div className="w-10 h-10 bg-warning-amber bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="text-warning-amber h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800" data-testid="stat-pending-tasks">
              {isLoading ? "..." : displayStats.pendingTasks}
            </div>
            <div className="text-gray-600 text-xs">Pending Tasks</div>
          </Card>

          <Card className="card-gradient rounded-2xl p-4 text-center hover:shadow-lg transition-shadow duration-300 border-0">
            <div className="w-10 h-10 bg-danger-red bg-opacity-10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Bell className="text-danger-red h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-gray-800" data-testid="stat-alerts">
              {isLoading ? "..." : displayStats.alerts}
            </div>
            <div className="text-gray-600 text-xs">Critical Alerts</div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-gradient rounded-2xl p-6 border-0">
          <h3 className="text-gray-800 font-semibold mb-4">Recent Care Flow Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon;
              const iconColors = {
                success: "bg-success-green bg-opacity-10 text-success-green",
                info: "bg-healthcare-blue bg-opacity-10 text-healthcare-blue",
                warning: "bg-warning-amber bg-opacity-10 text-warning-amber"
              };
              
              return (
                <div 
                  key={activity.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
                  data-testid={`activity-${activity.id}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColors[activity.type as keyof typeof iconColors]}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-xs">{activity.subtitle}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-healthcare-blue text-sm font-medium hover:text-blue-700"
            data-testid="button-view-all-activity"
          >
            View All Activity
          </Button>
        </Card>
      </div>

      {/* Quick Actions & Alerts */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="card-gradient rounded-2xl p-6 border-0">
          <h3 className="text-gray-800 font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button 
              className="w-full flex items-center space-x-3 p-3 bg-healthcare-blue text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              data-testid="button-create-care-flow"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Create New Care Flow</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              data-testid="button-add-patient"
            >
              <UserPlus className="text-gray-600 h-4 w-4" />
              <span className="text-sm font-medium text-gray-700">Add New Patient</span>
            </Button>
            <Button 
              variant="outline"
              className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
              data-testid="button-schedule-appointment"
            >
              <CalendarPlus className="text-gray-600 h-4 w-4" />
              <span className="text-sm font-medium text-gray-700">Schedule Appointment</span>
            </Button>
          </div>
        </Card>

        {/* Critical Alerts */}
        <Card className="card-gradient rounded-2xl p-6 border-0">
          <h3 className="text-gray-800 font-semibold mb-4">Critical Alerts</h3>
          <div className="space-y-3">
            {criticalAlerts.map((alert) => (
              <div 
                key={alert.id}
                className={`flex items-start space-x-3 p-3 ${alert.bgColor} border ${alert.borderColor} rounded-lg cursor-pointer hover:shadow-sm transition-shadow duration-200`}
                data-testid={`alert-${alert.id}`}
              >
                <AlertCircle className={`h-4 w-4 mt-0.5 ${alert.detailColor}`} />
                <div className="flex-1">
                  <p className={`${alert.textColor} text-sm font-medium`}>{alert.title}</p>
                  <p className={`${alert.detailColor} text-xs`}>Patient: {alert.patient}</p>
                  <p className={`${alert.detailColor.replace('600', '500')} text-xs`}>{alert.detail}</p>
                </div>
                <Button variant="ghost" size="sm" className={`${alert.detailColor} hover:${alert.textColor}`}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-healthcare-blue text-sm font-medium hover:text-blue-700"
            data-testid="button-view-all-alerts"
          >
            View All Alerts
          </Button>
        </Card>
      </div>
    </section>
  );
}
