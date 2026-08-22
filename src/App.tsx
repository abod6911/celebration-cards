import React from 'react';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { MIcon } from '@/components/ui/MIcon';

export const App: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const msg = encodeURIComponent(
      'مرحباً بوتيك ميديلين للزهور 🌸\nأود الاستفسار عن باقات المناسبات والتوصيل الفوري في جدة.'
    );
    window.open(`https://wa.me/966500000000?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col font-sans selection:bg-landing-gold selection:text-black">
      {/* Top Floating Glass Navigation */}
      <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-8 max-w-5xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="liquid-glass px-5 py-2.5 rounded-full flex items-center gap-3 pointer-events-auto border border-white/10 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-[#1A1716] border border-landing-gold/40 flex items-center justify-center text-landing-gold font-serif font-bold text-sm">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white">ميديلين للزهور</span>
            <span className="text-[10px] text-landing-text-muted font-mono tracking-widest">MEDELLÍN JEDDAH</span>
          </div>
        </div>

        <div className="pointer-events-auto">
          <PrimaryButton
            text="احجز تنسيقك الخاص"
            onClick={handleOpenWhatsApp}
            icon={<MIcon name="arrow_outward" size={16} />}
            className="text-xs py-2 px-5 h-9 bg-landing-gold hover:bg-landing-gold-light text-black font-bold border border-landing-gold/40"
          />
        </div>
      </header>

      {/* Main Showcase Section */}
      <main className="flex-1 flex flex-col justify-center">
        <TestimonialsSection />
      </main>

      {/* Footer Branding */}
      <footer className="py-8 text-center border-t border-white/8 text-xs text-landing-text-muted">
        <p>© {new Date().getFullYear()} ميديلين للزهور | Medellín Fine Floral Atelier — جدة</p>
      </footer>
    </div>
  );
};

export default App;
