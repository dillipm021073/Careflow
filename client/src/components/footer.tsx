import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Prepaid", href: "/load" },
        { name: "Postpaid", href: "/account" },
        { name: "Home WiFi", href: "#" },
        { name: "Smart Bro", href: "#" },
        { name: "Enterprise", href: "#" }
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "Load", href: "/load" },
        { name: "Promos", href: "/promos" },
        { name: "Track Order", href: "#" },
        { name: "Store Locator", href: "#" },
        { name: "Coverage Map", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Service Centers", href: "#" },
        { name: "Report Network Issue", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Smart", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News & Press", href: "#" },
        { name: "Investor Relations", href: "#" },
        { name: "Corporate", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-black text-white mt-auto">
      {/* Main Footer Content */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <img 
                src="/images/smart-logo.jpg" 
                alt="Smart" 
                className="h-8 mb-4"
              />
              <p className="text-gray-400 text-sm mb-4">
                The Philippines' leading wireless provider for mobile and internet services.
              </p>
              {/* Contact Info */}
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-400">Hotline:</span>{" "}
                  <span className="text-white font-semibold">*888</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-400">Email:</span>{" "}
                  <span className="text-white">customercare@smart.com.ph</span>
                </p>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-bold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href}>
                        <a 
                          className="text-gray-400 hover:text-smart-bright-green transition-colors text-sm"
                          data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {link.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-2 md:mb-0">
              © {currentYear} Smart Communications, Inc. All Rights Reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-smart-bright-green transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-smart-bright-green transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-smart-bright-green transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
