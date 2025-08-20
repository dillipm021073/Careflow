import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Search, Bell, User, Menu } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Smart Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {/* Smart Triangle Logo */}
                <div className="w-6 h-6 relative">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-smart-bright-green">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">Smart</span>
              </div>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/load" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              data-testid="nav-load"
            >
              LOAD
            </Link>
            <Link 
              href="/promos" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
              data-testid="nav-promos"
            >
              PROMOS & ADD-ONS
            </Link>
            <a 
              href="#" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
            >
              SIMS
            </a>
            <a 
              href="#" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
            >
              PHONES
            </a>
            <a 
              href="#" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
            >
              PLANS
            </a>
            <a 
              href="#" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
            >
              DEVICES
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-bright-green"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-bright-green"
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
            <div className="text-white text-sm">
              <span className="text-gray-300">Shop Postpaid</span>
              <br />
              <span className="text-gray-300">Switch to Smart</span>
            </div>
            <Link 
              href="/account" 
              className="text-white hover:text-smart-bright-green transition-colors duration-200 text-sm font-medium"
              data-testid="nav-account"
            >
              Track my Order
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:text-smart-bright-green"
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
              <Link 
                href="/load" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-load"
              >
                LOAD
              </Link>
              <Link 
                href="/promos" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-promos"
              >
                PROMOS
              </Link>
              <Link 
                href="/account" 
                className="text-green-200 hover:text-white transition-colors duration-200 text-sm font-medium"
                data-testid="mobile-nav-account"
              >
                MY ACCOUNT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
