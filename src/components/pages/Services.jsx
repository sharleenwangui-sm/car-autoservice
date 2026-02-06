import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ EXPANDED SERVICE DATA - Comprehensive car services
const serviceData = [
  // MAINTENANCE SERVICES
  {
    id: 1,
    name: "Oil Change",
    description: "Complete synthetic oil change with filter replacement",
    price: 49,
    timeTaken: "30 min",
    category: "Maintenance",
    popular: true,
    includes: [
      "Up to 5 quarts synthetic oil",
      "New oil filter",
      "Visual inspection",
      "Fluid level check",
    ],
  },
  {
    id: 2,
    name: "Full Service Package",
    description: "Comprehensive vehicle maintenance and inspection",
    price: 129,
    timeTaken: "90 min",
    category: "Maintenance",
    popular: true,
    includes: [
      "Oil & filter change",
      "Tire rotation & balance",
      "Brake inspection",
      "Multi-point inspection",
      "Fluid top-ups",
    ],
  },
  {
    id: 3,
    name: "Air Filter Replacement",
    description: "Engine and cabin air filter replacement",
    price: 39,
    timeTaken: "20 min",
    category: "Maintenance",
    includes: [
      "Engine air filter",
      "Cabin air filter",
      "Filter housing cleaning",
    ],
  },
  {
    id: 4,
    name: "Battery Service",
    description: "Battery testing, cleaning, and replacement if needed",
    price: 45,
    timeTaken: "30 min",
    category: "Maintenance",
    includes: [
      "Battery load test",
      "Terminal cleaning",
      "Corrosion prevention",
      "Charging system check",
    ],
  },
  {
    id: 5,
    name: "Coolant Flush",
    description: "Complete cooling system flush and refill",
    price: 89,
    timeTaken: "45 min",
    category: "Maintenance",
    includes: [
      "System flush",
      "New coolant",
      "Pressure test",
      "Hose inspection",
    ],
  },

  // BRAKE SERVICES
  {
    id: 6,
    name: "Brake Inspection",
    description: "Complete brake system inspection and report",
    price: 29,
    timeTaken: "45 min",
    category: "Brakes",
    includes: [
      "Pads & rotors check",
      "Fluid levels",
      "Caliper inspection",
      "Detailed report",
    ],
  },
  {
    id: 7,
    name: "Brake Pad Replacement",
    description: "Front or rear brake pad replacement with quality pads",
    price: 159,
    timeTaken: "2 hours",
    category: "Brakes",
    popular: true,
    includes: [
      "Premium brake pads",
      "Rotor resurfacing",
      "Caliper lubrication",
      "Test drive",
    ],
  },
  {
    id: 8,
    name: "Brake Fluid Flush",
    description: "Complete brake fluid replacement for optimal performance",
    price: 79,
    timeTaken: "45 min",
    category: "Brakes",
    includes: [
      "Old fluid removal",
      "DOT 4 brake fluid",
      "System bleeding",
      "Leak inspection",
    ],
  },
  {
    id: 9,
    name: "Complete Brake Service",
    description: "Full brake system overhaul with rotors and pads",
    price: 349,
    timeTaken: "3 hours",
    category: "Brakes",
    includes: [
      "New pads & rotors",
      "Caliper service",
      "Fluid flush",
      "Hardware replacement",
      "Road test",
    ],
  },

  // TIRE SERVICES
  {
    id: 10,
    name: "Tire Rotation",
    description: "Professional tire rotation for even wear",
    price: 25,
    timeTaken: "20 min",
    category: "Tires",
    includes: [
      "4-wheel rotation",
      "Pressure check",
      "Wear inspection",
      "Torque verification",
    ],
  },
  {
    id: 11,
    name: "Wheel Alignment",
    description: "High-precision laser wheel alignment",
    price: 89,
    timeTaken: "60 min",
    category: "Tires",
    popular: true,
    includes: [
      "Laser alignment",
      "Suspension inspection",
      "Tire wear analysis",
      "Steering adjustment",
    ],
  },
  {
    id: 12,
    name: "Tire Balance",
    description: "Professional wheel balancing for smooth ride",
    price: 49,
    timeTaken: "30 min",
    category: "Tires",
    includes: [
      "4-wheel balance",
      "Weight installation",
      "Vibration check",
      "Rim inspection",
    ],
  },
  {
    id: 13,
    name: "Flat Tire Repair",
    description: "Quick and reliable tire puncture repair",
    price: 25,
    timeTaken: "30 min",
    category: "Tires",
    includes: [
      "Leak detection",
      "Patch or plug",
      "Pressure adjustment",
      "Safety inspection",
    ],
  },
  {
    id: 14,
    name: "New Tire Installation",
    description: "Professional tire mounting and balancing",
    price: 79,
    timeTaken: "45 min",
    category: "Tires",
    includes: [
      "Tire mounting",
      "Balancing",
      "Valve stem replacement",
      "Disposal of old tires",
    ],
  },

  // ENGINE SERVICES
  {
    id: 15,
    name: "Engine Diagnostic",
    description: "Comprehensive computer diagnostic scan",
    price: 99,
    timeTaken: "60 min",
    category: "Engine",
    popular: true,
    includes: [
      "OBD-II scan",
      "Error code analysis",
      "Sensor testing",
      "Detailed report",
    ],
  },
  {
    id: 16,
    name: "Spark Plug Replacement",
    description: "High-quality spark plug installation",
    price: 89,
    timeTaken: "45 min",
    category: "Engine",
    includes: [
      "Premium spark plugs",
      "Ignition system check",
      "Coil inspection",
      "Performance test",
    ],
  },
  {
    id: 17,
    name: "Timing Belt Replacement",
    description: "Critical timing belt service with water pump",
    price: 549,
    timeTaken: "4 hours",
    category: "Engine",
    includes: [
      "New timing belt",
      "Water pump replacement",
      "Tensioner & pulleys",
      "Seal replacement",
    ],
  },
  {
    id: 18,
    name: "Fuel System Cleaning",
    description: "Deep cleaning of fuel injectors and system",
    price: 129,
    timeTaken: "90 min",
    category: "Engine",
    includes: [
      "Injector cleaning",
      "Fuel filter replacement",
      "Throttle body service",
      "Performance restoration",
    ],
  },
  {
    id: 19,
    name: "Engine Tune-Up",
    description: "Complete engine performance optimization",
    price: 199,
    timeTaken: "2 hours",
    category: "Engine",
    includes: [
      "Spark plug replacement",
      "Filter changes",
      "Fluid top-ups",
      "Computer optimization",
      "Test drive",
    ],
  },

  // TRANSMISSION SERVICES
  {
    id: 20,
    name: "Transmission Fluid Change",
    description: "Fresh transmission fluid for smooth shifting",
    price: 149,
    timeTaken: "60 min",
    category: "Transmission",
    includes: [
      "Fluid drain & fill",
      "Filter replacement",
      "Pan gasket",
      "Road test",
    ],
  },
  {
    id: 21,
    name: "Transmission Flush",
    description: "Complete transmission system flush",
    price: 199,
    timeTaken: "90 min",
    category: "Transmission",
    popular: true,
    includes: [
      "Complete flush",
      "New fluid",
      "Filter service",
      "System inspection",
    ],
  },
  {
    id: 22,
    name: "Clutch Replacement",
    description: "Manual transmission clutch service",
    price: 899,
    timeTaken: "6 hours",
    category: "Transmission",
    includes: [
      "New clutch kit",
      "Flywheel resurfacing",
      "Slave cylinder check",
      "Test drive",
    ],
  },

  // ELECTRICAL SERVICES
  {
    id: 23,
    name: "Alternator Testing",
    description: "Charging system diagnostic and testing",
    price: 49,
    timeTaken: "30 min",
    category: "Electrical",
    includes: [
      "Output testing",
      "Belt inspection",
      "Battery check",
      "Voltage regulation test",
    ],
  },
  {
    id: 24,
    name: "Starter Replacement",
    description: "Professional starter motor replacement",
    price: 299,
    timeTaken: "2 hours",
    category: "Electrical",
    includes: [
      "New starter motor",
      "Solenoid check",
      "Electrical connections",
      "System test",
    ],
  },
  {
    id: 25,
    name: "Check Engine Light",
    description: "Diagnostic and repair for engine warning lights",
    price: 89,
    timeTaken: "60 min",
    category: "Electrical",
    popular: true,
    includes: [
      "Code reading",
      "Issue diagnosis",
      "Repair estimate",
      "Code clearing",
    ],
  },

  // AC & HEATING
  {
    id: 26,
    name: "AC Recharge",
    description: "Air conditioning refrigerant recharge",
    price: 99,
    timeTaken: "45 min",
    category: "Climate",
    popular: true,
    includes: [
      "Refrigerant refill",
      "Leak check",
      "Pressure test",
      "Performance check",
    ],
  },
  {
    id: 27,
    name: "AC System Service",
    description: "Complete air conditioning system maintenance",
    price: 149,
    timeTaken: "90 min",
    category: "Climate",
    includes: [
      "System evacuation",
      "Leak detection",
      "Refrigerant recharge",
      "Compressor check",
    ],
  },
  {
    id: 28,
    name: "Heater Core Flush",
    description: "Heating system cleaning and optimization",
    price: 79,
    timeTaken: "60 min",
    category: "Climate",
    includes: [
      "Core flushing",
      "Thermostat check",
      "Hose inspection",
      "Heat output test",
    ],
  },

  // SUSPENSION & STEERING
  {
    id: 29,
    name: "Suspension Inspection",
    description: "Complete suspension system check",
    price: 59,
    timeTaken: "45 min",
    category: "Suspension",
    includes: [
      "Shock absorber test",
      "Strut inspection",
      "Bushing check",
      "Detailed report",
    ],
  },
  {
    id: 30,
    name: "Shock/Strut Replacement",
    description: "Professional suspension component replacement",
    price: 499,
    timeTaken: "3 hours",
    category: "Suspension",
    includes: [
      "Premium shocks/struts",
      "Mounting hardware",
      "Alignment check",
      "Test drive",
    ],
  },
  {
    id: 31,
    name: "Power Steering Flush",
    description: "Power steering fluid replacement",
    price: 89,
    timeTaken: "45 min",
    category: "Suspension",
    includes: [
      "Fluid exchange",
      "System flush",
      "Leak inspection",
      "Pump check",
    ],
  },

  // DETAILING & APPEARANCE
  {
    id: 32,
    name: "Express Wash",
    description: "Quick exterior wash and dry",
    price: 15,
    timeTaken: "15 min",
    category: "Detailing",
    includes: ["Exterior wash", "Hand dry", "Tire shine", "Window clean"],
  },
  {
    id: 33,
    name: "Interior Detailing",
    description: "Deep interior cleaning and restoration",
    price: 129,
    timeTaken: "2 hours",
    category: "Detailing",
    popular: true,
    includes: [
      "Vacuum & shampoo",
      "Dashboard treatment",
      "Window cleaning",
      "Odor elimination",
    ],
  },
  {
    id: 34,
    name: "Full Detail Package",
    description: "Complete interior and exterior detailing",
    price: 249,
    timeTaken: "4 hours",
    category: "Detailing",
    includes: [
      "Exterior wash & wax",
      "Interior deep clean",
      "Engine bay cleaning",
      "Paint protection",
    ],
  },

  // SAFETY & INSPECTION
  {
    id: 35,
    name: "Pre-Purchase Inspection",
    description: "Comprehensive vehicle evaluation before buying",
    price: 149,
    timeTaken: "90 min",
    category: "Inspection",
    includes: [
      "Complete inspection",
      "Test drive",
      "Detailed report",
      "Photo documentation",
    ],
  },
  {
    id: 36,
    name: "Safety Inspection",
    description: "Full safety system check",
    price: 79,
    timeTaken: "60 min",
    category: "Inspection",
    includes: [
      "Brake system",
      "Lights & signals",
      "Tire condition",
      "Safety compliance",
    ],
  },
];

