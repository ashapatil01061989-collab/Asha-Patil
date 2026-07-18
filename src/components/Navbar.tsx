import React, { useState, useEffect } from "react";
import { SpecialtyData } from "../data";
import { MedicalIcon } from "./MedicalIcon";
import { Menu, X, Phone, CalendarCheck, MapPin, Check } from "lucide-react";

interface NavbarProps {
  specialty: SpecialtyData;
  onBookClick: () => void;
  isDarkMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ specialty, onBookClick, isDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set up Scroll Spy to track active sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when the section occupies the center reading zone
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    const sectionIds = ["hero", "about", "services", "facilities", "reviews", "gallery", "faq", "contact"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScrollFallback = () => {
      if (window.scrollY < 100) {
        setActiveSection("hero");
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScrollFallback);

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Facilities", href: "#facilities" },
    { label: "Reviews", href: "#reviews" },
    { label: "Gallery", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Determine medical logo based on specialty
  const getLogoIconName = (id: string) => {
    switch (id) {
      case "dental":
        return "smile";
      case "pediatric":
        return "award";
      case "dermatology":
        return "droplet";
      case "orthopedic":
        return "activity";
      case "cardiology":
        return "heart";
      default:
        return "activity";
    }
  };

  return (
    <>
      <nav
        id="navbar-sticky"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? "bg-slate-900/90 shadow-lg border-b border-slate-800 backdrop-blur-md py-3"
              : "bg-white/90 shadow-md border-b border-gray-100 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo and clinic name */}
            <a href="#hero" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform duration-300">
                <MedicalIcon name={getLogoIconName(specialty.id)} className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-display font-bold text-lg leading-none tracking-tight transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {specialty.clinicName}
                </span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold uppercase tracking-wider mt-0.5">
                  {specialty.specialtyName} Suite
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navLinks.map((link) => {
                const isActive = link.href.slice(1) === activeSection;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? isDarkMode
                          ? "bg-slate-800 border border-slate-700/50 text-sky-400 shadow-sm"
                          : "bg-sky-50 border border-sky-100/50 text-sky-650 shadow-sm"
                        : isDarkMode
                        ? "text-slate-300 hover:text-sky-400 hover:bg-slate-800/40 border border-transparent"
                        : "text-gray-600 hover:text-sky-650 hover:bg-sky-50/50 border border-transparent"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA Actions */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={`tel:${specialty.emergencyContact}`}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg border transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="hidden md:inline">Call Clinic:</span>
                <span>{specialty.fee ? "Call Now" : "Direct Link"}</span>
              </a>
              <button
                onClick={onBookClick}
                className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-lg bg-sky-600 text-white hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onBookClick}
                className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 shadow-md cursor-pointer"
                aria-label="Book Slot"
              >
                <CalendarCheck className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg cursor-pointer ${
                  isDarkMode ? "text-slate-300 hover:bg-slate-800" : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 lg:hidden overflow-hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-full shadow-2xl flex flex-col p-6 transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } ${isDarkMode ? "bg-slate-900 border-l border-slate-800 text-white" : "bg-white text-gray-900"}`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800">
            <span className="font-display font-bold text-base text-sky-600">Clinic Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-1.5 rounded-lg ${isDarkMode ? "text-slate-400 hover:bg-slate-800" : "text-gray-400 hover:bg-gray-100"}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Section Location Indicator Banner */}
          <div className={`mt-4 p-3 rounded-xl border flex items-center gap-3 text-left transition-all duration-300 ${
            isDarkMode 
              ? "bg-slate-950/60 border-slate-800/80 text-slate-300 animate-fade-in" 
              : "bg-sky-50/60 border-sky-100/80 text-gray-700 animate-fade-in"
          }`}>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0">
              <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-bounce" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 dark:text-slate-500 font-extrabold uppercase tracking-wider leading-none">Your Location</span>
              <span className="text-xs sm:text-sm font-extrabold text-sky-700 dark:text-sky-400 mt-1">
                {navLinks.find(link => link.href.slice(1) === activeSection)?.label || "Home"} Section
              </span>
            </div>
            {/* Live radar beacon */}
            <span className="ml-auto flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto py-4 space-y-2 text-left">
            {navLinks.map((link) => {
              const isActive = link.href.slice(1) === activeSection;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? isDarkMode
                        ? "bg-slate-800 text-sky-400 border border-slate-700/50 shadow-sm"
                        : "bg-sky-100/80 text-sky-700 border border-sky-100 shadow-sm"
                      : isDarkMode
                      ? "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                      : "text-gray-600 hover:bg-sky-50/70 hover:text-sky-650"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      <Check className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] uppercase font-extrabold tracking-wider">Here</span>
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-3">
            <a
              href={`tel:${specialty.emergencyContact}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold rounded-xl border border-gray-200 dark:border-slate-700 text-center text-gray-700 dark:text-slate-300"
            >
              <Phone className="w-4 h-4 text-emerald-500 animate-bounce" />
              <span>Call Clinic: {specialty.emergencyContact}</span>
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookClick();
              }}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-xs font-bold rounded-xl bg-sky-600 text-white text-center shadow-lg hover:bg-sky-700"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Appointment Slot</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
