import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { ScrollReveal } from "./ScrollReveal";
import { Award, Briefcase, GraduationCap, Languages, Shield, CalendarCheck, Check } from "lucide-react";

interface AboutDoctorProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ specialty, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<"bio" | "credentials" | "milestones">("bio");

  return (
    <section id="about" className={`py-16 sm:py-24 border-t border-b ${
      isDarkMode ? "bg-slate-950/60 border-slate-800" : "bg-white border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Chief Medical Specialist
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              About {specialty.doctorName}
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Dedicated to providing the highest caliber of evidence-based medical treatments in a compassionate, comfortable environment.
            </p>
          </div>
        </ScrollReveal>

        {/* Doctor Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Grid Left: Image & Personal Philosophy Box */}
          <ScrollReveal variant="fade-right" duration={0.6} className="lg:col-span-4 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-sky-100/10 bg-slate-50 aspect-square">
              <img
                src={specialty.avatar}
                alt={specialty.doctorName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-[10px] uppercase font-bold text-emerald-300">Experience Verified</span>
                <p className="text-lg font-bold font-display">{specialty.experience} Practicing</p>
              </div>
            </div>

            {/* Philosophy Box */}
            <div className={`p-6 rounded-2xl border text-left ${
              isDarkMode
                ? "bg-slate-900/50 border-slate-800"
                : "bg-emerald-50/80 border-emerald-200/60 shadow-xs"
            }`}>
              <h4 className="font-display font-black text-xs sm:text-sm tracking-wide text-emerald-800 dark:text-emerald-400 uppercase">
                Clinical Philosophy
              </h4>
              <p className={`text-xs sm:text-sm italic leading-relaxed mt-2.5 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                "{specialty.philosophy}"
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Languages className="w-4 h-4 text-sky-600" />
                <span className="text-[10px] text-gray-400 uppercase font-extrabold">Languages Spoken:</span>
                <span className={`text-xs font-bold ${isDarkMode ? "text-slate-200" : "text-gray-700"}`}>
                  {specialty.languages.join(", ")}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid Right: Tabbed Details Section */}
          <ScrollReveal variant="fade-left" duration={0.6} className="lg:col-span-8 space-y-8 text-left">
            
            {/* Tabs Selector */}
            <div className="flex border-b border-gray-100 dark:border-slate-800 pb-px gap-6 sm:gap-8 overflow-x-auto">
              {(["bio", "credentials", "milestones"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 relative shrink-0 cursor-pointer ${
                    activeTab === tab
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-slate-200"
                  }`}
                >
                  {tab === "bio" && "Biography & Mission"}
                  {tab === "credentials" && "Qualifications & Certifications"}
                  {tab === "milestones" && "Timeline & Milestones"}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-sky-600 dark:bg-sky-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content 1: Bio */}
            {activeTab === "bio" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-3">
                  <h3 className={`font-display text-xl sm:text-2xl font-black ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Meet {specialty.doctorName}
                  </h3>
                  <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    {specialty.bio}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border ${
                  isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-sky-50 border-sky-200/50 shadow-xs"
                }`}>
                  <h4 className="font-display font-black text-sm text-sky-850 dark:text-sky-400 uppercase tracking-wide">
                    Our Medical Mission
                  </h4>
                  <p className={`text-sm leading-relaxed mt-2.5 ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                    {specialty.mission}
                  </p>
                </div>

                {/* Achievements List */}
                <div className="space-y-3">
                  <h4 className={`font-display text-sm font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                    Clinical Achievements & Contributions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {specialty.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2.5 p-3.5 rounded-xl border ${
                          isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-xs hover:border-slate-300"
                        }`}
                      >
                        <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className={`text-xs font-semibold leading-relaxed ${isDarkMode ? "text-slate-300" : "text-gray-600"}`}>
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab content 2: Credentials */}
            {activeTab === "credentials" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Qualifications */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sky-600" />
                    <h3 className={`font-display text-base font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Academic Degrees
                    </h3>
                  </div>
                  <div className={`p-4 rounded-xl border ${
                    isDarkMode ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-xs"
                  }`}>
                    <p className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      {specialty.qualifications}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                      Verified Registration: No. {specialty.regNumber}
                    </p>
                  </div>
                </div>

                {/* Certifications and Memberships */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Board Certifications */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      <h4 className={`font-display text-sm font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                        Board Certifications
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {specialty.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                          <span className={isDarkMode ? "text-slate-300" : "text-gray-600"}>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Memberships */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-sky-600" />
                      <h4 className={`font-display text-sm font-bold uppercase tracking-wide ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                        Professional Memberships
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {specialty.memberships.map((mem, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-sky-500" />
                          <span className={isDarkMode ? "text-slate-300" : "text-gray-600"}>{mem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}

            {/* Tab content 3: Milestones */}
            {activeTab === "milestones" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="relative border-l border-sky-100 dark:border-slate-800 ml-3 pl-6 space-y-8">
                  {specialty.timeline.map((item, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-sky-600 border-2 border-white dark:border-slate-950" />
                      
                      <div className="flex flex-col text-left">
                        <span className="font-mono text-xs font-extrabold text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-2.5 py-0.5 rounded-full w-fit shadow-xs">
                          {item.year}
                        </span>
                        <h4 className={`font-display font-bold text-sm sm:text-base mt-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {item.title}
                        </h4>
                        <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
