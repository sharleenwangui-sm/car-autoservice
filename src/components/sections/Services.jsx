import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { serviceData } from "../data/service.js";

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
      {/* Section Header */}
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
      <div
        className="relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Service Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 min-h-[320px] md:min-h-[360px] flex flex-col justify-between transition-all duration-300">
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

          {/* CTA Button - FIXED */}
          <Link
            to="/booking"
            className="block w-full text-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors text-sm md:text-base active:scale-95"
          >
            Book This Service
          </Link>
        </div>

        {/* Navigation Arrows REMOVED */}
      </div>

      {/* Mobile Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {serviceData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? "bg-emerald-600 w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to service ${idx + 1}`}
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
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
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

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
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
