import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, MoveRight } from "lucide-react";

interface GalleryProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ specialty, isDarkMode }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fictional clinical images list based on general or specialized visuals
  const galleryImages = [
    {
      title: "Clinic Exterior & Entry Plaza",
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      desc: "Convenient ground floor access with full wheelchair ramps."
    },
    {
      title: "Premium Patient Waiting Lounge",
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
      desc: "HEPA air-sterilized calm lounge with organic tea bar."
    },
    {
      title: "Active Consultation Room",
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
      desc: "Ergonomic seating and diagnostic screens for step-by-step reviews."
    },
    {
      title: "Advanced Medical Equipment Suite",
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      desc: "State-of-the-art diagnostic imaging and testing units."
    },
    {
      title: "Clinical Treatment Pods",
      src: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      desc: "Ultraviolet sterilized patient spaces for micro-procedures."
    },
    {
      title: "Welcome Desk & Pharmacy Outpost",
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      desc: "Secure cashless checkouts and rapid medicine pickups."
    }
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1 >= galleryImages.length ? 0 : prev! + 1));
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! - 1 < 0 ? galleryImages.length - 1 : prev! - 1));
    }
  };

  return (
    <section id="gallery" className={`py-16 sm:py-24 border-b ${
      isDarkMode ? "bg-slate-950/40 border-slate-900" : "bg-white border-gray-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-slate-800 border border-sky-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Clinical Environments
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Photo Gallery & Case Studies
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Take a visual tour of our modern, state-of-the-art clinic. Transparent, clean, and physically designed for ultimate patient reassurance.
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-5">
          {galleryImages.map((img, index) => (
            <StaggerItem
              key={index}
              variant="zoom-in"
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-video cursor-pointer border border-slate-200 dark:border-slate-800"
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Blur Overlay */}
              <div className="absolute inset-0 bg-sky-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white text-sky-600 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              {/* Title Strip */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-left">
                <h3 className="text-xs sm:text-sm font-bold tracking-tight">{img.title}</h3>
                <p className="text-[10px] text-slate-200 line-clamp-1 mt-0.5">{img.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Optional Before & After Section - High Value */}
        {specialty.beforeAfter && specialty.beforeAfter.length > 0 && (
          <div className="mt-20 pt-16 border-t border-gray-100 dark:border-slate-800">
            <div className="text-center mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
                Interactive Clinical Progress
              </span>
              <h3 className={`font-display text-xl sm:text-2xl font-black tracking-tight mt-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Featured Patient Case Studies
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {specialty.beforeAfter.map((caseStudy, idx) => (
                <div
                  key={idx}
                  className={`p-5 sm:p-6 rounded-3xl border text-left flex flex-col justify-between ${
                    isDarkMode ? "bg-slate-900/30 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div>
                    <h4 className={`font-display font-extrabold text-sm sm:text-base text-sky-850 dark:text-sky-400 flex items-center gap-1.5`}>
                      <Sparkles className="w-4.5 h-4.5" />
                      <span>Case: {caseStudy.title}</span>
                    </h4>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
                      {caseStudy.desc}
                    </p>
                  </div>

                  {/* Before & After comparison row */}
                  <div className="grid grid-cols-2 gap-4 my-5">
                    {/* Before Container */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        {caseStudy.beforeLabel}
                      </span>
                      <div className="rounded-xl overflow-hidden aspect-4/3 border bg-slate-150">
                        <img
                          src={caseStudy.beforeImage}
                          alt="Before Treatment Case Study"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* After Container */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest text-center">
                        {caseStudy.afterLabel}
                      </span>
                      <div className="rounded-xl overflow-hidden aspect-4/3 border-2 border-emerald-600 bg-slate-150">
                        <img
                          src={caseStudy.afterImage}
                          alt="After Treatment Case Study"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>* Real clinical outcomes vary</span>
                    <span className="flex items-center gap-1 text-sky-600">
                      <span>Verified Progression</span>
                      <MoveRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal Overlay */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Center Full-size Image */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].title}
              className="max-w-full max-h-[70vh] rounded-xl object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="font-display font-bold text-base sm:text-lg">
                {galleryImages[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {galleryImages[lightboxIndex].desc}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </section>
  );
};
