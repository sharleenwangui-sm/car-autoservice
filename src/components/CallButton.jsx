import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function EmergencyButton() {
  return (
    <Link to="/emergency-towing" className="fixed bottom-6 right-6 z-50 group">
      <div className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105 animate-pulse-slow">
        <div className="relative">
          <MapPin className="w-6 h-6 animate-bounce" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        </div>
        <div className="flex flex-col items-start">
          <span className="font-bold text-sm leading-tight">Call Us Now</span>
          <span className="text-xs opacity-90">
            Need Help? Call Us and Our Agent will be with you.
          </span>
        </div>
      </div>
    </Link>
  );
}
