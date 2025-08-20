import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Search, Bell, User, Menu } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-smart-teal rounded-lg flex items-center justify-center">
              <Smartphone className="text-white h-5 w-5" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Smart</h1>
              <p className="text-green-200 text-xs">Self Care</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="/load" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-load"
            >
              LOAD
            </a>
            <a 
              href="/promos" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-promos"
            >
              PROMOS
            </a>
            <a 
              href="/plans" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-plans"
            >
              PLANS
            </a>
            <a 
              href="/phones" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-phones"
            >
              PHONES
            </a>
            <a 
              href="/services" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-services"
            >
              SERVICES
            </a>
            <a 
              href="/account" 
              className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
              data-testid="nav-account"
            >
              MY ACCOUNT
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-teal hover:bg-white hover:bg-opacity-10"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-teal hover:bg-white hover:bg-opacity-10 relative"
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-smart-red text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-teal hover:bg-white hover:bg-opacity-10"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden text-white hover:text-smart-teal hover:bg-white hover:bg-opacity-10"
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
                href="/load" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-load"
              >
                LOAD
              </a>
              <a 
                href="/promos" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-promos"
              >
                PROMOS
              </a>
              <a 
                href="/plans" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-plans"
              >
                PLANS
              </a>
              <a 
                href="/phones" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-phones"
              >
                PHONES
              </a>
              <a 
                href="/services" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-services"
              >
                SERVICES
              </a>
              <a 
                href="/account" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-account"
              >
                MY ACCOUNT
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
