import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Toast } from '../ui/Toast';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A2E26] flex flex-col antialiased selection:bg-gold-champagne/30 selection:text-emerald-950">
      
      {/* Background Ambient Spotlights */}
      <div className="fixed top-0 end-0 w-[450px] h-[450px] rounded-full bg-gold-champagne/10 blur-[100px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 start-0 w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[120px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 flex gap-6 flex-1 pb-24 lg:pb-10">
          <Sidebar />

          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>

      <MobileNav />
      <Toast />
    </div>
  );
};
