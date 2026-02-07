import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 8 + 7; // 7-15%
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsVisible(false), 300);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-6">
        {/* Logo Container */}
        <div className="relative mb-8 sm:mb-12">
          <img
            src="new-akwaaba-logo.png"
            alt="Akwaaba Auto"
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
          />
        </div>

        {/* Loading Progress Bar Only - Centered */}
        <div className="w-full max-w-xs sm:max-w-sm mb-8 sm:mb-12">
          {/* Progress Bar */}
          <div className="relative w-full">
            {/* Background track */}
            <div className="h-2 sm:h-3 bg-gray-700 rounded-full overflow-hidden">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Big Branding Text - Centered and Responsive */}
        <div className="text-center">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider uppercase mb-2">
            AKWAABA
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-emerald-400 tracking-wider uppercase">
            AUTO
          </div>
        </div>
      </div>
    </div>
  );
}
