import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal } from "./ScrollReveal";
import { MapPin, Phone, Mail, Clock, CreditCard, ExternalLink, ShieldCheck, Map, Navigation, ArrowRight } from "lucide-react";

interface ContactProps {
  specialty: SpecialtyData;
  onBookClick: () => void;
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ specialty, onBookClick, isDarkMode }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText("452 Clinical Plaza, Medical District, Suite 400B");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="contact" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-900/40" : "bg-gray-50/40"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Connect & Locate
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Contact Clinic & Location Map
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Our clinic is situated in the premium Medical Plaza complex. Easy ground floor access with dedicated parking and continuous security checks.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Grid: Contact details cards */}
          <ScrollReveal variant="fade-right" duration={0.6} className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Address and details container */}
            <div className={`p-6 sm:p-8 rounded-3xl border text-left space-y-6 ${
              isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              <h3 className={`font-display text-lg font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Clinic Contact Details
              </h3>

              {/* Items */}
              <div className="space-y-4.5">
                {/* Pin */}
                <div className="flex gap-4.5 items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                    isDarkMode
                      ? "bg-sky-950/30 border-transparent text-sky-400"
                      : "bg-sky-50 border-sky-100 text-sky-600"
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase">Physical Address</span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 leading-snug ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                      452 Clinical Plaza, Medical District
                    </span>
                    <span className="text-xs text-gray-400">Suite 400B • Free Visitor Parking</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4.5 items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                    isDarkMode
                      ? "bg-emerald-950/30 border-transparent text-emerald-400"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase">Call Desk / Enquiries</span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                      +91 91587 80962
                    </span>
                    <span className="text-xs text-rose-700 dark:text-rose-400 font-extrabold">Emergency: {specialty.emergencyContact}</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4.5 items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                    isDarkMode
                      ? "bg-sky-950/30 border-transparent text-sky-400"
                      : "bg-sky-50 border-sky-100 text-sky-600"
                  }`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase">Direct Clinic Email</span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                      {specialty.email || "diveshpatil0000@gmail.com"}
                    </span>
                    <span className="text-xs text-gray-400">Response within 2 hours</span>
                  </div>
                </div>

                {/* Timing */}
                <div className="flex gap-4.5 items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${
                    isDarkMode
                      ? "bg-amber-950/30 border-transparent text-amber-400"
                      : "bg-amber-50 border-amber-100 text-amber-600"
                  }`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase">Consultation Timings</span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 ${isDarkMode ? "text-slate-200" : "text-gray-800"}`}>
                      Mon - Fri: {specialty.timing.weekdays}
                    </span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">
                      Sat: {specialty.timing.saturday} • Sun: {specialty.timing.sunday}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex flex-wrap gap-2">
                <button
                  onClick={copyAddress}
                  className="px-4 py-2.5 rounded-lg border text-xs font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedLink ? "Address Copied!" : "Copy Full Address"}
                </button>
                <a
                  href={`tel:${specialty.emergencyContact}`}
                  className="px-4 py-2.5 rounded-lg bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Reception Now</span>
                </a>
              </div>
            </div>

            {/* Quick check strip */}
            <div className={`p-6 rounded-2xl border text-left ${
              isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-emerald-50 border-emerald-200/50 shadow-xs"
            }`}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Verified Clinic Spot
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1 leading-normal">
                    This location has been mapped on Google, Apple, and Waze platforms (Fictional demo setup). Free parking validated upon entry.
                  </p>
                </div>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Grid: Custom premium embedded maps mockup (highly detailed interactive visual!) */}
          <ScrollReveal variant="fade-left" duration={0.6} className="lg:col-span-7 flex flex-col justify-between">
            <div className={`h-full min-h-[380px] p-4 rounded-3xl border text-left flex flex-col justify-between relative overflow-hidden group ${
              isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white border-slate-200 shadow-sm"
            }`}>
              {/* Maps Mockup Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800 flex-shrink-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-slate-800 flex items-center justify-center text-sky-750 border border-sky-200/50">
                    <Map className="w-4 h-4 text-sky-700 dark:text-sky-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Clinical Navigation Radar
                    </span>
                    <span className="text-[10px] text-gray-400">Interactive Location Mockup</span>
                  </div>
                </div>
                <span className="text-[9px] font-extrabold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-2.5 py-1 rounded-full">
                  GPS Active
                </span>
              </div>

              {/* Map SVG / Content area */}
              <div className="flex-1 my-4 rounded-2xl relative overflow-hidden bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-gray-200 dark:border-slate-800">
                {/* SVG Mockup Map with roads, grids, coordinate markers and beautiful high contrast styles */}
                <svg
                  viewBox="0 0 500 300"
                  className="w-full h-full text-gray-300 dark:text-slate-800/40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="0" y1="200" x2="500" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="0" y1="250" x2="500" y2="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  
                  <line x1="100" y1="0" x2="100" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="300" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />
                  <line x1="400" y1="0" x2="400" y2="300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" />

                  {/* Main Roads / Blocks */}
                  {/* Road 1: Clinical Blvd */}
                  <rect x="0" y="110" width="500" height="40" fill="currentColor" opacity="0.1" />
                  {/* Road 2: Hospital Lane */}
                  <rect x="230" y="0" width="40" height="300" fill="currentColor" opacity="0.1" />

                  {/* Road Labels */}
                  <text x="20" y="133" fill="#94a3b8" className="text-[9px] font-bold uppercase tracking-wider">Clinical Boulevard</text>
                  <text x="253" y="20" fill="#94a3b8" className="text-[9px] font-bold uppercase tracking-wider" transform="rotate(90,253,20)">Hospital Avenue</text>

                  {/* Medical District Highlight Zone */}
                  <circle cx="250" cy="130" r="80" fill="#0284c7" opacity="0.05" />

                  {/* Fictional River/Park on edge */}
                  <path d="M 0,270 Q 150,290 300,260 T 500,290" stroke="#bae6fd" strokeWidth="20" opacity="0.3" fill="none" />
                  <text x="400" y="275" fill="#38bdf8" className="text-[8px] font-bold uppercase tracking-wider">Serene River</text>

                  {/* Custom pin at center cross (Clinic Plaza) */}
                  <g transform="translate(250, 130)" className="animate-float">
                    {/* Ring ripple */}
                    <circle cx="0" cy="0" r="22" fill="#0284c7" opacity="0.25">
                      <animate attributeName="r" values="10;25;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    {/* Inner pin shadow */}
                    <ellipse cx="0" cy="18" rx="5" ry="2" fill="black" opacity="0.2" />
                    {/* Pin body */}
                    <path
                      d="M0 0 C-10 -10 -15 -20 -15 -30 C-15 -42 -5 -48 0 -48 C5 -48 15 -42 15 -30 C15 -20 10 -10 0 0 Z"
                      fill="#0284c7"
                    />
                    {/* Pin Inner cross */}
                    <path
                      d="M -5 -30 L 5 -30 M 0 -35 L 0 -25"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Pin label bubble */}
                  <g transform="translate(250, 65)">
                    <rect x="-65" y="-15" width="130" height="24" rx="6" fill="#0f172a" />
                    <polygon points="0,13 -5,9 5,9" fill="#0f172a" />
                    <text x="0" y="0" fill="white" textAnchor="middle" className="text-[9px] font-extrabold font-sans">
                      {specialty.clinicName}
                    </text>
                  </g>
                </svg>

                {/* Driving estimate overlay widget */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 dark:bg-slate-900/95 shadow-lg border border-sky-100/30 flex items-center justify-between text-left backdrop-blur-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-sky-600 animate-pulse" />
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">Directions Radar</span>
                      <span className="text-xs font-bold text-gray-800 dark:text-white mt-1">12 mins from City Center</span>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <span>Waze GPS</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex justify-between items-center text-xs mt-2 flex-shrink-0">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Coordinates: 40.7128° N, 74.0060° W</span>
                <button
                  onClick={onBookClick}
                  className="text-sky-600 dark:text-sky-400 font-bold flex items-center gap-1 hover:text-sky-700 cursor-pointer text-xs"
                >
                  <span>Request parking reservation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
