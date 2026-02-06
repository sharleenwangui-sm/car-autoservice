import { Car } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Car */}
        <div className="mb-8 relative">
          <div className="animate-bounce">
            <Car className="w-24 h-24 text-primary mx-auto" strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/30 rounded-full animate-pulse" />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
          AKWAABA AUTO
        </h1>
        <p className="text-gray-400 text-sm mb-8">Loading your experience...</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <p className="text-primary font-semibold mt-4 text-lg">{progress}%</p>
      </div>
    </div>
  );
}
