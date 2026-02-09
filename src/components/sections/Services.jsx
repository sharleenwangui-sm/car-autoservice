import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
// CORRECTED IMPORT PATH - Remove the .js extension
import { serviceData } from "../data/service.js";

// Navigation arrows component for better mobile responsiveness
const NavigationArrows = ({ onPrev, onNext, isAnimating }) => (
  <>
    <button
      onClick={onPrev}
      disabled={isAnimating}
      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 z-10"
      aria-label="Previous service"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      onClick={onNext}
      disabled={isAnimating}
      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 z-10"
      aria-label="Next service"
    >
      <svg
        className="w-5 h-5 md:w-6 md:h-6 text-gray-800"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </>
);

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;
  const currentService = serviceData[currentIndex];

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

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

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

      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[360px] flex flex-col justify-between transition-all duration-300">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs md:text-sm font-semibold rounded-full">
              {currentService.category}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {currentService.name}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              {currentService.description}
            </p>
          </div>

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

          <Link
            to={`/booking/${currentService.id}`}
            className="block w-full text-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base active:scale-95"
          >
            Schedule Service
          </Link>
        </div>

        <NavigationArrows
          onPrev={prevSlide}
          onNext={nextSlide}
          isAnimating={isAnimating}
        />
      </div>

      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {serviceData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-emerald-600 w-4" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="hidden lg:flex justify-center gap-2 mt-8">
        {serviceData.map((service, idx) => (
          <button
            key={service.id}
            onClick={() => goToSlide(idx)}
            className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
              idx === currentIndex ? "bg-emerald-50" : "hover:bg-gray-100"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-emerald-600" : "bg-gray-300"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                idx === currentIndex ? "text-emerald-700" : "text-gray-500"
              }`}
            >
              {service.name.split(" ")[0]}
            </span>
          </button>
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
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Premium Automotive Services
          </h1>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-base md:text-lg">
            Expert care for your vehicle with certified technicians and genuine
            parts
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs md:text-sm">Certified Technicians</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs md:text-sm">Genuine Parts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs md:text-sm">5-Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <ServiceCarousel />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Experience Premium Service?
          </h2>
          <p className="mb-8 text-emerald-50 max-w-2xl mx-auto text-sm md:text-base">
            Contact our team for personalized consultation and scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="px-6 md:px-8 py-3 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors active:scale-95 text-sm md:text-base"
            >
              Book Appointment
            </Link>

            <a
              href="tel:+254722334455"
              className="px-6 md:px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors active:scale-95 text-sm md:text-base"
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
