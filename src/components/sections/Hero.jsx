import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Button, Badge } from "../ui";

const slides = [
  {
    id: 1,
    badge: "Certified Experts",
    title: "Precision",
    highlight: "Tire",
    subtitle: "Rotation & Alignment",
    description:
      "Ensure a smooth ride and extend the life of your tires with our high-precision laser alignment technology.",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Expert Service",
    title: "Complete",
    highlight: "Engine",
    subtitle: "Diagnostics",
    description:
      "State-of-the-art diagnostic equipment to identify and resolve any engine issues quickly and accurately.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "Quality Parts",
    title: "Premium",
    highlight: "Brake",
    subtitle: "Service",
    description:
      "Trust your safety to our certified technicians using only OEM and premium aftermarket brake components.",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=2080&auto=format&fit=crop",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleViewServices = (e) => {
    e.preventDefault();

    // If not on homepage, navigate to homepage first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        scrollToServices();
      }, 300);
    } else {
      scrollToServices();
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      const headerOffset = 112;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl">
          <Badge className="mb-6">{slide.badge}</Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {slide.title}{" "}
            <span className="text-primary">{slide.highlight}</span>
            <br />
            {slide.subtitle}
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-md">
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/booking">
              <Button
                icon={<Calendar className="w-4 h-4" />}
                iconPosition="left"
              >
                Book Now
              </Button>
            </Link>
            <a href="#services" onClick={handleViewServices}>
              <Button variant="secondary">View Services</Button>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
