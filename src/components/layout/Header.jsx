import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui";

const navLinks = [
  { name: "Services", href: "/services", type: "route" },
  { name: "About Us", href: "#about", type: "scroll" },
  { name: "Testimonials", href: "#testimonials", type: "scroll" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, link) => {
    if (link.type === "scroll") {
      e.preventDefault();

      // If not on homepage, navigate to homepage first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(link.href);
        }, 100);
      } else {
        // Already on homepage, just scroll
        scrollToSection(link.href);
      }

      setIsMenuOpen(false);
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/akwaaba-logo-cropped.png"
              alt="Akwaaba Auto"
              className="h-16 w-auto sm:h-18 lg:h-20 transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ),
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/booking">
              <Button size="sm">Book Appointment</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-gray-600 hover:text-emerald-600 transition-colors font-medium cursor-pointer"
                  >
                    {link.name}
                  </a>
                ),
              )}
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                <Button className="mt-2 w-full">Book Appointment</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
