import { useState } from "react";
import { Phone, X, ChevronRight } from "lucide-react";

export function CallButton() {
  const [showPopup, setShowPopup] = useState(false);
  const phoneNumber = "+254722334455"; // Your company number

  const handleCall = () => {
    setShowPopup(true);
  };

  const confirmCall = () => {
    window.location.href = `tel:${phoneNumber}`;
    setShowPopup(false);
  };

  return (
    <>
      {/* Main Button - Replace your fixed div snippet */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleCall}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-6 py-4 rounded-2xl shadow-2xl hover:shadow-emerald/25 transition-all duration-300 hover:scale-[1.05] border border-white/20 backdrop-blur-sm"
          aria-label="Call for roadside assistance"
        >
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-bold tracking-wide uppercase">
              Call Us Now
            </span>
            <span className="text-xs opacity-80 font-medium">
              24/7 Roadside Help
            </span>
          </div>
        </button>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPopup(false)}
          />
          <div className="fixed bottom-24 right-6 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 z-[60] animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  Call Akwaaba Auto
                </h3>
                <button
                  onClick={() => setShowPopup(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{phoneNumber}</p>
                  <p className="text-sm text-gray-600">
                    24/7 Roadside Assistance
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={confirmCall}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
