import { Link } from "react-router-dom";
import { Car, Globe, Share2, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "../ui";

const services = [
  "Brake Repair",
  "Engine Diagnostic",
  "Transmission Service",
  "Suspension & Steering",
  "HVAC Systems",
];

const quickLinks = [
  { name: "About Our Team", href: "#about" },
  { name: "Career Opportunities", href: "#" },
  { name: "Client Testimonials", href: "#testimonials" },
  { name: "Online Booking", href: "/booking" },
  { name: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/akwaaba-logo.svg"
                alt="Akwaaba Auto"
                className="w-10 h-10"
              />
              <span className="text-xl font-bold">AKWAABA AUTO</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Professional automotive care you can trust. Expert diagnostics,
              transparent pricing, and quality service for all your vehicle
              needs.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-dark hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-dark hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Get maintenance tips and exclusive offers.
            </p>
            <Input
              type="email"
              placeholder="Email address"
              icon={<ArrowRight className="w-4 h-4 text-secondary" />}
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Akwaaba Auto. All rights reserved. Tell: +(254) 722334455
            </p>
            <div className="flex items-center gap-6">
              <a
                href="tel:+254722334455"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                +(254) 722334455
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <MapPin className="w-4 h-4" />
                892 Motor Drive
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Towing Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/emergency"
          className="relative flex items-center gap-2 bg-primary hover:bg-primary-dark text-secondary font-semibold px-4 py-3 rounded-full shadow-lg transition-colors"
        >
          {/* Pulse ring effect */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
          <span className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-20" />

          <div className="relative w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="relative text-sm uppercase tracking-wider">
            Emergency Towing
          </span>
        </Link>
      </div>
    </footer>
  );
}
