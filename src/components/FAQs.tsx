import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Plus, Minus, AlertCircle } from "lucide-react";

interface FAQsProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const FAQs: React.FC<FAQsProps> = ({ specialty, isDarkMode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-950/40 border-slate-900" : "bg-white border-gray-100"
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Answers & Clarity
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Frequently Asked Questions
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Have questions about clinical consultations, timing blocks, digital EMR, or parking? We have answered our most frequent patient queries.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQs Accordion Grid */}
        <StaggerContainer className="space-y-4">
          {specialty.faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem
                key={index}
                variant="fade-up"
                className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                  isOpen
                    ? isDarkMode
                      ? "bg-slate-900/60 border-sky-500/20"
                      : "bg-sky-50/60 border-sky-200 shadow-sm"
                    : isDarkMode
                      ? "bg-slate-900/20 border-slate-800 hover:border-slate-700"
                      : "bg-white border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all duration-300"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-left cursor-pointer focus:outline-none"
                >
                  <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? "bg-sky-600 text-white"
                      : isDarkMode
                        ? "bg-slate-800 text-slate-300"
                        : "bg-gray-50 text-gray-500 hover:bg-sky-50 hover:text-sky-600"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated Answer Block */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[300px] border-t border-gray-100 dark:border-slate-800/60" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <div className={`p-6 text-xs sm:text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}>
                    {faq.a}
                  </div>
                </div>

              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Floating help note */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className={`mt-12 p-4 rounded-xl border flex items-center gap-3 text-left ${
            isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-emerald-50 border-emerald-200/50 shadow-xs"
          }`}>
            <AlertCircle className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span className={`text-xs ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
              <strong>Still have questions?</strong> Reach out to our receptionist on duty directly via WhatsApp or calling our emergency line for rapid clarification.
            </span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
