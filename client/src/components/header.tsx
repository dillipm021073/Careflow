import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Search, Bell, User, Menu } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-teal-bright rounded-lg flex items-center justify-center">
              <Heart className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">CareFlow</h1>
              <p className="text-teal-200 text-xs">Healthcare Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-white hover:text-teal-bright transition-colors duration-200 text-sm font-medium"
              data-testid="nav-dashboard"
            >
              DASHBOARD
            </a>
            <a 
              href="#" 
              className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-care-plans"
            >
              CARE PLANS
            </a>
            <a 
              href="#" 
              className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-patients"
            >
              PATIENTS
            </a>
            <a 
              href="#" 
              className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-reports"
            >
              REPORTS
            </a>
            <a 
              href="#" 
              className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-settings"
            >
              SETTINGS
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-teal-bright hover:bg-white hover:bg-opacity-10"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-teal-bright hover:bg-white hover:bg-opacity-10 relative"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-danger-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-teal-bright hover:bg-white hover:bg-opacity-10"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-white hover:text-teal-bright hover:bg-white hover:bg-opacity-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white border-opacity-10">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-white hover:text-teal-bright transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-dashboard"
              >
                DASHBOARD
              </a>
              <a 
                href="#" 
                className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-care-plans"
              >
                CARE PLANS
              </a>
              <a 
                href="#" 
                className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-patients"
              >
                PATIENTS
              </a>
              <a 
                href="#" 
                className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-reports"
              >
                REPORTS
              </a>
              <a 
                href="#" 
                className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-settings"
              >
                SETTINGS
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
