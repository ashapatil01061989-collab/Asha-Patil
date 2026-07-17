import React from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Clock, ArrowRight } from "lucide-react";

interface ServicesProps {
  specialty: SpecialtyData;
  onBookClick: () => void;
  isDarkMode: boolean;
}

export const Services: React.FC<ServicesProps> = ({ specialty, onBookClick, isDarkMode }) => {
  return (
    <section id="services" className={`py-16 sm:py-24 ${
      isDarkMode ? "bg-slate-900/40" : "bg-gray-50/40"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-4">
            <div className="text-left max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
                Clinical Care Specializations
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Our Premium Services
              </h2>
              <p className={`text-sm sm:text-base mt-3 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                Expert treatments and preventive programs customized exactly for your clinical needs, under the direct care of {specialty.doctorName}.
              </p>
            </div>
            <button
              onClick={onBookClick}
              className={`flex items-center gap-1.5 px-5 py-3 text-xs font-black rounded-xl transition-all duration-300 w-fit h-fit border cursor-pointer ${
                isDarkMode
                  ? "bg-slate-800 text-sky-300 border-transparent hover:bg-slate-700"
                  : "bg-sky-100 border-sky-200 text-sky-900 hover:bg-sky-600 hover:text-white hover:border-transparent shadow-sm"
              }`}
            >
              <span>Request custom pricing consult</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>

        {/* Services Responsive Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-5">
          {specialty.services.map((service, index) => (
            <StaggerItem
              key={index}
              variant="fade-up"
              className={`group relative p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left h-full ${
                isDarkMode
                  ? "bg-slate-900/80 border-slate-800 hover:border-sky-500/30 hover:bg-slate-900"
                  : "bg-white border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-300"
              }`}
            >
              <div>
                {/* Icon Circle */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 border ${
                  isDarkMode
                    ? "bg-slate-800 border-slate-700/50 text-sky-400"
                    : "bg-sky-50 border-sky-100 text-sky-600"
                }`}>
                  <MedicalIcon name={service.icon} className="w-5 h-5" />
                </div>

                {/* Service Title */}
                <h3 className={`font-display text-sm sm:text-base font-bold tracking-tight line-clamp-1 group-hover:text-sky-600 transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-xs mt-2.5 leading-relaxed line-clamp-3 ${
                  isDarkMode ? "text-slate-400" : "text-gray-500"
                }`}>
                  {service.desc}
                </p>
              </div>

              {/* Service Footer / Attributes */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800/50 flex flex-col gap-3">
                <div className="flex items-center justify-start text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>Duration: {service.duration}</span>
                  </div>
                </div>

                {/* Book this service slot */}
                <button
                  onClick={onBookClick}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer border ${
                    isDarkMode
                      ? "bg-slate-800/40 text-sky-400 border-slate-800/85 hover:bg-sky-600 hover:text-white"
                      : "bg-sky-100 border-sky-200 text-sky-900 hover:bg-sky-600 hover:text-white hover:border-transparent shadow-sm"
                  }`}
                >
                  <span>Select & Book Slot</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Dynamic Medical Specialties summary bar */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className={`mt-16 p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-6 text-left ${
            isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-emerald-50 border-emerald-200/50 shadow-xs"
          }`}>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-850 dark:text-emerald-300">
                Conditions Commonly Addressed
              </span>
              <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                {specialty.conditionsTreated.join(" • ")}
              </p>
            </div>
            <div className="h-px w-full md:h-10 md:w-px bg-gray-200 dark:bg-slate-800" />
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-850 dark:text-sky-300">
                Proactive Preventive Measures
              </span>
              <p className={`text-xs sm:text-sm font-semibold ${isDarkMode ? "text-slate-300" : "text-gray-700"}`}>
                {specialty.preventiveCare.join(" • ")}
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
