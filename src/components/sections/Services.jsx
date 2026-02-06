// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// // ✅ COMPLETE SERVICE DATA
// const serviceData = [
//   // MAINTENANCE SERVICES
//   {
//     id: 1,
//     name: "Pre-owned Car Sales",
//     description:
//       "Curated selection of premium pre-owned luxury vehicles with full inspection and warranty.",
//     price: 49999,
//     timeTaken: "In Stock",
//     category: "Sales",
//     popular: true,
//     includes: [
//       "360° inspection",
//       "7-day return policy",
//       "1-year warranty",
//       "Financing available",
//     ],
//   },
//   {
//     id: 2,
//     name: "Vehicle Restoration",
//     description:
//       "Expert restoration bringing classic and luxury vehicles back to pristine condition.",
//     price: 2500,
//     timeTaken: "2-4 weeks",
//     category: "Restoration",
//     popular: true,
//     includes: [
//       "Paint correction",
//       "Interior reconditioning",
//       "Mechanical overhaul",
//       "Certification",
//     ],
//   },
//   {
//     id: 3,
//     name: "Premium Detailing",
//     description:
//       "Showroom-quality detailing using professional-grade products and techniques.",
//     price: 299,
//     timeTaken: "4-6 hours",
//     category: "Detailing",
//     includes: [
//       "Clay bar treatment",
//       "Ceramic coating",
//       "Engine bay cleaning",
//       "Glass polishing",
//     ],
//   },
//   {
//     id: 4,
//     name: "Repair & Servicing",
//     description:
//       "Comprehensive repair services by certified master technicians.",
//     price: 149,
//     timeTaken: "2-4 hours",
//     category: "Repair",
//     includes: [
//       "Diagnostic scan",
//       "OEM parts",
//       "Road test",
//       "Quality assurance",
//     ],
//   },
//   {
//     id: 5,
//     name: "Genuine Parts Sales",
//     description:
//       "OEM and premium aftermarket parts available on-site and online.",
//     price: "Varies",
//     timeTaken: "Same Day",
//     category: "Parts",
//     includes: [
//       "Nationwide shipping",
//       "Price matching",
//       "Technical support",
//       "Bulk discounts",
//     ],
//   },
// ];

// // const ServiceCarousel = () => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   // Auto-advance every 5 seconds
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentIndex((prev) => (prev + 1) % serviceData.length);
// //     }, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const goToSlide = (index) => {
// //     setCurrentIndex(index % serviceData.length);
// //   };

// //   const currentService = serviceData[currentIndex];

// //   return (
// //     <div className="relative max-w-6xl mx-auto px-4 py-20">
// //       {/* Main Slide */}
// //       <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl group mb-20">
// //         {/* Gradient Overlay */}
// //         <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/70 to-gray-900/90 z-10" />

// //         {/* Hero Image */}
// //         <div className="absolute inset-0">
// //           <div
// //             className="w-full h-full bg-gradient-to-br from-emerald-900 via-gray-900 to-black object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
// //             style={{
// //               backgroundImage: `url(/api/placeholder/1200/600?text=${currentService.category.replace("&", "%26").toUpperCase()})`,
// //             }}
// //           />
// //         </div>

// //         {/* Content */}
// //         <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-12 lg:p-20">
// //           <div className="max-w-2xl">
// //             {/* Category Badge */}
// //             <span
// //               className={`inline-block px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider mb-6 ${
// //                 currentService.popular
// //                   ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25"
// //                   : "bg-white/10 backdrop-blur-sm text-white/80 border border-white/20"
// //               }`}
// //             >
// //               {currentService.category}
// //             </span>

// //             {/* Title */}
// //             <h3 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6 leading-tight">
// //               {currentService.name}
// //             </h3>

// //             {/* Description */}
// //             <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
// //               {currentService.description}
// //             </p>

// //             {/* Price & Time */}
// //             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-12">
// //               <div className="text-center">
// //                 <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">
// //                   $
// //                   {typeof currentService.price === "number"
// //                     ? currentService.price.toLocaleString()
// //                     : currentService.price}
// //                 </div>
// //                 <div className="text-sm uppercase tracking-wider text-gray-400">
// //                   Starting From
// //                 </div>
// //               </div>
// //               <div className="text-center">
// //                 <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
// //                   {currentService.timeTaken}
// //                 </div>
// //                 <div className="text-sm uppercase tracking-wider text-gray-400">
// //                   Turnaround
// //                 </div>
// //               </div>
// //             </div>

