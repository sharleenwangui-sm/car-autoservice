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
      <div className="flex flex-col items-center justify-center max-w-md mx-auto px-6">
        {/* Logo Container */}
        <div className="relative mb-12">
          <img
            src="new-akwaaba-logo.png"
            alt="Akwaaba Auto"
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
          />
        </div>

        {/* Loading Progress */}
        <div className="w-full space-y-8">
          {/* Progress Bar */}
          <div className="relative w-full">
            {/* Background track */}
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress percentage */}
            <div className="flex justify-end mt-3">
              <span className="text-lg font-bold text-white">{progress}%</span>
            </div>
          </div>

          {/* Loading dots animation */}
          <div className="flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-emerald-500"
                style={{
                  animation: `bounce 1.4s infinite ${i * 0.2}s`,
                  opacity: progress > i * 33 ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
        {/* Branding text */}
        <div className="mt-12 text-base sm:text-lg md:text-xl text-gray-300 tracking-[0.3em] font-bold uppercase">
          AKWAABA AUTO
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% { 
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
