import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Globe, Copy, Check, Eye, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const { lang, setLang, role, setRole, t, showToast, stats } = useApp();
  const [copied, setCopied] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://quickrsvp.me/i/k82f9x');
    setCopied(true);
    showToast(t('copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const roleLabels: Record<UserRole, string> = {
    owner: t('role_owner'),
    manager: t('role_manager'),
    scanner_staff: t('role_scanner'),
  };

  return (
    <header className="sticky top-4 z-40 px-3 sm:px-6 mb-6">
      <div className="max-w-7xl mx-auto rounded-full glass-panel px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-glass border border-gold-champagne/30">
        
        {/* Left / Start: Live Quick Stats Pills */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{stats.confirmedGuests} {t('stat_confirmed_unit')}</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700">{stats.responseRate}%</span>
          </div>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gold-50 border border-gold-300/60 text-xs font-bold text-slate-800 transition shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gold-700" />}
            <span className="hidden md:inline">{t('copy_link')}</span>
          </button>
        </div>

        {/* Right / End: Role Switcher & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Preview Public Invite Button */}
          <a
            href="quickrsvp_invitation_mobile_fast.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-sweep px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-gold-champagne text-xs font-bold border border-gold-champagne/40 shadow-xs flex items-center gap-1.5 hover:opacity-95 transition"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('preview_live')}</span>
          </a>

          {/* Role Switcher (RBAC) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition"
            >
              <span>{roleLabels[role]}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute end-0 top-full mt-2 w-48 p-1.5 rounded-2xl bg-white border border-gold-300/50 shadow-xl z-50 space-y-1 animate-fadeIn">
                {(['owner', 'manager', 'scanner_staff'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { setRole(r); setRoleDropdownOpen(false); }}
                    className={cn(
                      "w-full text-start px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between",
                      role === r ? "bg-emerald-900 text-gold-champagne font-extrabold" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span>{roleLabels[r]}</span>
                    {role === r && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gold-50 border border-gold-300/60 text-xs font-bold text-slate-700 transition shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-gold-700" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

        </div>

      </div>
    </header>
  );
};
