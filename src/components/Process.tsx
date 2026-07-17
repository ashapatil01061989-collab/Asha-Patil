import React from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Calendar, UserCheck, ShieldCheck, HeartPulse, ChevronRight, ArrowDown } from "lucide-react";

interface ProcessProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const Process: React.FC<ProcessProps> = ({ specialty, isDarkMode }) => {
  const steps = [
    {
      step: "01",
      title: "Book Slot Online",
      desc: "Reserve your consultation time through our responsive calendar booking system in 60 seconds.",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-sky-500 to-sky-600",
      type: "sky"
    },
    {
      step: "02",
      title: "Visit Our Suite",
      desc: "Arrive at our relaxing, HEPA-filtered clinic space with pre-assigned free front desk parking.",
      icon: <UserCheck className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-600",
      type: "emerald"
    },
    {
      step: "03",
      title: "Direct MD Consult",
      desc: "Receive a detailed diagnostic physical and lifestyle audit directly from Dr. Specialties.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "from-sky-600 to-sky-700",
      type: "sky"
    },
    {
      step: "04",
      title: "Proactive Follow-up",
      desc: "Access your secure digital prescription and leverage continuous messaging support.",
      icon: <HeartPulse className="w-6 h-6" />,
      color: "from-emerald-600 to-emerald-700",
      type: "emerald"
    },
  ];

  return (
    <section id="process" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-900/20 border-slate-900" : "bg-gray-50/10 border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              The Patient Journey
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Your Consultation Process
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              We have stripped away complex medical bureaucracy to create a seamless, digitized 4-step framework tailored for your absolute comfort.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps Journey Layout */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-sky-100 via-emerald-100 to-sky-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 -translate-y-12 -z-10" />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <StaggerItem key={idx} variant="zoom-in" className="flex flex-col items-center text-center relative group">
                
                {/* Step Circle Card */}
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center relative group-hover:scale-105 transition-all duration-300 border ${
                  isDarkMode
                    ? step.type === "sky"
                      ? "bg-sky-950/30 border-slate-800/50 text-sky-400"
                      : "bg-emerald-950/30 border-slate-800/50 text-emerald-400"
                    : step.type === "sky"
                      ? "bg-sky-50 border-sky-100 text-sky-600 shadow-xs"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-xs"
                }`}>
                  {step.icon}
                  {/* Badge Number */}
                  <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r ${step.color} text-white font-mono text-xs font-bold flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm`}>
                    {step.step}
                  </span>
                </div>

                {/* Arrow connector (Mobile/Tablet) */}
                {idx < 3 && (
                  <div className="block lg:hidden my-4 text-sky-400/80 animate-bounce">
                    <ArrowDown className="w-5 h-5 mx-auto" />
                  </div>
                )}

                {/* Step Description */}
                <div className="mt-6 flex flex-col items-center">
                  <h3 className={`font-display text-base font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-2.5 leading-relaxed max-w-[220px] ${
                    isDarkMode ? "text-slate-400" : "text-gray-500"
                  }`}>
                    {step.desc}
                  </p>
                </div>

                {/* Desktop indicator chevron */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-6 -right-4 translate-x-1/2 text-gray-300 dark:text-slate-700">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}

              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

      </div>
    </section>
  );
};
