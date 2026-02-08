import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui";

const navLinks = [
  { name: "Services", href: "#services", type: "scroll" },
  { name: "About Us", href: "#about", type: "scroll" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, link) => {
    if (link.type === "scroll") {
      e.preventDefault();

      // Close menu first
      setIsMenuOpen(false);

      // If not on homepage, navigate to homepage first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(link.href);
        }, 300);
      } else {
        // Already on homepage, wait for menu to close then scroll
        setTimeout(() => {
          scrollToSection(link.href);
        }, 100);
      }
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 112;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with selector ${href} not found`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/new-akwaaba-logo.png"
              alt="Akwaaba Auto"
              className="h-18 w-auto sm:h-20 lg:h-24 transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - More Spaced */}
          <nav className="hidden md:flex items-center gap-12 lg:gap-16">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-base lg:text-lg font-medium text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-base lg:text-lg font-medium text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ),
            )}
          </nav>

          {/* CTA Button - Larger */}
          <div className="hidden md:block">
            <Link to="/booking">
              <Button size="lg" className="px-6 py-3 text-base">
                Book Appointment
              </Button>
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
          <nav className="md:hidden py-6 border-t">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-600 hover:text-emerald-600 transition-colors font-medium text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="text-gray-600 hover:text-emerald-600 transition-colors font-medium text-base cursor-pointer"
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
