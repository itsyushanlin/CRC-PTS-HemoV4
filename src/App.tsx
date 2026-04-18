/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/// <reference types="vite/client" />
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, HeartPulse, Activity, ShieldAlert, Users, BookOpen, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CONTACT_EMAIL, MODULES, REASONS } from "./constants";

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12 text-center md:text-left">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-3xl font-serif font-medium text-natural-ink mb-4 tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-natural-ink/70 max-w-2xl text-base leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const totalSlides = 24;

  // Helper to construct image paths
  const getImagePath = (filename: string) => {
    const base = import.meta.env.BASE_URL || "/";
    const cleanBase = base.endsWith("/") ? base : `${base}/`;
    return `${cleanBase}${filename}`;
  };

  const nextImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev === totalSlides ? 1 : (prev as number) + 1));
    }
  }, [selectedImage]);

  


  const prevImage = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev === 1 ? totalSlides : (prev as number) - 1));
    }
  }, [selectedImage]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen bg-natural-bg font-sans selection:bg-natural-accent/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-natural-sidebar/90 backdrop-blur-sm border-b border-natural-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-natural-accent">
              <HeartPulse className="w-6 h-6" />
            </div>
            <span className="font-bold text-xs uppercase tracking-[0.15em] text-natural-accent hidden sm:block">CHGH Cardiac Rehabilitation</span>
          </div>
          <a 
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-natural-link border-b border-natural-link pb-0.5 hover:opacity-70 transition-opacity font-medium"
          >
            itsYushanLin@gmail.com
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-3 py-1 bg-natural-badge-bg text-natural-badge-text rounded-full text-[10px] font-bold uppercase tracking-wider mb-6"
              >
                學前預習系統 · Pre-clinical Study
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-serif font-medium text-natural-ink mb-6 leading-[1.3] tracking-tight"
              >
                心臟重症與復健實務
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-natural-ink/80 mb-10 leading-relaxed font-light italic font-serif"
              >
                從血液動力學、機械循環輔助到早期物理治療介入
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#modules" className="px-6 py-3 bg-natural-accent text-natural-white rounded-sm font-medium hover:bg-natural-accent/80 transition-all shadow-sm">
                  模組列表
                </a>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-natural-border shadow-md">
                <img 
                  src={getImagePath("hero.jpg")} 
                  alt="CHGH Cardiac Rehabilitation" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-natural-accent/10 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Introduction Banner */}
      <section className="py-12 px-6 bg-natural-sidebar border-y border-natural-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base text-natural-ink/80 leading-relaxed font-sans opacity-90">
            歡迎來到振興醫院心臟醫學中心的學前預習網站！本課程專為物理治療實習學生設計，旨在帶領你從基礎的心臟生理機制，跨越到加護病房中高複雜度的心肺復健實務，為你在心臟醫學中心的實習打下堅實的理論與臨床基礎。
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionTitle subtitle="循序漸進引導你掌握心血管重症物理治療的精髓">Pre-clinical Study Modules</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-natural-white border border-natural-border hover:border-natural-accent transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-lg font-bold text-natural-accent font-sans">0{module.id}</span>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-natural-ink group-hover:text-natural-accent transition-colors leading-tight">
                    {module.title}
                  </h3>
                  <ul className="space-y-3">
                    {module.items.map((item, i) => (
                      <li key={i} className="text-xs md:text-sm text-natural-ink/70 leading-relaxed flex gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-natural-border group-hover:bg-natural-accent shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Hemodynamics Section */}
      <section className="py-24 px-6 bg-natural-sidebar border-y border-natural-border">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="在心臟醫學中心實習，深入理解血液動力學是確保患者安全與復健成效的保命符">為什麼物理治療師需要懂血液動力學？</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REASONS.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-natural-white p-6 border border-natural-border shadow-sm flex flex-col"
              >
                <div className="mb-4 text-natural-accent opacity-60">
                  {index % 2 === 0 ? <Activity className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                </div>
                <h4 className="text-sm font-bold text-natural-ink uppercase tracking-wider mb-3 leading-snug">{reason.title}</h4>
                <p className="text-xs text-natural-ink/70 leading-relaxed flex-grow">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid-header flex justify-between items-end mb-8">
          <h2 className="text-2xl font-serif italic text-natural-ink">Pre-clinical Study Slides</h2>
          <div className="text-xs opacity-50 uppercase tracking-widest font-bold">{totalSlides} Slides Available</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05 }}
              onClick={() => setSelectedImage(i + 1)}
              className="aspect-[4/3] bg-natural-white border border-natural-border flex flex-col items-center justify-center group hover:border-natural-accent transition-all relative overflow-hidden cursor-pointer"
            >
              <img 
                src={getImagePath(`slide${i + 1}.JPG`)} 
                alt={`Slide ${i + 1}`} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-natural-accent/0 group-hover:bg-natural-accent/20 transition-all flex items-center justify-center">
                <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8" />
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 text-[10px] text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                Slide {String(i + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-wrap gap-8 text-[11px] text-natural-accent uppercase tracking-[1px] font-bold border-t border-natural-border pt-8">
          <div className="flex items-center gap-2">Clinical Competence: <span className="px-2 py-0.5 bg-natural-badge-bg text-natural-badge-text rounded-full">INTERN LEVEL</span></div>
          <div className="flex items-center gap-2">Module Progress: <span className="px-2 py-0.5 bg-natural-badge-bg text-natural-badge-text rounded-full">READY</span></div>
          <div>Est. Time: 120 MIN</div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <div 
              className="relative max-w-5xl w-full aspect-[4/3] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 md:-left-16 text-white/50 hover:text-white p-4"
                onClick={prevImage}
              >
                <ChevronLeft className="w-12 h-12" />
              </motion.button>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/10"
              >
                <img 
                  src={getImagePath(`slide${selectedImage}.JPG`)} 
                  alt={`Slide ${selectedImage}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-black/50"
                  onDoubleClick={closeLightbox}
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 md:-right-16 text-white/50 hover:text-white p-4"
                onClick={nextImage}
              >
                <ChevronRight className="w-12 h-12" />
              </motion.button>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/70 font-sans tracking-widest text-sm uppercase">
                Slide {String(selectedImage).padStart(2, '0')} / {totalSlides}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-natural-sidebar border-t border-natural-border py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-natural-accent mb-4">CHGH Cardiac Rehabilitation</h3>
            <p className="text-xs text-natural-ink/60 leading-relaxed">
              致力於提供最頂尖的心臟醫療服務與學術研究，為實習學生打造最紮實的臨床實踐環境。
            </p>
          </div>
          <div className="space-y-4">
            <div className="text-[10px] uppercase font-bold text-natural-accent opacity-60">課程負責導師 Contact</div>
            <a 
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-natural-link border-b border-natural-link pb-1 hover:opacity-70 transition-opacity"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-[10px] text-natural-ink/40 mt-8">© 2026 CHGH Heart Center Training Program.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