// //             {/* CTA */}
// //             <Link
// //               to="/booking"
// //               className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300 inline-block"
// //             >
// //               <span>Book Service</span>
// //               <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Slide Indicators */}
// //         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
// //           {serviceData.map((_, idx) => (
// //             <button
// //               key={idx}
// //               onClick={() => goToSlide(idx)}
// //               className={`w-3 h-3 rounded-full transition-all duration-300 ${
// //                 idx === currentIndex
// //                   ? "w-12 bg-white shadow-lg scale-110"
// //                   : "bg-white/40 hover:bg-white/70"
// //               }`}
// //               aria-label={`Go to slide ${idx + 1}`}
// //             />
// //           ))}
// //         </div>

// //         {/* Navigation Arrows */}
// //         <button
// //           onClick={() => goToSlide(currentIndex - 1)}
// //           className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110 z-30 group/nav"
// //           aria-label="Previous slide"
// //         >
// //           <span className="text-white/90 group-hover/nav:text-white">‹</span>
// //         </button>
// //         <button
// //           onClick={() => goToSlide(currentIndex + 1)}
// //           className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110 z-30 group/nav"
// //           aria-label="Next slide"
// //         >
// //           <span className="text-white/90 group-hover/nav:text-white">›</span>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// const Services = () => {
//   const [activeCategory, setActiveCategory] = useState("All Services");

//   const categories = [
//     "All Services",
//     "Sales",
//     "Restoration",
//     "Detailing",
//     "Repair",
//     "Parts",
//   ];

//   const filteredServices =
//     activeCategory === "All Services"
//       ? serviceData
//       : serviceData.filter((service) => service.category === activeCategory);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//             Our Services
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Premium automotive solutions with transparent pricing and
//             world-class service
//           </p>
//         </div>
//       </div>

//       {/* Featured Service Carousel */}
//       <ServiceCarousel />

//       <div className="container mx-auto px-4 py-16 lg:py-24">
//         {/* Category Filter */}

//         {/* Why Choose Us Section */}

