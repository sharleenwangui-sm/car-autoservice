import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ✅ Enhanced Service Data with Professional Imagery
const serviceData = [
  {
    id: 1,
    name: "Pre-owned Car Sales",
    description: "Wide selection of high-quality pre-owned vehicles",
    "Focus on luxury, executive, and performance cars.":
      "Verified vehicle history and inspection for trust and transparency.",
    price: "Varies",
    timeTaken: "Available Now",
    category: "Luxury Sales",
    popular: true,
    includes: [
      "360° multi-point inspection",
      "Certified pre-owned warranty",
      "Transparent vehicle history",
      "Flexible financing options",
    ],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Inspection Points", value: "150+" },
      { label: "Certified Units", value: "85+" },
      { label: "Customer Rating", value: "4.9/5" },
    ],
  },
  {
    id: 2,
    name: "Classic Car Restoration",
    description:
      "Expert restoration services for vintage and luxury vehicles, preserving heritage while ensuring modern reliability.",

    price: "Custom Quote",
    timeTaken: "4-8 Weeks",
    category: "Restoration",
    popular: true,
    includes: [
      "Authentic parts sourcing",
      "Hand-crafted finishing",
      "Mechanical modernization",
      "Concours-level detailing",
    ],
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Projects Completed", value: "240+" },
      { label: "Client Satisfaction", value: "98%" },
      { label: "Awards Won", value: "12" },
    ],
  },
  {
    id: 3,
    name: "Car Executive Detailing",
    description:
      "Premium detailing service using advanced ceramic coatings and nano-technology for lasting protection.",

    price: "$499",
    timeTaken: "6-8 Hours",
    category: "Detailing",
    includes: [
      "Ceramic pro coating",
      "Paint correction",
      "Leather rejuvenation",
      "Lifetime warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1566475013539-6eaa03b7c425?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Protection Years", value: "5+" },
      { label: "Detail Masters", value: "8" },
      { label: "Repeat Clients", value: "92%" },
    ],
  },
  {
    id: 4,
    name: "Car Repair & Servicing",
    description: "Full-service garage in Ghana with certified technicians.",
    "Diagnostics, mechanical and electrical repairs, preventive maintenance, and upgrades.":
      "Comprehensive care for all makes and models with a focus on quality and transparency.",
    price: "$189",
    timeTaken: "3-5 Hours",
    category: "Service",
    includes: [
      "Advanced diagnostics",
      "Genuine OEM parts",
      "Digital service report",
      "12-month warranty",
    ],
    image:
      "https://images.unsplash.com/photo-1563720223485-8d6d5c5c8c8e?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Certified Techs", value: "15+" },
      { label: "First-Time Fix Rate", value: "96%" },
      { label: "Diagnostic Tools", value: "40+" },
    ],
  },
  {
    id: 5,
    name: "Genuine Car Parts & Accessories (Onsite & Online)",
    description:
      "Authorized distributor of OEM and performance parts with nationwide same-day shipping options.",

    price: "Request Quote",
    timeTaken: "Same Day",
    category: "Parts",
    includes: [
      "OEM certification",
      "Same-day shipping",
      "Installation support",
      "Price match guarantee",
    ],
    image:
      "https://images.unsplash.com/photo-1554672408-730436b60dde?auto=format&fit=crop&w=1600&q=80",
    stats: [
      { label: "Parts Catalog", value: "50K+" },
      { label: "Same-Day Ship", value: "99%" },
      { label: "OEM Partnerships", value: "25+" },
    ],
  },
];

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const currentService = serviceData[currentIndex];

  // Simplified navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % serviceData.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + serviceData.length) % serviceData.length,
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-play with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isAnimating, nextSlide]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
      {/* Section Header - Simplified */}
      <div className="text-center mb-10 md:mb-12">
        <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3 block">
          Our Premium Services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Exceptional Automotive Care
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
          Professional services delivered with precision and excellence
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Service Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 min-h-[280px] md:min-h-[320px] flex flex-col justify-between transition-all duration-300">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs md:text-sm font-semibold rounded-full">
              {currentService.category}
            </span>
          </div>

          {/* Service Content */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentService.name}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {currentService.description}
            </p>
          </div>

          {/* Price & Time */}
          <div className="flex flex-wrap gap-3 md:gap-4 mb-6">
            <div className="flex-1 min-w-[120px] bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="text-xs text-gray-500 mb-1">Price</div>
              <div className="text-base md:text-lg font-bold text-gray-900">
                {currentService.price}
              </div>
            </div>
            <div className="flex-1 min-w-[120px] bg-gray-50 rounded-lg p-3 md:p-4">
              <div className="text-xs text-gray-500 mb-1">Duration</div>
              <div className="text-base md:text-lg font-bold text-gray-900">
                {currentService.timeTaken}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to="/booking"
            className="block w-full text-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base"
          >
            Book This Service
          </Link>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
          aria-label="Previous service"
        >
          {/* <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" /> */}
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
          aria-label="Next service"
        >
          {/* <ChevronRight className="w-5 h-5 md:w-6 md:h-6" /> */}
        </button>
      </div>

      {/* Mobile Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {serviceData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-emerald-600" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div
      id="services"
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section - Simplified */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Premium Automotive Services
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-base md:text-lg">
            Expert care for your vehicle with certified technicians and genuine
            parts
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm">Certified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm">Genuine Parts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm">5-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <ServiceCarousel />

      {/* CTA Section - Simplified */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience Premium Service?
          </h2>
          <p className="mb-8 text-emerald-50 max-w-2xl mx-auto">
            Contact our team for personalized consultation and scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+254722334455"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
