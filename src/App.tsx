import React, { useState, useEffect } from "react";
import { SPECIALTIES, SpecialtyData } from "./data";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { AboutDoctor } from "./components/AboutDoctor";
import { Facilities } from "./components/Facilities";
import { Process } from "./components/Process";
import { Reviews } from "./components/Reviews";
import { Gallery } from "./components/Gallery";
import { Blog } from "./components/Blog";
import { FAQs } from "./components/FAQs";
import { BookingForm } from "./components/BookingForm";
import { SharedPassViewer } from "./components/SharedPassViewer";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DemoController } from "./components/DemoController";
import { MedicalIcon } from "./components/MedicalIcon";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./components/ScrollReveal";
import { HeartPulse, MessageSquare, Phone, ArrowUp, CalendarCheck, CheckCircle2, Award, Zap, ShieldAlert, BadgeCheck } from "lucide-react";

export default function App() {
  const [sharedPassData, setSharedPassData] = useState<any | null>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("viewPass") === "true") {
        const id = params.get("id") || "";
        const name = params.get("name") || "";
        const phone = params.get("phone") || "";
        const email = params.get("email") || "";
        const existing = params.get("existing") || "no";
        const date = params.get("date") || "";
        const time = params.get("time") || "";
        const reason = params.get("reason") || "";
        const specId = params.get("specId") || "general";

        if (id && name) {
          return {
            id,
            fullName: name,
            mobileNumber: phone,
            email,
            isExisting: existing,
            preferredDate: date,
            preferredTime: time,
            reason,
            specId
          };
        }
      }
    }
    return null;
  });

  const [isSharedPassOpen, setIsSharedPassOpen] = useState<boolean>(() => {
    return sharedPassData !== null;
  });

  const [specialtyId, setSpecialtyId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("viewPass") === "true") {
        const specId = params.get("specId") || "general";
        if (SPECIALTIES.some((s) => s.id === specId)) {
          return specId;
        }
      }
    }
    return "general";
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Retrieve current active specialty details
  const specialty: SpecialtyData = SPECIALTIES.find((s) => s.id === specialtyId) || SPECIALTIES[0];

  // Simulating custom logo/heartbeat loading screen
  useEffect(() => {
    if (sharedPassData && isSharedPassOpen) {
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [specialtyId]); // Quick reload screen when switching specialties for realistic transition!

  // Tracking scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSpecialtyChange = (id: string) => {
    setIsLoading(true);
    setSpecialtyId(id);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("theme", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  // Listen for system theme changes in real-time
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't set an explicit manual override in localStorage
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const scrollToBooking = () => {
    const bookingSec = document.getElementById("booking-section");
    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Why Choose Us list
  const whyChooseUsData = [
    {
      title: "Evidence-Based Diagnoses",
      desc: "Every recommendation is backed by peer-reviewed modern clinical research, completely tailored to your personal biomarker audit.",
      icon: "activity"
    },
    {
      title: "Minimal Waiting Policy",
      desc: "We budget 30-45 minutes per slot to eliminate waiting-room congestion and give you ample, unhurried time with Dr. Specialties.",
      icon: "clock"
    },
    {
      title: "Digitized Patient Care",
      desc: "Secure cloud prescriptions, easy-access test reports, and direct patient messaging portals right from your smartphone.",
      icon: "clipboardcopy"
    },
    {
      title: "Hygienic & Air-Filtered",
      desc: "Our spaces employ continuous positive HEPA sterilization and sanitization cycles to guarantee absolute physical safety.",
      icon: "shield"
    }
  ];

  if (sharedPassData && isSharedPassOpen) {
    return (
      <SharedPassViewer
        isOpen={isSharedPassOpen}
        onClose={() => {
          setIsSharedPassOpen(false);
          setSharedPassData(null);
          // Clean up the URL query params so they can navigate the site naturally afterwards
          if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            url.searchParams.delete("viewPass");
            url.searchParams.delete("id");
            url.searchParams.delete("name");
            url.searchParams.delete("phone");
            url.searchParams.delete("email");
            url.searchParams.delete("existing");
            url.searchParams.delete("date");
            url.searchParams.delete("time");
            url.searchParams.delete("reason");
            url.searchParams.delete("specId");
            window.history.pushState({}, "", url.pathname);
          }
        }}
        passData={sharedPassData}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-300 ${
      isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50/50 text-gray-900"
    }`}>

      {/* 1. CUSTOM LAUNCH LOADING SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center px-4">
            {/* Pulsing Medical Heart Logo */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-xl shadow-sky-500/20 relative animate-bounce">
              <HeartPulse className="w-9 h-9 text-white animate-pulse" />
              {/* Spinning Ring */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-spin" />
            </div>

            <div className="space-y-2">
              <h1 className="font-display font-black text-xl text-sky-600 dark:text-sky-400">
                CareElite Outpatient Suites
              </h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                Configuring {specialty.specialtyName} Suite Demo...
              </p>
            </div>

            {/* Simulated Clinical Heartbeat Waveform */}
            <div className="flex items-center gap-1 h-6 mt-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-emerald-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.floor(10 + Math.random() * 24)}px`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. STICKY HEADER NAVIGATION */}
      <Navbar specialty={specialty} onBookClick={scrollToBooking} isDarkMode={isDarkMode} />

      {/* 3. HERO WELCOME SECTION WITH QUICK BAR */}
      <Hero specialty={specialty} onBookClick={scrollToBooking} isDarkMode={isDarkMode} />

      {/* 4. WHY CHOOSE THIS CLINIC */}
      <section id="why-choose" className={`relative overflow-hidden py-16 sm:py-24 border-b ${
        isDarkMode ? "bg-slate-950 border-slate-900" : "bg-white border-gray-100"
      }`}>
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-400/5 to-emerald-400/5 rounded-full blur-3xl -z-10 animate-glow-slow-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal variant="fade-up" duration={0.6}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
                Why Choose Our Clinic
              </span>
              <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Trust, Precision & Empathy
              </h2>
              <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-600"}`}>
                We believe in creating a peaceful, stress-free clinical environment centered on human connections and modern digital efficiency.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsData.map((item, index) => (
              <StaggerItem
                key={index}
                variant="fade-up"
                className={`group p-6 rounded-2xl border text-left flex flex-col justify-between h-full shadow-sm hover:-translate-y-1.5 transition-all duration-350 ${
                  isDarkMode
                    ? "bg-slate-900/40 border-slate-800 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5"
                    : "bg-white border-slate-200 hover:border-sky-300 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Icon Circle */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-5 border group-hover:scale-110 group-hover:bg-sky-600 group-hover:text-white group-hover:border-transparent transition-all duration-300 ${
                    isDarkMode
                      ? "bg-sky-950/40 border-transparent text-sky-400"
                      : "bg-sky-50 border-sky-100 text-sky-600"
                  }`}>
                    <MedicalIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className={`font-display text-sm sm:text-base font-bold tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${
                    isDarkMode ? "text-slate-400" : "text-gray-600"
                  }`}>
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
                  <BadgeCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <span>Clinical Standard</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

        </div>
      </section>

      {/* 5. CLINIC HIGHLIGHTS / FACILITIES LIST */}
      <Facilities specialty={specialty} isDarkMode={isDarkMode} />

      {/* 6. DETAILED ABOUT DOCTOR PORTAL */}
      <AboutDoctor specialty={specialty} isDarkMode={isDarkMode} />

      {/* 7. MEDICAL SERVICES GRID */}
      <Services specialty={specialty} onBookClick={scrollToBooking} isDarkMode={isDarkMode} />

      {/* 8. VISUAL CONSULTATION PROCESS JOURNEY */}
      <Process specialty={specialty} isDarkMode={isDarkMode} />

      {/* 9. PORTRAIT PHOTO GALLERY & CASE STUDIES LIGHTBOX */}
      <Gallery specialty={specialty} isDarkMode={isDarkMode} />

      {/* 10. GOOGLE REVIEWS CAROUSEL & FAMILY TESTIMONIALS */}
      <Reviews specialty={specialty} isDarkMode={isDarkMode} />

      {/* 11. HEALTH TIPS & CURATED BLOG ARTICLE DRAWER */}
      <Blog specialty={specialty} isDarkMode={isDarkMode} />

      {/* 12. FREQUENTLY ASKED ACCORDION FAQ */}
      <FAQs specialty={specialty} isDarkMode={isDarkMode} />

      {/* 13. INTERACTIVE APPOINTMENT BOOKING FORM */}
      <BookingForm specialty={specialty} isDarkMode={isDarkMode} />

      {/* 14. CONTACT INFORMATION & INTERACTIVE radar MAP */}
      <Contact specialty={specialty} onBookClick={scrollToBooking} isDarkMode={isDarkMode} />

      {/* 15. PREMIUM FOOTER & LEGAL DISCLAIMER */}
      <Footer specialty={specialty} onBookClick={scrollToBooking} isDarkMode={isDarkMode} />


      {/* --- EXTRA BONUS UTILITIES --- */}

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/15550199111?text=Hi%20Clinic%20Receptionist,%20I'd%20like%20to%20request%20information%20for%20${encodeURIComponent(specialty.doctorName)}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-32 sm:bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 animate-float"
        style={{ animationDuration: "5s" }}
        title="Direct Consultation chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
        </span>
      </a>

      {/* STICKY MOBILE BOOKING BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 border-t border-sky-100/40 dark:border-slate-800 backdrop-blur-md p-3 flex items-center gap-3 z-40 shadow-xl">
        <a
          href={`tel:${specialty.emergencyContact}`}
          className="p-3 rounded-xl border border-rose-100 dark:border-rose-950 text-rose-500 shrink-0"
        >
          <Phone className="w-5 h-5 animate-pulse" />
        </a>
        <button
          onClick={scrollToBooking}
          className="flex-1 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Consultation Slot</span>
        </button>
      </div>

      {/* BACK TO TOP WIDGET */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-[76px] sm:bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white dark:bg-sky-600 dark:hover:bg-sky-700 shadow-xl transition-all duration-300 cursor-pointer ${
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* FLOATING DEMO CONTROLLER TOOLBAR */}
      <DemoController
        currentSpecialtyId={specialtyId}
        onSpecialtyChange={handleSpecialtyChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* SHARED CLINICAL PASS OVERLAY MODAL */}
      <SharedPassViewer
        isOpen={isSharedPassOpen}
        onClose={() => setIsSharedPassOpen(false)}
        passData={sharedPassData}
        isDarkMode={isDarkMode}
      />

    </div>
  );
}
