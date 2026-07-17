import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Heart, Quote } from "lucide-react";

interface ReviewsProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const Reviews: React.FC<ReviewsProps> = ({ specialty, isDarkMode }) => {
  const [startIndex, setStartIndex] = useState(0);

  const totalReviews = specialty.reviews.length;

  const nextReview = () => {
    setStartIndex((prev) => (prev + 1 >= totalReviews ? 0 : prev + 1));
  };

  const prevReview = () => {
    setStartIndex((prev) => (prev - 1 < 0 ? totalReviews - 1 : prev - 1));
  };

  // Fictional written family testimonials
  const familyTestimonials = [
    {
      family: "The Sterling Family",
      desc: "Three generations of our family consult here. The hygiene, minimal wait times, and genuine caring approach set this medical suite leagues apart from traditional hospital chains.",
      relation: "Regular Family Patients (5 Years)"
    },
    {
      family: "The Thorne-Cole Household",
      desc: "Outstanding preventive care. From routine lipid panels to critical cardiac monitoring, the digitized portals and direct messaging made chronic disease tracking stress-free.",
      relation: "Chronic Care Patients (3 Years)"
    }
  ];

  return (
    <section id="reviews" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-900/20 border-slate-900" : "bg-gray-50/10 border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Patient Feedback & Trust
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Google Reviews & Testimonials
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Nothing makes us prouder than clinical success stories from our patients. Read how {specialty.doctorName} is redefining healthcare.
            </p>
          </div>
        </ScrollReveal>

        {/* Google Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          <ScrollReveal variant="fade-right" duration={0.6} className={`lg:col-span-4 p-8 rounded-3xl text-center border ${
            isDarkMode ? "bg-slate-900/70 border-slate-800" : "bg-white border-slate-200 shadow-sm"
          }`}>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Overall Google Rating</span>
            <div className="font-display text-6xl font-black text-sky-850 dark:text-sky-400 mt-2 flex items-center justify-center gap-1">
              <span>{specialty.googleRating}</span>
              <span className="text-2xl text-gray-400 font-bold">/5.0</span>
            </div>
            
            {/* Stars Row */}
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5.5 h-5.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className={`text-xs font-semibold mt-4 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
              Based on <span className="font-extrabold text-sky-850">{specialty.totalReviews} verified ratings</span>
            </p>
            <div className="h-px w-full bg-gray-100 dark:bg-slate-800 my-4" />
            <span className="text-[9px] uppercase font-black tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-2.5 py-1 rounded-full inline-block">
              100% Verified Fictional Reviews
            </span>
          </ScrollReveal>

          {/* Reviews Carousel Wrapper */}
          <ScrollReveal variant="fade-left" duration={0.6} className="lg:col-span-8 relative">
            <div className="overflow-hidden min-h-[220px]">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Render two reviews side-by-side for desktop, sliding. Using slice with modulo safety */}
                {[0, 1].map((offset) => {
                  const reviewIdx = (startIndex + offset) % totalReviews;
                  const item = specialty.reviews[reviewIdx];
                  if (!item) return null;

                  return (
                    <div
                      key={reviewIdx}
                      className={`p-6 rounded-2xl border text-left transition-all duration-500 flex flex-col justify-between min-h-[220px] ${
                        isDarkMode
                          ? "bg-slate-900/40 border-slate-800"
                          : "bg-white border-slate-200 hover:border-sky-450 hover:shadow-md transition-all duration-300"
                      }`}
                    >
                      <div>
                        {/* Star Rating row */}
                        <div className="flex items-center gap-0.5 mb-3.5">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Text */}
                        <p className={`text-xs sm:text-sm italic leading-relaxed line-clamp-4 ${
                          isDarkMode ? "text-slate-300" : "text-gray-600"
                        }`}>
                          "{item.review}"
                        </p>
                      </div>

                      {/* Patient metadata */}
                      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-slate-800/40">
                        <div className="w-9 h-9 rounded-full bg-sky-50 dark:bg-slate-800 border overflow-hidden shrink-0">
                          <img
                            src={`https://picsum.photos/seed/patient_${item.photoSeed}/60/60`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {item.name}
                          </span>
                          <span className="text-[10px] text-gray-400 mt-1">
                            Visit Date: {item.date}
                          </span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Slider navigation buttons */}
            <div className="flex gap-2.5 justify-end mt-6">
              <button
                onClick={prevReview}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode
                    ? "border-slate-800 hover:bg-slate-800 text-slate-300"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isDarkMode
                    ? "border-slate-800 hover:bg-slate-800 text-slate-300"
                    : "border-gray-200 hover:bg-gray-50 text-gray-700 shadow-sm"
                }`}
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </ScrollReveal>

        </div>

        {/* Written / Family Testimonials Strip */}
        <ScrollReveal variant="fade-up" duration={0.6} className="mt-16 sm:mt-24">
          <div className="text-center mb-10 max-w-xl mx-auto">
            <h3 className={`font-display text-lg sm:text-xl font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Multi-Generation Family Trust
            </h3>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {familyTestimonials.map((test, index) => (
              <StaggerItem
                key={index}
                variant="fade-up"
                className={`p-6 sm:p-8 rounded-3xl border text-left relative overflow-hidden h-full ${
                  isDarkMode
                    ? "bg-slate-900/30 border-slate-800"
                    : "bg-emerald-50 border-emerald-200/50 shadow-xs"
                }`}
              >
                <Quote className="absolute -top-4 -right-4 w-28 h-28 text-sky-500/5 dark:text-sky-400/5 pointer-events-none" />
                <h4 className="font-display font-extrabold text-sm sm:text-base text-emerald-850 dark:text-emerald-300">
                  {test.family}
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed mt-3.5 ${
                  isDarkMode ? "text-slate-300" : "text-gray-600"
                }`}>
                  "{test.desc}"
                </p>
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800/40 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                    Relation: {test.relation}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>

      </div>
    </section>
  );
};
