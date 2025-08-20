export default function Footer() {
  const footerSections = [
    {
      title: "Care Management",
      links: [
        { name: "Care Flows", href: "#" },
        { name: "Patient Portal", href: "#" },
        { name: "Medication Management", href: "#" },
        { name: "Appointment Scheduling", href: "#" }
      ]
    },
    {
      title: "Healthcare Tools",
      links: [
        { name: "Clinical Documentation", href: "#" },
        { name: "Lab Integration", href: "#" },
        { name: "Pharmacy Connect", href: "#" },
        { name: "Telehealth Platform", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Training Resources", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Contact Support", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Compliance", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-black bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-3">{section.title}</h4>
              <ul className="space-y-2 text-sm text-teal-200">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="hover:text-white transition-colors duration-200"
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white border-opacity-10 mt-8 pt-8 text-center">
          <p className="text-teal-200 text-sm">
            &copy; 2024 CareFlow Healthcare Management. All rights reserved. HIPAA Compliant.
          </p>
        </div>
      </div>
    </footer>
  );
}
