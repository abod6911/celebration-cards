import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import { TESTIMONIALS } from '@/data/testimonials';
import { MIcon } from '@/components/ui/MIcon';
import { FadeUp } from '@/components/ui/FadeUp';
import { useIsMobile } from '@/hooks/useIsMobile';

const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

const slideVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? 20 : -20,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: CUBIC_EASE,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir > 0 ? -20 : 20,
    scale: 0.97,
    transition: {
      duration: 0.4,
      ease: CUBIC_EASE,
    },
  }),
};

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const totalSlides = TESTIMONIALS.length;
  const currentTestimonial = TESTIMONIALS[activeIndex];

  // Scroll Parallax Hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const dashboardY = useTransform(scrollYProgress, [0, 1], ['80px', '-80px']);
  const floralY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['40px', '-20px'] : ['140px', '-140px']
  );
  const bgGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.15, 0.9]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handlePrev(); // RTL: Right arrow goes to previous
      } else if (e.key === 'ArrowLeft') {
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      dir="rtl"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#000000] overflow-hidden flex flex-col justify-center items-center select-none"
    >
      {/* 1. BACKGROUND AMBIENT RADIAL GLOW */}
      <motion.div
        style={{ scale: bgGlowScale }}
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
      >
        <div className="w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,rgba(212,175,55,0.03)_40%,transparent_70%)] blur-3xl opacity-80" />
      </motion.div>

      {/* 2. CENTRAL BOUQUET BACKING (Dense Luxury Floral Composition) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden opacity-35 sm:opacity-45">
        <img
          src="/assets/hero/mandeline-reviews-floral-frame.png"
          alt="Medellín Luxury Floral Frame Backing"
          className="w-full max-w-4xl h-auto object-contain filter drop-shadow-[0_0_80px_rgba(212,175,55,0.2)] mix-blend-screen scale-110 sm:scale-125 transform -translate-y-6"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/hero/mandeline-hero-01-ivory.webp';
          }}
        />
      </div>

      {/* 3. SECTION HEADER (Centered) */}
      <div className="relative z-20 max-w-2xl mx-auto text-center mb-12 sm:mb-16">
        <FadeUp delay={0.1}>
          <div className="liquid-glass inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-landing-gold text-xs tracking-wider border border-landing-gold/20 shadow-xs mb-4">
            <span className="text-[10px] opacity-75">✦</span>
            <span className="font-semibold">انطباعات وتجارب حقيقية</span>
            <span className="text-[10px] opacity-75">✦</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-tight">
            قالوا عن ميديلين
          </h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="text-landing-text-muted text-sm sm:text-base max-w-md mx-auto mt-3 leading-relaxed font-medium">
            آراء عملائنا هي أجمل جزء من كل هدية نجهزها.
          </p>
        </FadeUp>
      </div>

      {/* 4. CENTERED LIQUID-GLASS TESTIMONIAL CARD (With Parallax Motion) */}
      <motion.div
        style={{ y: dashboardY }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative z-20 w-full max-w-2xl mx-auto"
      >
        <div className="relative w-full rounded-3xl p-8 sm:p-12 text-center overflow-hidden bg-black/65 backdrop-blur-2xl border border-white/12 shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group">
          {/* Subtle Glass Inner Shimmer Line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-landing-gold/50 to-transparent opacity-90" />

          {/* Background Decorative Gold Watermark Leaf */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-landing-gold/8 rounded-full blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentTestimonial.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[220px]"
            >
              {/* Occasion Tag */}
              <div className="liquid-glass text-landing-gold text-xs px-4 py-1.5 rounded-full border border-landing-gold/35 mb-6 inline-flex items-center gap-2 font-bold shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-landing-gold animate-pulse" />
                <span>{currentTestimonial.tag}</span>
              </div>

              {/* Quote Text */}
              <blockquote className="text-lg sm:text-2xl text-white/95 font-normal leading-relaxed tracking-wide max-w-xl mx-auto font-sans italic drop-shadow-md">
                {currentTestimonial.quote}
              </blockquote>

              {/* Customer Info */}
              <div className="mt-6 flex flex-col items-center">
                <span className="text-landing-gold font-bold text-base sm:text-lg font-display tracking-tight drop-shadow-sm">
                  {currentTestimonial.name}
                </span>
                <span className="text-landing-text-muted text-xs sm:text-sm mt-1 font-medium">
                  {currentTestimonial.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Verified Badge Footer Inside Card */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-landing-text-muted">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>تجربة إهداء موثقة</span>
            </span>
            <span className="text-landing-gold/90 font-mono tracking-wider">WhatsApp Verified</span>
          </div>
        </div>

        {/* 5. INTERACTIVE NAVIGATION & CONTROLS */}
        <FadeUp delay={0.4}>
          <div className="liquid-glass flex items-center justify-center gap-5 px-6 py-2.5 rounded-full w-fit mx-auto mt-8 z-20 border border-white/12 shadow-xl bg-black/60 backdrop-blur-xl">
            {/* Previous Button (Right arrow in RTL) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="التقييم السابق"
              className="w-9 h-9 rounded-full liquid-glass hover:bg-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer border border-white/15 hover:border-landing-gold/50"
            >
              <MIcon name="arrow_forward_ios" size={14} className="text-white" />
            </button>

            {/* Counter (01 / 03) with strict LTR orientation */}
            <div
              dir="ltr"
              className="text-xs font-mono text-landing-text-muted tracking-widest flex items-center justify-center gap-1.5 select-none"
            >
              <span className="text-white font-bold font-mono text-sm">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="opacity-50">/</span>
              <span className="font-mono text-landing-text-muted">
                {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            {/* Next Button (Left arrow in RTL) */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="التقييم التالي"
              className="w-9 h-9 rounded-full liquid-glass hover:bg-white/15 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer border border-white/15 hover:border-landing-gold/50"
            >
              <MIcon name="arrow_back_ios" size={14} className="text-white" />
            </button>
          </div>
        </FadeUp>
      </motion.div>

      {/* 6. FOREGROUND PARALLAX FLORAL BOTANICAL LAYER */}
      <motion.div
        style={{ y: floralY }}
        className="absolute bottom-0 inset-x-0 pointer-events-none z-30 flex justify-between items-end opacity-45 sm:opacity-60"
      >
        <img
          src="/assets/hero/mandeline-review-branch.webp"
          alt="Foreground Botanical Branch Left"
          className="w-48 sm:w-80 md:w-96 h-auto object-contain filter drop-shadow-2xl transform -translate-x-12 translate-y-12 sm:translate-y-8"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/hero/mandeline-fg-branch.webp';
          }}
        />
        <img
          src="/assets/hero/mandeline-review-branch.webp"
          alt="Foreground Botanical Branch Right"
          className="w-48 sm:w-80 md:w-96 h-auto object-contain filter drop-shadow-2xl transform scale-x-[-1] translate-x-12 translate-y-12 sm:translate-y-8"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/hero/mandeline-fg-branch.webp';
          }}
        />
      </motion.div>
    </section>
  );
};
