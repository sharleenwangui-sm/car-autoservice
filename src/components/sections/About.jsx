import {
  Users,
  FileText,
  Clock,
  Shield,
  Globe,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import { SectionTitle } from "../ui";

const stats = [
  { value: "15k+", label: "Repairs Done" },
  { value: "99%", label: "Happy Clients" },
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To redefine the automotive experience by delivering luxury, quality, and innovation in every service from car sales to aftercare while building lasting relationships with our customers worldwide.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To become a leading global automotive brand recognized for excellence in pre-owned car sales, restoration, and customer service, while bridging the gap between local markets and international automotive standards.",
  },
  {
    icon: Globe,
    title: "Our Reach",
    text: "Headquartered in the USA with a state-of-the-art service center in Ghana and operational hubs across the USA, Canada, and the UK.",
  },
  {
    icon: Heart,
    title: "Our Promise",
    text: "A customer-centric approach, providing tailored solutions for individual owners, collectors, and businesses through both physical and seamless digital experiences.",
  },
];

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle
              title="Redefining Automotive Excellence"
              highlight="Akwaaba Auto"
            />
            <p className="mt-6 text-gray-600">
              Akwaaba Auto is a high-end automotive solutions provider
              specializing in pre-owned luxury vehicles, comprehensive
              restoration, detailing, repair, and global car parts distribution.
              We combine world-class engineering, skilled craftsmanship, and a
              customer-centric philosophy to deliver an unparalleled automotive
              experience across the USA, Canada, UK, and Ghana.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Core Services & Expertise */}

        {/* Closing Note */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 italic">
            Driven by a leadership team with decades of excellence in aerospace,
            defense, and global entrepreneurship, Akwaaba Auto is your trusted
            partner in automotive luxury, innovation, and reliability.
          </p>
        </div>
      </div>
    </section>
  );
}
