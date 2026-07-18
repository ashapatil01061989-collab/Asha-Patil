import React, { useState, useEffect } from "react";
import { SPECIALTIES } from "../data";
import { Moon, Sun, Sparkles, X, Check, HeartPulse } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface DemoControllerProps {
  currentSpecialtyId: string;
  onSpecialtyChange: (id: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({
  currentSpecialtyId,
  onSpecialtyChange,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [constraints, setConstraints] = useState({ left: -300, right: 0, top: -600, bottom: 0 });

  // Dynamically calculate drag constraints relative to initial position (bottom-28 right-6)
  useEffect(() => {
    const updateConstraints = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // We want to restrict the ball within the visible screen
      // Initial position is at: right = 24px (6rem), bottom = 112px (28rem)
      setConstraints({
        left: -width + 80, // Allow dragging all the way to the left edge (minus padding)
        right: 0,          // Prevent dragging off the right edge
        top: -height + 180, // Allow dragging to the top edge (minus padding)
        bottom: 20,         // Small buffer at the bottom
      });
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  return (
    <>
      {/* Draggable Assistant Ball */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.05}
        dragConstraints={constraints}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        className="fixed bottom-28 right-6 z-45 pointer-events-auto cursor-grab touch-none select-none"
        title="Drag me anywhere! Tap to customize specialties."
      >
        <div className="relative group">
          {/* Outer Ring Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-emerald-500 to-sky-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
          
          <button
            onClick={() => setIsMenuOpen(true)}
            onPointerDown={(e) => e.stopPropagation()} // Stop drag interaction when clicking
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white shadow-2xl border-2 border-white/20 transition-transform duration-300 active:scale-95"
          >
            <Sparkles className="w-6 h-6 animate-spin-slow" />
            
            {/* Live active badge on the ball */}
            <span className="absolute -top-1 -left-1 flex h-4 min-w-4 px-1 rounded-full bg-rose-500 text-[8px] font-extrabold items-center justify-center border border-white text-white uppercase shadow">
              Live
            </span>
          </button>

          {/* Hover helper text */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900/90 dark:bg-slate-800/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block">
            Clinic Assistant
          </div>
        </div>
      </motion.div>

      {/* Compact Static Premium Customization Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Static Settings Modal Card (Ultra compact design) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="relative w-full max-w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-sky-100 dark:border-slate-800 overflow-hidden z-10 p-4 sm:p-5"
            >
              {/* Header (Very tight) */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sky-100 dark:bg-slate-800 rounded-xl text-sky-750 dark:text-sky-400 border border-sky-200/50 dark:border-transparent">
                    <HeartPulse className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      Assistant
                      <span className="text-[9px] bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded-full font-semibold">
                        Live Demo
                      </span>
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Close Controls"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Specialties Selector Grid (Compact) */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[9px] font-bold tracking-wider uppercase text-gray-400 dark:text-slate-500 block">
                  Select Demo Specialty
                </span>
                <div className="grid grid-cols-1 gap-1.5 max-h-[160px] overflow-y-auto pr-1 no-scrollbar">
                  {SPECIALTIES.map((spec) => {
                    const isActive = spec.id === currentSpecialtyId;
                    return (
                      <button
                        key={spec.id}
                        onClick={() => onSpecialtyChange(spec.id)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-sky-50/85 dark:bg-sky-950/35 border-sky-500 text-sky-900 dark:text-sky-100 font-semibold"
                            : "bg-gray-50/50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800/80 hover:bg-sky-50/30 dark:hover:bg-slate-800/60 text-gray-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{spec.specialtyName}</span>
                          <span className="text-[9px] text-gray-400 dark:text-slate-500 font-normal">
                            Dr. {spec.doctorName}
                          </span>
                        </div>
                        {isActive && (
                          <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-white shadow-sm">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles Panel */}
              <div className="border-t border-gray-100 dark:border-slate-800/60 pt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold text-gray-700 dark:text-slate-300">
                    Theme Color
                  </span>
                  <span className="text-[8px] text-gray-400 dark:text-slate-500">
                    Light or Dark style
                  </span>
                </div>
                
                {/* Compact Toggle Switcher */}
                <button
                  onClick={onToggleDarkMode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 transition-colors border border-gray-100 dark:border-slate-800 cursor-pointer text-[10px] font-medium"
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      <span>Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-sky-600" />
                      <span>Dark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full mt-4 py-2 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-semibold text-xs rounded-xl transition-all duration-300 shadow-md cursor-pointer"
              >
                Apply & Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
