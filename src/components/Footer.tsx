import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { Facebook, Instagram, Linkedin, Youtube, Send, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

interface FooterProps {
  specialty: SpecialtyData;
  onBookClick: () => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ specialty, onBookClick, isDarkMode }) => {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  const linksGroup1 = [
    { label: "Home Base", href: "#hero" },
    { label: "Meet the MD", href: "#about" },
    { label: "Clinical Specialties", href: "#services" },
    { label: "Our Facilities", href: "#facilities" },
  ];

  const linksGroup2 = [
    { label: "Patient Reviews", href: "#reviews" },
    { label: "Photo Gallery", href: "#gallery" },
    { label: "Consultation Process", href: "#process" },
    { label: "FAQ Portal", href: "#faq" },
  ];

  return (
    <footer className={`border-t ${
      isDarkMode ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600"
    }`}>
      
      {/* Top Newsletter / Subscription Bar */}
      <div className={`border-b py-10 sm:py-12 ${isDarkMode ? "border-slate-800 bg-slate-950/40" : "border-slate-200 bg-slate-100/40"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            <div className="lg:col-span-6 space-y-2">
              <h3 className={`font-display text-lg sm:text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Subscribe to Wellness Updates & Tips
              </h3>
              <p className="text-xs sm:text-sm text-gray-650 dark:text-slate-400">
                Receive our curated seasonal health newsletters, medical guidelines, and slot schedules directly in your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md lg:ml-auto">
                <input
                  type="email"
                  required
                  placeholder="e.g. newsletter@patient.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm border outline-none focus:ring-2 focus:ring-sky-500 flex-1 transition-all ${
                    isDarkMode
                      ? "bg-slate-900 border-slate-700 text-white"
                      : "bg-white border-slate-300 text-gray-800"
                  }`}
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white">
                <MedicalIcon name="heart" className="w-5.5 h-5.5 text-white" />
              </div>
              <span className={`font-display font-extrabold text-lg leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {specialty.clinicName}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-650 dark:text-slate-400">
              {specialty.tagline}. Integrating high technology with human empathy to deliver world-class outpatient healthcare. Fictional clinic demo portal.
            </p>
            
            {/* Social Icons row */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com" },
                { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com" },
                { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com" },
                { icon: <Youtube className="w-4 h-4" />, href: "https://youtube.com" },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? "border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white"
                      : "border-slate-300 hover:bg-slate-200 text-gray-500 hover:text-sky-850"
                  }`}
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links Group 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`font-display text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Our Practice
            </h4>
            <ul className="space-y-2.5">
              {linksGroup1.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-xs font-bold transition-colors ${
                      isDarkMode ? "text-slate-200 hover:text-sky-400" : "text-gray-900 hover:text-sky-650"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Links Group 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className={`font-display text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Resources
            </h4>
            <ul className="space-y-2.5">
              {linksGroup2.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`text-xs font-bold transition-colors ${
                      isDarkMode ? "text-slate-200 hover:text-sky-400" : "text-gray-900 hover:text-sky-650"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Address Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className={`font-display text-xs font-black uppercase tracking-widest ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Plaza Hub
            </h4>
            <div className="space-y-3.5">
              <div className="flex gap-2.5 items-start text-xs">
                <MapPin className="w-4 h-4 text-sky-750 dark:text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-snug text-gray-650 dark:text-slate-350">452 Clinical Plaza, Suite 400B, Medical District</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs">
                <Phone className="w-4 h-4 text-emerald-800 dark:text-emerald-450 shrink-0 mt-0.5" />
                <span className="text-gray-650 dark:text-slate-350">Phone: +91 91587 80962</span>
              </div>
              <div className="flex gap-2.5 items-start text-xs">
                <Mail className="w-4 h-4 text-sky-750 dark:text-sky-450 shrink-0 mt-0.5" />
                <span className="text-gray-650 dark:text-slate-350 line-clamp-1">{specialty.email || "diveshpatil0000@gmail.com"}</span>
              </div>
            </div>
            {/* Quick CTAs inside footer */}
            <button
              onClick={onBookClick}
              className={`w-full py-2.5 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer border ${
                isDarkMode
                  ? "bg-slate-800/40 text-sky-400 border-slate-800/85 hover:bg-sky-600 hover:text-white"
                  : "bg-sky-100 border-sky-200 text-sky-900 hover:bg-sky-600 hover:text-white hover:border-transparent shadow-sm"
              }`}
            >
              Secure Demo Slot Now
            </button>
          </div>

        </div>

        {/* Legal and Disclaimer Block */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5 md:items-start text-center md:text-left">
            <p className="text-[10px] text-gray-500 dark:text-slate-400 font-semibold leading-normal max-w-xl">
              <strong>Medical Disclaimer:</strong> This portal is a reusable demo template designed for medical marketing demonstration purposes. All doctor bios, certifications, patient quotes, ratings, coordinates, and diagnostic guidelines are completely fictional. Under no circumstances does this site provide actual real-life medical consultation or triages.
            </p>
            <p className="text-[10px] text-gray-500 dark:text-slate-450 font-bold mt-1.5">
              © {currentYear} {specialty.clinicName}. All Rights Reserved. Crafted by CareElite Medical Designs.
            </p>
          </div>

          {/* Legal link rows */}
          <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-500 dark:text-slate-400">
            <a href="#about" className="hover:text-sky-600">Privacy Policy</a>
            <span>•</span>
            <a href="#about" className="hover:text-sky-600">Terms of Use</a>
            <span>•</span>
            <a href="#about" className="hover:text-sky-600">HIPAA Guidelines</a>
          </div>
        </div>

      </div>

    </footer>
  );
};
