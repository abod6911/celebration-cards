import React from 'react';
import { useApp } from '../../context/AppContext';
import { AnimatePresence, motion } from 'framer-motion';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="px-5 py-3 rounded-2xl bg-emerald-950 text-white border border-gold-champagne/40 shadow-2xl flex items-center gap-3 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-champagne animate-pulse shrink-0" />
            <span>{toast}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
