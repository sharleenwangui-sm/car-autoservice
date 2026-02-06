import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // More realistic loading simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Slower increments for more realistic feel
      const increment = Math.random() * 10 + 5; // 5-15%
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Immediately hide - no transition, no delay
        setIsVisible(false);
      }
    }, 150);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Don't render anything if not visible - instant removal from DOM
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">
      {/* Blurred car background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')`,
          filter: "blur(8px) brightness(0.4)",
          transform: "scale(1.1)", // Prevents blur edge artifacts
        }}
      />

      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-emerald-900/20 animate-pulse" />

      <div className="relative flex flex-col items-center max-w-xs z-10 px-6">
        {/* Logo with subtle shine effect */}
        <div className="relative mb-12">
          <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/30 to-emerald-500/30 blur-2xl rounded-full animate-pulse" />
          <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <img
              src="/akwaaba-logo-cropped.png"
              alt="Akwaaba Auto"
              className="w-20 h-20 opacity-95"
              onError={(e) => {
                // Fallback if logo fails to load
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-full space-y-6">
          {/* Progress bar with glow */}
          <div className="relative">
            <div className="h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-emerald-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Progress glow effect */}
            <div
              className="absolute top-0 h-2 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 rounded-full blur-md transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status text - with clear spacing */}
          <div className="flex justify-between items-center gap-4">
            <div className="text-sm text-gray-200 font-medium tracking-wide flex-1">
              {progress < 30 && "Loading Assets..."}
              {progress >= 30 && progress < 70 && "Processing Data..."}
              {progress >= 70 && progress < 95 && "Initializing System..."}
              {progress >= 95 && "Almost Ready..."}
            </div>
            <div className="text-lg font-bold text-white tabular-nums bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
              {progress}%
            </div>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                style={{
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                  opacity: progress > i * 33 ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom branding - with proper spacing */}
        <div className="mt-16 text-sm text-gray-300 tracking-widest font-light">
          AKWAABA AUTO SYSTEM
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(0.9); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