//         {/* CTA Section */}
//         <div className="mt-24 text-center bg-white/70 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-white/50">
//           <h2 className="text-4xl font-bold mb-6 text-gray-900">
//             Need Custom Service?
//           </h2>
//           <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
//             We offer specialized services tailored to your luxury vehicle.
//             Contact our experts.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <Link
//               to="/booking"
//               className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
//             >
//               Book Consultation
//             </Link>
//             <a
//               href="tel:+254722334455"
//               className="border-4 border-emerald-500 text-emerald-600 font-bold py-6 px-12 rounded-2xl text-xl bg-white hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
//             >
//               Call Now
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ✅ Enhanced Service Data with Professional Imagery
const serviceData = [
  {
    id: 1,
    name: "Premium Pre-owned Selection",
    description:
      "Curated inventory of certified pre-owned luxury vehicles with comprehensive inspection and warranty packages.",
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
    name: "Classic Vehicle Restoration",
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
    name: "Executive Detailing Suite",
    description:
      "Premium detailing service using advanced ceramic coatings and nano-technology for lasting protection.",
    price: 499,
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
    name: "Master Technician Servicing",
    description:
      "Comprehensive mechanical services performed by factory-trained technicians using diagnostic equipment.",
    price: 189,
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
    name: "Genuine Parts & Accessories",
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Professional auto-advance with pause on hover
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % serviceData.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + serviceData.length) % serviceData.length,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play with pause control
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentService = serviceData[currentIndex];

  return (
    <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16 px-4">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="hidden md:block w-8 h-0.5 bg-emerald-500"></div>
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
            Premium Services
          </span>
          <div className="hidden md:block w-8 h-0.5 bg-emerald-500"></div>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
          Exceptional Automotive Care
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Delivering premium automotive services with precision, transparency,
          and unwavering commitment to excellence
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative group bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl overflow-hidden border border-gray-100"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Progress Indicator - Desktop Only */}
        <div className="hidden md:block absolute top-0 left-0 right-0 h-1 bg-gray-100 z-20">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-100 ease-linear"
            style={{
              width: `${(currentIndex / (serviceData.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[650px]">
          {/* Left Column - Visual Content (Mobile: Top, Desktop: Left) */}
          <div className="relative overflow-hidden order-1 lg:order-1">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${currentService.image})`,
                transform: isAnimating ? "scale(1.05)" : "scale(1)",
              }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/80 lg:via-black/50 lg:to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-12">
              {/* Service Stats - Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
                {currentService.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Category & Controls - Bottom */}
              <div className="flex items-end justify-between mt-auto">
                {/* Category Badge */}
                <div className="flex flex-col">
                  <span
                    className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider mb-2 ${
                      currentService.popular
                        ? "bg-emerald-500/20 text-emerald-700 border border-emerald-500/30"
                        : "bg-white/10 backdrop-blur-sm text-white/90 border border-white/20"
                    }`}
                  >
                    {currentService.category}
                  </span>
                  {/* Slide Indicator - Mobile */}
                  <div className="flex items-center gap-2 text-white/70 lg:hidden">
                    <span className="text-sm font-medium">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs">/</span>
                    <span className="text-sm">
                      {String(serviceData.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex items-center gap-3 lg:hidden">
                  <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    aria-label="Previous service"
                  >
                    <svg
                      className="w-5 h-5"
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
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                    aria-label="Next service"
                  >
                    <svg
                      className="w-5 h-5"
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
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Service Details (Mobile: Bottom, Desktop: Right) */}
          <div className="p-6 md:p-8 lg:p-12 order-2 lg:order-2 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full">
              {/* Service Number & Title - Desktop */}
              <div className="hidden lg:flex items-center gap-4 mb-6">
                <div className="text-5xl font-black text-emerald-600">
                  {String(currentIndex + 1).padStart(2, "0")}
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {currentService.name}
                </h3>
              </div>

              {/* Service Title - Mobile */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 lg:hidden">
                {currentService.name}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                {currentService.description}
              </p>

              {/* Features Grid */}
              <div className="mb-10">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Service Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.includes.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm md:text-base">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Info */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Investment</div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {typeof currentService.price === "number"
                      ? `$${currentService.price.toLocaleString()}`
                      : currentService.price}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 md:p-6 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-2">Duration</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    {currentService.timeTaken}
                  </div>
                </div>
              </div>

              {/* Service Stats - Mobile */}
              <div className="grid grid-cols-3 gap-4 mb-10 lg:hidden bg-gray-50 rounded-xl p-4 border border-gray-200">
                {currentService.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-center hover:scale-105 transform"
                >
                  Schedule Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation & Controls */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 items-center gap-8">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:border-emerald-600 hover:text-emerald-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            aria-label="Previous service"
          >
            <svg
              className="w-6 h-6"
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

          {/* Slide Indicators */}
          <div className="flex gap-3">
            {serviceData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-emerald-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="w-12 h-12 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:border-emerald-600 hover:text-emerald-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            aria-label="Next service"
          >
            <svg
              className="w-6 h-6"
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

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Slide Counter - Desktop */}
        <div className="hidden lg:block absolute top-8 right-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">
              {String(serviceData.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6 lg:hidden">
        {serviceData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-emerald-600 w-6" : "bg-gray-300"
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
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="block text-white mb-2">Premium Automotive</span>
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Service Excellence
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Experience automotive care redefined with our comprehensive suite
              of premium services, delivered by certified experts using
              state-of-the-art technology
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-300">
                  Factory-Trained Technicians
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-300">Genuine OEM Parts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-300">5-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Service Carousel */}
      <ServiceCarousel />

      {/* Enhanced CTA Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative p-8 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Premium Service?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Our team of automotive experts is ready to provide personalized
              consultation and tailor-made solutions for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/booking"
                className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                Schedule Consultation
              </Link>
              <div className="flex flex-col items-center">
                <a
                  href="tel:+254722334455"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-2xl text-lg hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                >
                  Call +254 722 334 455
                </a>
                <p className="text-sm text-gray-400 mt-3">
                  Available 24/7 for emergencies
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
