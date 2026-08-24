/**
 * QuickRSVP - Main Application Controller & View Router
 * Orchestrates Smart Dashboard Hero, Contextual CTAs, Asymmetric KPIs,
 * WhatsApp Messaging Center, Conversion Analytics Funnel, and 8-Category Settings
 */

const App = {
  currentView: 'overview',
  activeMessageTab: 'invite',
  activeSettingsCategory: 'event',

  init() {
    if (typeof Icons !== 'undefined' && Icons.renderAll) {
      Icons.renderAll();
    }
    this.bindEvents();
    this.renderOverview();
    this.renderMessagesCenter();
    this.renderAnalytics();
    this.renderSettings();
    this.startCountdownTimer();
    this.switchView('overview');
  },

  bindEvents() {
    window.addEventListener('quickrsvp:state_updated', () => {
      this.renderOverview();
      this.renderAnalytics();
      if (typeof Icons !== 'undefined' && Icons.renderAll) {
        Icons.renderAll();
      }
    });
  },

  switchView(viewName) {
    this.currentView = viewName;
    const views = ['overview', 'invitation', 'guests', 'messages', 'checkin', 'analytics', 'settings'];

    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          el.classList.remove('page-view-transition');
          void el.offsetWidth; // Trigger reflow for re-animation
          el.classList.add('page-view-transition');
        } else {
          el.classList.add('hidden');
        }
      }

      // Update Desktop Sidebar Nav State
      const navBtn = document.getElementById(`nav-btn-${v}`);
      if (navBtn) {
        if (v === viewName) {
          navBtn.className = "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs bg-[#0B251D] text-white shadow-sm transition border-r-2 border-[#D4AF37]";
        } else {
          navBtn.className = "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100/90 transition border-r-2 border-transparent";
        }
      }

      // Update Mobile Bottom Nav State
      const mobBtn = document.getElementById(`mob-nav-${v}`);
      if (mobBtn) {
        if (v === viewName) {
          mobBtn.className = "flex flex-col items-center justify-center text-[#0B251D] font-bold text-[10px] scale-105 transition-transform";
        } else {
          mobBtn.className = "flex flex-col items-center justify-center text-slate-500 font-medium text-[10px] hover:text-slate-900 transition-transform";
        }
      }
    });

    // View-specific initializations
    if (viewName === 'invitation' && typeof Builder !== 'undefined') {
      Builder.init();
    } else if (viewName === 'guests' && typeof GuestCRM !== 'undefined') {
      GuestCRM.render();
    } else if (viewName === 'checkin' && typeof Scanner !== 'undefined') {
      Scanner.renderLiveDoorStats();
    } else if (viewName === 'overview') {
      this.renderOverview();
    } else if (viewName === 'analytics') {
      this.renderAnalytics();
    } else if (viewName === 'messages') {
      this.renderMessagesCenter();
    } else if (viewName === 'settings') {
      this.renderSettings();
    }

    if (typeof Icons !== 'undefined' && Icons.renderAll) {
      Icons.renderAll();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Toggle Arabic / English
  toggleLanguage() {
    const next = I18n.currentLang === 'ar' ? 'en' : 'ar';
    I18n.setLanguage(next);

    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.innerHTML = `
        <span>${next === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
        <span class="font-bold">${next === 'ar' ? 'English' : 'العربية'}</span>
      `;
    }

    this.renderOverview();
    this.renderMessagesCenter();
    this.renderAnalytics();
    this.renderSettings();

    if (typeof GuestCRM !== 'undefined') GuestCRM.render();
    if (typeof Builder !== 'undefined') {
      Builder.renderStructureTree();
      Builder.renderInspector();
    }
  },

  toggleEventSwitcher() {
    const dropdown = document.getElementById('header-event-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('hidden');
  },

  selectEvent(eventId) {
    const dropdown = document.getElementById('header-event-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
    const lang = I18n.currentLang || 'ar';
    this.showToast(lang === 'ar' ? 'تم تبديل المناسبة النشطة' : 'Active event switched');
  },

  // Toast Notification
  showToast(message) {
    const toast = document.getElementById('global-toast');
    const toastText = document.getElementById('global-toast-text');
    if (!toast || !toastText) return;

    toastText.innerText = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 2800);
  },

  // ==========================================================================
  // DASHBOARD OVERVIEW (Smart Hero, Contextual CTA, Asymmetric KPIs, Activity)
  // ==========================================================================
  renderOverview() {
    const lang = I18n.currentLang || 'ar';
    const guests = Store.state.guests || [];
    const event = Store.state.event || {};

    const totalGuests = guests.length;
    const confirmedGuests = guests.filter(g => g.rsvpStatus === 'attending');
    const awaitingGuests = guests.filter(g => g.rsvpStatus === 'awaiting');
    const declinedGuests = guests.filter(g => g.rsvpStatus === 'declined');
    const notSentGuests = guests.filter(g => !g.inviteSent);
    const checkedInGuests = guests.filter(g => g.checkedIn);

    const confirmedSeats = confirmedGuests.reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);
    const totalAllowedSeats = guests.reduce((sum, g) => sum + (g.allowedSeats || 1), 0);
    const responseRate = totalGuests > 0 ? Math.round(((confirmedGuests.length + declinedGuests.length) / totalGuests) * 100) : 0;

    // Update Hero Stats & Texts
    const coupleEl = document.getElementById('dash-hero-couple-names');
    const dateEl = document.getElementById('dash-hero-date');
    const venueEl = document.getElementById('dash-hero-venue');
    const rsvpRateEl = document.getElementById('dash-hero-rate');
    const rsvpBarEl = document.getElementById('dash-hero-progress-bar');

    if (coupleEl) coupleEl.innerText = lang === 'ar' ? event.titleAr : event.titleEn;
    if (dateEl) dateEl.innerText = lang === 'ar' ? event.dateFormattedAr : event.dateFormattedEn;
    if (venueEl) venueEl.innerText = lang === 'ar' ? event.venueAr : event.venueEn;
    if (rsvpRateEl) rsvpRateEl.innerText = `${responseRate}%`;
    if (rsvpBarEl) rsvpBarEl.style.width = `${responseRate}%`;

    // Smart Contextual Action Determination
    const ctaBtn = document.getElementById('dash-smart-cta-btn');
    const ctaSub = document.getElementById('dash-smart-cta-sub');
    if (ctaBtn && ctaSub) {
      if (notSentGuests.length > 0) {
        ctaBtn.innerHTML = `<span>💬</span> <span>${lang === 'ar' ? `إرسال الدعوات عبر واتساب (${notSentGuests.length})` : `Send Invites via WhatsApp (${notSentGuests.length})`}</span>`;
        ctaBtn.onclick = () => App.switchView('messages');
        ctaSub.innerText = lang === 'ar' ? 'توجد بطاقات جاهزة للإرسال إلى الضيوف' : 'Invitations ready to dispatch';
      } else if (awaitingGuests.length > 0) {
        ctaBtn.innerHTML = `<span>⏰</span> <span>${lang === 'ar' ? `إرسال تذكير لـ ${awaitingGuests.length} ضيف` : `Send Reminder to ${awaitingGuests.length} Guests`}</span>`;
        ctaBtn.onclick = () => App.switchView('messages');
        ctaSub.innerText = lang === 'ar' ? 'متابعة الردود قبل إغلاق موعد التأكيد' : 'Follow up before RSVP deadline';
      } else {
        ctaBtn.innerHTML = `<span>📱</span> <span>${lang === 'ar' ? 'فتح منصة الاستقبال وبوابة الدخول' : 'Open Reception Door Portal'}</span>`;
        ctaBtn.onclick = () => App.switchView('checkin');
        ctaSub.innerText = lang === 'ar' ? 'جاهز لمسح بطاقات VIP عند البوابة' : 'Ready for gate check-in';
      }
    }

    // Asymmetric KPIs
    const kpiConfirmed = document.getElementById('dash-kpi-confirmed');
    const kpiConfirmedRate = document.getElementById('dash-kpi-confirmed-rate');
    const kpiTotal = document.getElementById('dash-kpi-total');
    const kpiAwaiting = document.getElementById('dash-kpi-awaiting');
    const kpiDeclined = document.getElementById('dash-kpi-declined');
    const kpiCheckedIn = document.getElementById('dash-kpi-checkedin');

    if (kpiConfirmed) kpiConfirmed.innerText = confirmedSeats;
    if (kpiConfirmedRate) kpiConfirmedRate.innerText = `${responseRate}% ${lang === 'ar' ? 'نسبة الاستجابة' : 'response rate'}`;
    if (kpiTotal) kpiTotal.innerText = totalAllowedSeats;
    if (kpiAwaiting) kpiAwaiting.innerText = awaitingGuests.length;
    if (kpiDeclined) kpiDeclined.innerText = declinedGuests.length;
    if (kpiCheckedIn) kpiCheckedIn.innerText = checkedInGuests.length;

    // Segmented RSVP Visualizer Bars
    const confirmedPct = totalGuests > 0 ? (confirmedGuests.length / totalGuests) * 100 : 0;
    const awaitingPct = totalGuests > 0 ? (awaitingGuests.length / totalGuests) * 100 : 0;
    const declinedPct = totalGuests > 0 ? (declinedGuests.length / totalGuests) * 100 : 0;

    const segConfirmed = document.getElementById('dash-seg-confirmed');
    const segAwaiting = document.getElementById('dash-seg-awaiting');
    const segDeclined = document.getElementById('dash-seg-declined');

    if (segConfirmed) segConfirmed.style.width = `${confirmedPct}%`;
    if (segAwaiting) segAwaiting.style.width = `${awaitingPct}%`;
    if (segDeclined) segDeclined.style.width = `${declinedPct}%`;

    // Recent Activity Stream
    const activityList = document.getElementById('dash-recent-activity-list');
    if (activityList) {
      activityList.innerHTML = guests.slice(0, 5).map((g, idx) => {
        const name = (lang === 'ar' ? g.nameAr : g.nameEn) || g.nameAr;
        let actionText = '';
        let badgeClass = '';

        if (g.checkedIn) {
          actionText = lang === 'ar' ? 'تم تسجيل الحضور عند البوابة' : 'Checked in at the gate';
          badgeClass = 'bg-emerald-100 text-emerald-800';
        } else if (g.rsvpStatus === 'attending') {
          actionText = lang === 'ar' ? `أكد الحضور (${g.attendingCount || g.allowedSeats} مقاعد)` : `Confirmed attending (${g.attendingCount || g.allowedSeats} seats)`;
          badgeClass = 'bg-emerald-50 text-emerald-700';
        } else if (g.rsvpStatus === 'declined') {
          actionText = lang === 'ar' ? 'اعتذر عن الحضور وأرسل تهنئة' : 'Declined with warm blessings';
          badgeClass = 'bg-rose-50 text-rose-700';
        } else if (g.inviteSent) {
          actionText = lang === 'ar' ? 'تم إرسال بطاقة الدعوة عبر واتساب' : 'Invitation sent via WhatsApp';
          badgeClass = 'bg-sky-50 text-sky-700';
        } else {
          actionText = lang === 'ar' ? 'تمت إضافة الضيف إلى السجل' : 'Added to guest directory';
          badgeClass = 'bg-slate-100 text-slate-700';
        }

        return `
          <div class="p-3 rounded-2xl bg-white border border-slate-100 flex items-center justify-between gap-3 shadow-2xs">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-8 h-8 rounded-xl bg-[var(--brand-sand)]/70 text-[var(--brand-primary)] font-bold text-xs flex items-center justify-center shrink-0">
                ${name.charAt(0)}
              </div>
              <div class="truncate text-right min-w-0">
                <div class="font-bold text-xs text-slate-900 truncate">${name}</div>
                <div class="text-[10px] text-slate-500 truncate">${actionText}</div>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeClass} shrink-0">
              ${idx === 0 ? (lang === 'ar' ? 'منذ دقائق' : 'mins ago') : idx === 1 ? (lang === 'ar' ? 'اليوم' : 'Today') : (lang === 'ar' ? 'أمس' : 'Yesterday')}
            </span>
          </div>
        `;
      }).join('');
    }
  },

  // Countdown timer ticker for Dashboard Hero
  startCountdownTimer() {
    const targetDate = new Date('2026-10-14T19:30:00').getTime();

    function update() {
      const now = Date.now();
      const diff = targetDate - now;
      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const daysEl = document.getElementById('dash-cd-days');
      const hoursEl = document.getElementById('dash-cd-hours');

      if (daysEl) daysEl.innerText = days;
      if (hoursEl) hoursEl.innerText = hours;
    }

    update();
    setInterval(update, 60000);
  },

  // ==========================================================================
  // WHATSAPP MESSAGE CENTER
  // ==========================================================================
  switchMessageTab(tab) {
    this.activeMessageTab = tab;
    this.renderMessagesCenter();
  },

  renderMessagesCenter() {
    const lang = I18n.currentLang || 'ar';
    const sampleGuest = Store.state.guests[0] || { nameAr: 'هاشم النماري', nameEn: 'Hashim Al-Nemari', token: 'k82f9x' };
    const event = Store.state.event || {};

    const guestName = (lang === 'ar' ? sampleGuest.nameAr : sampleGuest.nameEn) || sampleGuest.nameAr;
    const inviteUrl = `https://quickrsvp.me/i/${sampleGuest.token}`;

    const templates = {
      invite: {
        titleAr: 'بطاقة الدعوة الرسمية (فيديو سينمائي مخصص)',
        titleEn: 'Official Wedding Invitation (Personalized Video)',
        textAr: `السلام عليكم ورحمة الله وبركاته،\nدعوة خاصة ومميزة إلى: ${guestName}\n\nيسعدنا ويشرفنا حضوركم لمشاركتنا فرحة العمر في حفل زفاف مايا & ليام.\n\n📅 الموعد: ${event.dateFormattedAr}\n📍 القاعة: ${event.venueAr}\n\n🎬 لمشاهدة فيديو الدعوة السينمائية المخصصة وتأكيد الحضور:\n${inviteUrl}`,
        textEn: `Dear ${guestName},\nYou are cordially invited to celebrate the wedding of Maya & Liam.\n\n📅 Date: ${event.dateFormattedEn}\n📍 Venue: ${event.venueEn}\n\n🎬 Watch your personalized video invitation & RSVP:\n${inviteUrl}`
      },
      reminder: {
        titleAr: 'تذكير بقرب موعد الحفل',
        titleEn: 'Gentle RSVP Reminder',
        textAr: `مرحباً ${guestName} 🤍\n\nنود تذكيركم بلطف بقرب موعد حفل زفاف مايا & ليام في ${event.dateFormattedAr}.\n\nنرجو التكرم بتأكيد حضوركم عبر الرابط:\n${inviteUrl}`,
        textEn: `Dear ${guestName} 🤍,\n\nThis is a gentle reminder regarding the wedding of Maya & Liam on ${event.dateFormattedEn}.\n\nKindly confirm your attendance here:\n${inviteUrl}`
      },
      location: {
        titleAr: 'موقع القاعة والخرائط',
        titleEn: 'Venue Location & Directions',
        textAr: `أهلاً ${guestName} 📍\n\nإليكم موقع قاعة الحفل وإرشادات الوصول السريع:\nقاعة القصر الكبير - جدة\nرابط الموقع: https://maps.google.com/?q=21.5833,39.1667\n\nنتشرف بحضوركم ورؤيتكم الليلة!`,
        textEn: `Hello ${guestName} 📍,\n\nHere are the location directions to our wedding venue:\nThe Grand Palace - Jeddah\nMaps Link: https://maps.google.com/?q=21.5833,39.1667\n\nLooking forward to seeing you!`
      },
      thank_you: {
        titleAr: 'رسالة شكر وامتنان',
        titleEn: 'Thank You & Gratitude',
        textAr: `شكراً من القلب ${guestName} 🤍\n\nحضوركم ومشاركتكم في ليلتنا المميزة زادنا فرحاً وسروراً. دمتم ودامت دياركم عامرة بالأفراح والمسرات!`,
        textEn: `Heartfelt Thank You, ${guestName} 🤍\n\nYour presence made our wedding celebration truly unforgettable. Wishing you joy and happiness always!`
      }
    };

    const currentTpl = templates[this.activeMessageTab] || templates.invite;
    const bodyText = lang === 'ar' ? currentTpl.textAr : currentTpl.textEn;

    const previewBubble = document.getElementById('wa-preview-bubble-text');
    if (previewBubble) {
      previewBubble.innerText = bodyText;
    }

    const composerTextarea = document.getElementById('wa-composer-textarea');
    if (composerTextarea) {
      composerTextarea.value = bodyText;
    }
  },

  copyWhatsAppText() {
    const composerTextarea = document.getElementById('wa-composer-textarea');
    if (composerTextarea) {
      navigator.clipboard.writeText(composerTextarea.value);
      this.showToast(I18n.t('toast_msg_copied', 'تم نسخ نص الرسالة إلى الحافظة ✓'));
    }
  },

  // ==========================================================================
  // CONVERSION FUNNEL ANALYTICS
  // ==========================================================================
  renderAnalytics() {
    const guests = Store.state.guests || [];
    const total = guests.length || 1;

    const invited = guests.filter(g => g.inviteSent).length;
    const opened = Math.round(invited * 0.88) || (invited > 0 ? 1 : 0);
    const responded = guests.filter(g => g.rsvpStatus === 'attending' || g.rsvpStatus === 'declined').length;
    const confirmed = guests.filter(g => g.rsvpStatus === 'attending').length;
    const checkedIn = guests.filter(g => g.checkedIn).length;

    const funnelStages = [
      { id: 'funnel-bar-invited', count: invited, pct: Math.round((invited / total) * 100) },
      { id: 'funnel-bar-opened', count: opened, pct: Math.round((opened / total) * 100) },
      { id: 'funnel-bar-responded', count: responded, pct: Math.round((responded / total) * 100) },
      { id: 'funnel-bar-confirmed', count: confirmed, pct: Math.round((confirmed / total) * 100) },
      { id: 'funnel-bar-checkedin', count: checkedIn, pct: Math.round((checkedIn / total) * 100) }
    ];

    funnelStages.forEach(st => {
      const barEl = document.getElementById(st.id);
      const countEl = document.getElementById(`${st.id}-count`);
      if (barEl) barEl.style.width = `${Math.max(st.pct, 8)}%`;
      if (countEl) countEl.innerText = `${st.count} (${st.pct}%)`;
    });

    // Catering Breakdown
    const beefCount = guests.filter(g => g.mealChoice === 'beef').length;
    const salmonCount = guests.filter(g => g.mealChoice === 'salmon').length;
    const vegCount = guests.filter(g => g.mealChoice === 'vegetarian').length;

    const beefEl = document.getElementById('analytics-meal-beef');
    const salmonEl = document.getElementById('analytics-meal-salmon');
    const vegEl = document.getElementById('analytics-meal-veg');

    if (beefEl) beefEl.innerText = beefCount;
    if (salmonEl) salmonEl.innerText = salmonCount;
    if (vegEl) vegEl.innerText = vegCount;
  },

  // ==========================================================================
  // SETTINGS (8 Categorized Vertical Panels)
  // ==========================================================================
  switchSettingsCategory(cat) {
    this.activeSettingsCategory = cat;
    const categories = ['event', 'invitation', 'rsvp', 'guests', 'languages', 'checkin', 'backup', 'privacy'];

    categories.forEach(c => {
      const panel = document.getElementById(`settings-panel-${c}`);
      const btn = document.getElementById(`settings-cat-btn-${c}`);
      if (panel) {
        if (c === cat) panel.classList.remove('hidden');
        else panel.classList.add('hidden');
      }
      if (btn) {
        if (c === cat) {
          btn.className = "w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-[var(--brand-primary)] text-white font-bold text-xs shadow-xs transition";
        } else {
          btn.className = "w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200/80 transition";
        }
      }
    });
  },

  renderSettings() {
    const event = Store.state.event || {};
    const titleInput = document.getElementById('setting-event-title');
    const dateInput = document.getElementById('setting-event-date');
    const venueInput = document.getElementById('setting-event-venue');

    if (titleInput) titleInput.value = event.titleAr || '';
    if (dateInput) dateInput.value = event.dateFormattedAr || '';
    if (venueInput) venueInput.value = event.venueAr || '';

    this.switchSettingsCategory(this.activeSettingsCategory);
  },

  saveSettings() {
    const title = document.getElementById('setting-event-title')?.value || '';
    const date = document.getElementById('setting-event-date')?.value || '';
    const venue = document.getElementById('setting-event-venue')?.value || '';

    Store.state.event.titleAr = title;
    Store.state.event.dateFormattedAr = date;
    Store.state.event.venueAr = venue;
    Store.saveToStorage();

    this.showToast(I18n.t('toast_settings_saved', 'تم حفظ كافة الإعدادات بنجاح ✓'));
  }
};

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

if (typeof window !== 'undefined') {
  window.App = App;
}