const categories = [
  "Maintenance",
  "Brakes",
  "Tires",
  "Engine",
  "Transmission",
  "Electrical",
  "Climate",
  "Suspension",
  "Detailing",
  "Inspection",
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("All Services");

  const filteredServices =
    activeCategory === "All Services"
      ? serviceData
      : serviceData.filter((service) => service.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Dark Background */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Car Services</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Professional automotive services with transparent pricing and
            quality guarantees. Certified experts ready to service your vehicle.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Service Categories Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {["All Services", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-emerald-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-bold text-emerald-600">
              {filteredServices.length}
            </span>{" "}
            {filteredServices.length === 1 ? "service" : "services"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.name}
                  </h3>
                  {service.popular && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 min-h-[3rem]">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mb-5">
                  <div>
                    <span className="text-3xl font-bold text-emerald-600">
                      ${service.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">+ tax</span>
                  </div>
                  <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">{service.timeTaken}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="inline-block bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-1.5 rounded-full">
                    {service.category}
                  </span>
                </div>

                <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link
                    to="/booking"
                    className="flex-1 bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    Book Now
                  </Link>
                  <button className="px-5 py-3.5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 font-semibold text-gray-700">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Why Choose Akwaaba Auto?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                36+
              </div>
              <div className="text-gray-200 font-medium">
                Professional Services
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                24/7
              </div>
              <div className="text-gray-200 font-medium">
                Roadside Assistance
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-emerald-400 mb-2">
                100%
              </div>
              <div className="text-gray-200 font-medium">Quality Guarantee</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Don't See What You Need?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer many more specialized services. Contact us to discuss your
            vehicle's specific needs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contact"
              className="bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-emerald-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
            </Link>
            <a
              href="tel:+1234567890"
              className="bg-white border-2 border-emerald-500 text-emerald-600 font-bold py-4 px-8 rounded-xl hover:bg-emerald-50 transition-colors duration-300"
            >
              Call: (123) 456-7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
