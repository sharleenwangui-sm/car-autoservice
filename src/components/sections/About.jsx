import { useState, useEffect, useRef } from "react";
import {
  Users,
  FileText,
  Clock,
  Shield,
  Globe,
  Target,
  Eye,
  Heart,
  TrendingUp,
  CheckCircle,
  Award,
  Star,
} from "lucide-react";
import { SectionTitle } from "../ui";

// Enhanced stats with progressive animation
const stats = [
  {
    value: "15k+",
    label: "Repairs Completed",
    description: "Professional automotive repairs with precision",
    icon: CheckCircle,
    color: "emerald",
    delay: 300,
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    description: "Consistently high satisfaction ratings",
    icon: Star,
    color: "amber",
    delay: 500,
  },
  {
    value: "10+",
    label: "Years Experience",
    description: "Decades of combined expertise",
    icon: Award,
    color: "blue",
    delay: 700,
  },
  {
    value: "500+",
    label: "Restorations",
    description: "Classic vehicles restored to perfection",
    icon: TrendingUp,
    color: "indigo",
    delay: 900,
  },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To redefine the automotive experience by delivering luxury, quality, and innovation in every service from car sales to aftercare while building lasting relationships with our customers worldwide.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become a leading global automotive brand recognized for excellence in pre-owned car sales, restoration, and customer service, while bridging the gap between local markets and international automotive standards.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    icon: Globe,
    title: "Our Reach",
    text: "Headquartered in the USA with a state-of-the-art service center in Ghana and operational hubs across the USA, Canada, and the UK.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Heart,
    title: "Our Promise",
    text: "A customer-centric approach, providing tailored solutions for individual owners, collectors, and businesses through both physical and seamless digital experiences.",
    gradient: "from-red-500 to-orange-600",
  },
];

// Progressive counter component
const ProgressiveCounter = ({ target, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericValue = parseInt(target.replace(/[^\d]/g, ""));
          const duration = 2000;
          const increment = Math.ceil(numericValue / (duration / 16));
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
              current = numericValue;
              clearInterval(timer);
            }
            setCount(current);
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="inline-block">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export function About() {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stats.forEach((stat, index) => {
            const numericValue = parseInt(stat.value.replace(/[^\d]/g, ""));
            const duration = 2000;
            const increment = Math.ceil(numericValue / (duration / 16));
            let current = 0;

            const interval = setInterval(() => {
              current += increment;
              if (current >= numericValue) {
                current = numericValue;
                clearInterval(interval);
              }
              setAnimatedValues((prev) => {
                const newValues = [...prev];
                newValues[index] = current;
                return newValues;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
          <div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-emerald-500"></div>
              <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
                About Our Legacy
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">Redefining</span>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Automotive Excellence
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-lg text-gray-600 leading-relaxed">
                Akwaaba Auto is a premier automotive solutions provider
                specializing in pre-owned luxury vehicles, comprehensive
                restoration, detailing, repair, and global parts distribution.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We combine world-class engineering, skilled craftsmanship, and a
                customer-centric philosophy to deliver an unparalleled
                automotive experience across the USA, Canada, UK, and Ghana.
              </p>
            </div>
          </div>

          {/* Enhanced Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const numericValue = parseInt(stat.value.replace(/[^\d]/g, ""));
              const suffix = stat.value.replace(numericValue.toString(), "");

              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                    index === 0 ? "col-span-2 md:col-span-1" : ""
                  }`}
                  style={{
                    transitionDelay: `${stat.delay}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl bg-${stat.color}-50 border border-${stat.color}-100`}
                    >
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-3xl md:text-4xl font-bold text-${stat.color}-600`}
                        >
                          <ProgressiveCounter
                            target={stat.value}
                            suffix={suffix}
                            delay={stat.delay}
                          />
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mt-2">
                        {stat.label}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {stat.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-full transition-all duration-2000`}
                      style={{
                        width: `${(animatedValues[index] / numericValue) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-blue-500"></div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Our Philosophy
              </span>
              <div className="w-8 h-0.5 bg-blue-500"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guiding Principles That Drive Us
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence is built on a foundation of core
              values that shape every aspect of our operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-white rounded-2xl p-6 lg:p-8 border border-gray-200 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    <div className="relative p-4 rounded-xl bg-white border border-gray-100 group-hover:border-transparent transition-colors duration-300">
                      <Icon className="w-8 h-8 text-gray-700 group-hover:text-gray-900 transition-colors" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {item.text}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform translate-y-full group-hover:translate-y-0 transition-transform duration-500`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Expertise Section */}

        {/* Closing Note */}
        <div className="mt-16 lg:mt-24 text-center relative">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>

          <div className="relative bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-emerald-100">
            <div className="inline-block mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 italic max-w-4xl mx-auto leading-relaxed">
              "Driven by a legacy of excellence in aerospace, defense, and
              global entrepreneurship, Akwaaba Auto stands as your trusted
              partner in automotive luxury, innovation, and reliability."
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm font-medium text-gray-600">
                  Global Standards
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-gray-600">
                  Certified Excellence
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm font-medium text-gray-600">
                  Premium Service
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
