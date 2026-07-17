import React, { useState } from "react";
import { SpecialtyData } from "../data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Clock, ArrowRight, BookOpen, X, ChevronRight, Share2 } from "lucide-react";

interface BlogProps {
  specialty: SpecialtyData;
  isDarkMode: boolean;
}

export const Blog: React.FC<BlogProps> = ({ specialty, isDarkMode }) => {
  const [readingArticleIdx, setReadingArticleIdx] = useState<number | null>(null);

  const openArticle = (idx: number) => {
    setReadingArticleIdx(idx);
  };

  const closeArticle = () => {
    setReadingArticleIdx(null);
  };

  return (
    <section id="blog" className={`py-16 sm:py-24 ${
      isDarkMode ? "bg-slate-900/40" : "bg-gray-50/40"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <ScrollReveal variant="fade-up" duration={0.6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-slate-800 border border-emerald-200 dark:border-slate-700/50 px-4 py-2 rounded-full inline-block shadow-sm">
              Clinical Insights & Wellness
            </span>
            <h2 className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Healthy Lifestyle & Medical Blog
            </h2>
            <p className={`text-sm sm:text-base mt-4 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
              Stay informed with our seasonal medical guidelines, preventative audits, and health tips compiled directly by our clinical board.
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {specialty.blog.map((article, index) => (
            <StaggerItem
              key={index}
              variant="fade-up"
              className={`group flex flex-col justify-between rounded-2xl border overflow-hidden text-left h-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-slate-900/80 border-slate-800 hover:border-sky-500/20"
                  : "bg-white border-slate-200 hover:border-sky-400 hover:shadow-md transition-all duration-300"
              }`}
            >
              <div>
                {/* Featured Image */}
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category Badge overlay */}
                  <span className="absolute top-4 left-4 bg-sky-600/90 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-xs">
                    {article.category}
                  </span>
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>MD Reviewed</span>
                  </div>

                  <h3 className={`font-display text-sm sm:text-base font-bold mt-2.5 leading-snug line-clamp-2 transition-colors group-hover:text-sky-600 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    {article.title}
                  </h3>

                  <p className={`text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3 ${
                    isDarkMode ? "text-slate-400" : "text-gray-500"
                  }`}>
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openArticle(index)}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-850 dark:text-sky-400 hover:text-sky-950 dark:hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Interactive Reader Drawer / Pane */}
      {readingArticleIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeArticle} />
          
          <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border text-left transform scale-100 transition-all duration-300 max-h-[90vh] flex flex-col ${
            isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-sky-100 text-gray-900"
          }`}>
            {/* Header banner */}
            <div className="h-48 sm:h-64 relative bg-slate-100 flex-shrink-0">
              <img
                src={specialty.blog[readingArticleIdx].image}
                alt="Reading Article Banner"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="absolute bottom-4 left-4 bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {specialty.blog[readingArticleIdx].category}
              </span>
            </div>

            {/* Scrollable text */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase">
                <span>{specialty.blog[readingArticleIdx].date}</span>
                <span>•</span>
                <span>Author: {specialty.doctorName}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-black leading-tight">
                {specialty.blog[readingArticleIdx].title}
              </h3>

              <div className="h-px w-full bg-gray-100 dark:bg-slate-800 my-2" />

              <p className={`text-sm sm:text-base leading-relaxed font-semibold italic ${
                isDarkMode ? "text-slate-300" : "text-gray-700"
              }`}>
                {specialty.blog[readingArticleIdx].summary}
              </p>

              <div className={`text-xs sm:text-sm space-y-4 leading-relaxed ${
                isDarkMode ? "text-slate-400" : "text-gray-500"
              }`}>
                <p>
                  As healthcare practitioners, our priority is supporting the metabolic and cardiovascular framework of our patients. In this article, we delve deep into clinically proven interventions to restore cell-level energy and safeguard your organs.
                </p>
                <p>
                  Clinical studies reveal that adopting standard low-glycemic, anti-inflammatory dietary plans combined with Zone 2 aerobic workouts drastically optimizes arterial elasticity and reverses early insulin resistance profiles. We recommend scheduling a formal diagnostic physical annually to map your markers step-by-step.
                </p>
                <p>
                  For personalized medicine audits and custom dosage balancing, please feel free to reserve a dedicated consultation block with our primary care team today.
                </p>
              </div>
            </div>

            {/* Footer action strip */}
            <div className="p-4 bg-gray-50 dark:bg-slate-950/40 border-t border-gray-100 dark:border-slate-800/60 flex items-center justify-between flex-shrink-0">
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                CareElite Educational Program
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => alert("Simulated link copy! Shared with success.")}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-sky-600"
                  title="Share Article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={closeArticle}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-bold"
                >
                  Close Article
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
