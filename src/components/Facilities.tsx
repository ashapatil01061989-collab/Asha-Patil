import React from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Sparkles } from "lucide-react";

interface FacilitiesProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const Facilities: React.FC<FacilitiesProps> = ({ specialty, isDarkMode }) => {
  return (
    <section id="facilities" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-950/40 border-slate-900" : "bg-white border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              State-of-the-Art Infrastructure
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Clinic Highlights & Facilities
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Our medical suite is physically optimized for modern hygienic standards, patient ease-of-access, and comforting healthcare journeys.
            </p>
          </div>
        </ScrollReveal>

        {/* Facilities Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5">
          {specialty.facilities.map((facility, index) => (
            <StaggerItem
              key={index}
              variant="fade-up"
              className={`p-6 rounded-2xl border text-left transition-all duration-300 flex items-start gap-4 h-full ${
                isDarkMode
                  ? "bg-slate-900/60 border-slate-800/80 hover:border-sky-500/20 hover:bg-slate-900"
                  : "bg-white border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-300"
              }`}
            >
              {/* Icon Holder */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isDarkMode
                  ? "bg-emerald-950/30 border-transparent text-emerald-400"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600"
              }`}>
                <MedicalIcon name={facility.icon} className="w-5 h-5" />
              </div>

              {/* Text description */}
              <div className="flex flex-col">
                <h3 className={`font-display text-sm sm:text-base font-bold tracking-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {facility.title}
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${
                  isDarkMode ? "text-slate-400" : "text-gray-500"
                }`}>
                  {facility.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
};
