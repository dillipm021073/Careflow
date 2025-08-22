import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  UserX, 
  Check, 
  Play, 
  Clock, 
  Flag,
  Calendar,
  UserCheck,
  Edit,
  Expand
} from "lucide-react";

const timelineStages = [
  {
    id: 1,
    title: "Pre-Surgery Assessment",
    description: "Initial evaluation, lab work, and surgical clearance completed successfully.",
    status: "completed",
    completedDate: "March 15, 2024",
    assignedTo: "Dr. Sarah Wilson",
    icon: Check,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    iconBg: "bg-success-green"
  },
  {
    id: 2,
    title: "Post-Surgery Recovery",
    description: "Monitoring vital signs, pain management, and early mobilization exercises.",
    status: "in-progress",
    progress: 78,
    startedDate: "March 20, 2024",
    assignedTo: "Dr. Michael Chen",
    icon: Play,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    iconBg: "bg-healthcare-blue"
  },
  {
    id: 3,
    title: "Cardiac Rehabilitation",
    description: "Structured exercise program and lifestyle counseling sessions.",
    status: "scheduled",
    scheduledDate: "April 1, 2024",
    assignedTo: "Dr. Emily Rodriguez",
    icon: Clock,
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-700",
    iconBg: "bg-gray-300"
  },
  {
    id: 4,
    title: "Long-term Follow-up",
    description: "Regular monitoring and maintenance care plan implementation.",
    status: "pending",
    expectedDate: "May 1, 2024",
    assignedTo: "To be assigned",
    icon: Flag,
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-600",
    iconBg: "bg-gray-200"
  }
];

export default function CareFlowTimeline() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-xl font-semibold">Active Care Flow Timeline</h2>
          <p className="text-teal-200 text-sm">Monitor patient progress across care stages</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="all">
            <SelectTrigger 
              className="w-48 bg-white bg-opacity-10 text-white border-white border-opacity-20 focus:ring-2 focus:ring-teal-bright"
              data-testid="select-care-flow-filter"
            >
              <SelectValue placeholder="Filter care flows" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Care Flows</SelectItem>
              <SelectItem value="cardiac">Cardiac Care</SelectItem>
              <SelectItem value="diabetes">Diabetes Management</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="card-gradient rounded-2xl p-6 border-0">
        <div className="space-y-6">
          {/* Care Flow Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-healthcare-blue bg-opacity-10 rounded-xl flex items-center justify-center">
                <UserX className="text-healthcare-blue h-6 w-6" />
              </div>
              <div>
                <h3 className="text-gray-800 font-semibold" data-testid="patient-name">John Smith</h3>
                <p className="text-gray-600 text-sm">Cardiac Post-Surgical Recovery • Started March 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-success-green bg-opacity-10 text-success-green border-success-green border-opacity-20">
                On Track
              </Badge>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600" data-testid="button-expand-timeline">
                <Expand className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gray-200"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-8">
              {timelineStages.map((stage, index) => {
                const IconComponent = stage.icon;
                const isActive = stage.status === "in-progress";
                
                return (
                  <div key={stage.id} className="flex items-start space-x-4">
                    <div className={`relative z-10 w-12 h-12 ${stage.iconBg} rounded-full flex items-center justify-center shadow-lg ${isActive ? 'animate-pulse' : ''}`}>
                      <IconComponent className="text-white h-5 w-5" />
                    </div>
                    <div className={`flex-1 ${stage.bgColor} border ${stage.borderColor} rounded-xl p-4 ${stage.status === "pending" ? 'opacity-60' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`${stage.textColor} font-medium`}>{stage.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${stage.textColor} bg-opacity-20 text-xs`}
                          data-testid={`stage-status-${stage.id}`}
                        >
                          {stage.status === "completed" ? "Completed" :
                           stage.status === "in-progress" ? "In Progress" :
                           stage.status === "scheduled" ? "Scheduled" : "Pending"}
                        </Badge>
                      </div>
                      <p className={`${stage.textColor} text-sm mb-3`}>{stage.description}</p>
                      
                      {/* Progress Bar for In Progress Stage */}
                      {stage.status === "in-progress" && stage.progress && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-blue-600 mb-1">
                            <span>Recovery Progress</span>
                            <span>{stage.progress}%</span>
                          </div>
                          <div className="w-full bg-blue-100 rounded-full h-2">
                            <div 
                              className="bg-healthcare-blue h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${stage.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {stage.completedDate && `Completed: ${stage.completedDate}`}
                          {stage.startedDate && `Started: ${stage.startedDate}`}
                          {stage.scheduledDate && `Scheduled: ${stage.scheduledDate}`}
                          {stage.expectedDate && `Expected: ${stage.expectedDate}`}
                        </span>
                        <span className="flex items-center">
                          <UserCheck className="h-3 w-3 mr-1" />
                          {stage.assignedTo}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 text-healthcare-blue hover:text-blue-700 transition-colors duration-200 text-sm font-medium"
              data-testid="button-update-progress"
            >
              <Edit className="h-4 w-4" />
              <span>Update Progress</span>
            </Button>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
                data-testid="button-add-note"
              >
                Add Note
              </Button>
              <Button 
                className="bg-healthcare-blue text-white hover:bg-blue-700 text-sm font-medium transition-colors duration-200"
                data-testid="button-view-full-flow"
              >
                View Full Flow
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
