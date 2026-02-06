import { Snowflake, Zap, Settings, ArrowRight } from "lucide-react";
import { Card, CardIcon, CardContent } from "../ui";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Snowflake,
    title: "Pre-owned car sales",
    description: "Wide selection of high-quality pre-owned vehicles",
    "Focus on luxury, executive, and performance cars ":
      "Verified vehicle history and inspection for trust and transparency",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Car Restoration",
    description: "Restoration of classic, vintage, and accident-damaged cars",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    icon: Settings,
    title: "Car Detailing",
    description: "Premium interior and exterior detailing.",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
  },
];

export function ServiceCards() {
  return (
    <section className="relative -mt-20 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6">
              <CardIcon className={service.iconBg}>
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </CardIcon>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {service.description}
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
              >
                Schedule Service
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
