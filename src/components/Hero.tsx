import React from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { ScrollReveal } from "./ScrollReveal";
import { Star, ArrowRight, ShieldCheck, MapPin, Phone, Clock, CreditCard, Calendar } from "lucide-react";

interface HeroProps {
  specialty: SpecialtyData;
  onBookClick: () => void;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ specialty, onBookClick, isDarkMode }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-sky-400/20 to-emerald-400/10 rounded-full blur-3xl -z-10 animate-glow-slow-1" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-400/10 to-sky-300/15 rounded-full blur-2xl -z-10 animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
           {/* Hero Left Content */}
          <ScrollReveal variant="fade-right" duration={0.7} className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-8">
            {/* Live Demo Template Tag */}
            <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 rounded-full w-fit shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300">
                Premium Reusable Demo Site
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight lg:leading-[1.1] ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Compassionate Care for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-500">
                You & Your Loved Ones
              </span>
            </h1>

            {/* Supporting Bio Text */}
            <p className={`text-base sm:text-lg font-medium leading-relaxed max-w-2xl ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}>
              {specialty.tagline}. Meet <strong className="text-sky-600 dark:text-sky-400">{specialty.doctorName}</strong>, combining {specialty.experience} of medical expertise with a patient-first consultation philosophy that treats you like family.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <button
                onClick={onBookClick}
                className="flex items-center justify-center gap-2 px-7 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-sky-500/15 hover:shadow-sky-500/25 active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <span>Book Free Appointment Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="#contact"
                className={`flex items-center justify-center gap-2 px-6 py-4 font-bold text-sm sm:text-base rounded-xl border transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? "border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                }`}
              >
                <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Get Location Directions</span>
              </a>
            </div>

            {/* Contact quick strip */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white dark:border-slate-900 overflow-hidden"
                    >
                      <img
                        src={`https://picsum.photos/seed/doctor_user_${i}/${50}/${50}`}
                        alt="Patient review avatar"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className={`text-xs font-black ml-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {specialty.googleRating}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">
                    Based on {specialty.totalReviews}+ Patient Ratings
                  </span>
                </div>
              </div>
              <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-800" />
              <div className="flex flex-col">
                <span className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Medical ID Verified
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold uppercase tracking-wider">
                  Reg: {specialty.regNumber}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Right Content - Portrait & Floating elements */}
          <ScrollReveal variant="fade-left" duration={0.7} className="lg:col-span-5 relative flex justify-center">
            {/* Frame Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-emerald-500/5 to-transparent rounded-3xl -rotate-2 scale-105 -z-10" />
            
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group bg-slate-100">
              <img
                src={specialty.avatar}
                alt={specialty.doctorName}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Image Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              {/* Doctor Name Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  Chief Medical Officer
                </span>
                <h3 className="font-display text-lg font-bold mt-0.5">{specialty.doctorName}</h3>
                <p className="text-xs text-slate-200/90 font-medium mt-1 line-clamp-1">
                  {specialty.qualifications}
                </p>
              </div>
            </div>

            {/* Floating Trust Card 1: Rating */}
            <div className={`absolute -top-4 -right-2 sm:-right-4 p-3 rounded-2xl shadow-xl border flex items-center gap-2.5 animate-float ${
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
            }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                isDarkMode
                  ? "bg-amber-950/30 border-transparent text-amber-400"
                  : "bg-amber-50 border-amber-100 text-amber-600"
              }`}>
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-xs font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {specialty.googleRating} Stars
                </span>
                <span className="text-[9px] text-gray-400 font-bold">Google Verified</span>
              </div>
            </div>

            {/* Floating Trust Card 2: Patients */}
            <div className={`absolute bottom-1/4 -left-2 sm:-left-6 p-3 rounded-2xl shadow-xl border flex items-center gap-2.5 animate-float ${
              isDarkMode ? "bg-slate-800 border-slate-700" : "bg-white border-sky-100"
            }`} style={{ animationDelay: "1.5s" }}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                isDarkMode
                  ? "bg-sky-950/30 border-transparent text-sky-400"
                  : "bg-sky-50 border-sky-100 text-sky-600"
              }`}>
                <MedicalIcon name="users" className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-xs font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Thousands Saved
                </span>
                <span className="text-[9px] text-gray-400 font-bold">Fictional Demo Patients</span>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Quick Information Bar - Interactive Segment */}
        <ScrollReveal variant="fade-up" delay={0.2} duration={0.6} className="mt-16 sm:mt-20">
          <div className={`p-4 sm:p-6 rounded-2xl shadow-xl border ${
            isDarkMode
              ? "bg-slate-800/80 border-slate-700/60"
              : "bg-white border-slate-200 shadow-sm"
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-100 dark:divide-slate-700">
              
              {/* Timing */}
              <div className="flex gap-3.5 items-start sm:p-2 lg:px-4">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-750 dark:text-sky-400 border border-sky-200/50 dark:border-transparent shrink-0">
                  <Clock className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                    Clinic Timings
                  </span>
                  <span className={`text-xs font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                    {specialty.timing.weekdays}
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                    Sat: {specialty.timing.saturday}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-3.5 items-start pt-6 sm:pt-0 sm:p-2 lg:px-4">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-800 dark:text-emerald-400 border border-emerald-200/50 dark:border-transparent shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-750 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                    Clinic Address
                  </span>
                  <span className={`text-xs font-bold mt-1 line-clamp-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                    452 Clinical Plaza, Medical District
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    Suite 400B • Free Front Parking
                  </span>
                </div>
              </div>

              {/* Emergency On-Call */}
              <div className="flex gap-3.5 items-start pt-6 sm:pt-0 sm:p-2 lg:px-4">
                <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center text-rose-800 dark:text-rose-400 border border-rose-200/50 dark:border-transparent shrink-0">
                  <Phone className="w-4 h-4 text-rose-700 dark:text-rose-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                    Emergency Hotline
                  </span>
                  <span className={`text-xs font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                    {specialty.emergencyContact}
                  </span>
                  <span className="text-[10px] text-rose-700 dark:text-rose-400 font-extrabold mt-0.5">
                    On-Call 24/7 (Fictional)
                  </span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex gap-3.5 items-start pt-6 sm:pt-0 sm:p-2 lg:px-4">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-800 dark:text-amber-400 border border-amber-200/50 dark:border-transparent shrink-0">
                  <CreditCard className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                    Consultation Fee
                  </span>
                  <span className={`text-xs font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                    Demo Fee: {specialty.fee}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    Cards • Apple Pay • Insurance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
