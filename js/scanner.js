/**
 * QuickRSVP - Gate QR Scanner & Event Reception Mode Controller
 * Full-Screen Event Staff Mode, Web Audio Sound Chimes, Duplicate Entry Protection,
 * Real-Time Arrivals Feed, and Jargon-Free Arabic/English UI
 */

const Scanner = {
  isScanning: false,
  isReceptionMode: false,
  audioCtx: null,

  init() {
    this.renderLiveDoorStats();
    this.renderRecentArrivals();
  },

  // Play synthesized luxury audio chime using Web Audio API
  playSound(type) {
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, this.audioCtx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.35);
      } else if (type === 'warning') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
        osc.frequency.setValueAtTime(196, this.audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.4);
      }
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  },

  // Toggle Full-Screen Event Staff Reception Mode
  toggleReceptionMode(forceState) {
    const modal = document.getElementById('reception-fullscreen-modal');
    if (!modal) return;

    this.isReceptionMode = forceState !== undefined ? forceState : !this.isReceptionMode;

    if (this.isReceptionMode) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
    this.renderLiveDoorStats();
  },

  // Process a Scanned QR token or Manual Search entry
  processScannedPayload(payload) {
    let token = (payload || '').trim();
    if (token.includes('/entry/')) {
      token = token.split('/entry/')[1].split('?')[0].split('#')[0];
    } else if (token.includes('token=')) {
      token = token.split('token=')[1].split('&')[0];
    }

    const res = Store.checkInGuest(token);
    const lang = I18n.currentLang || 'ar';

    // Update results in both standard and reception mode
    ['scanner-result-box', 'reception-result-box'].forEach(boxId => {
      const resultBox = document.getElementById(boxId);
      if (!resultBox) return;

      resultBox.classList.remove('hidden');

      if (res.success) {
        this.playSound('success');
        const guest = res.guest;
        const name = (lang === 'ar' ? guest.nameAr : guest.nameEn) || guest.nameAr || guest.nameEn;
        const group = (lang === 'ar' ? guest.groupAr : guest.groupEn) || guest.groupAr || guest.groupEn || 'عام';

        resultBox.className = "p-6 rounded-3xl bg-emerald-950 text-white border-2 border-emerald-400 shadow-2xl text-center space-y-3 animate-fadeIn";
        resultBox.innerHTML = `
          <div class="w-14 h-14 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            ✓
          </div>
          <div>
            <h3 class="text-2xl font-bold font-serif">${name}</h3>
            <p class="text-xs text-emerald-200">${group} • ${guest.attendingCount || guest.allowedSeats} ${lang === 'ar' ? 'مقاعد' : 'seats'}</p>
          </div>
          <div class="inline-block px-4 py-1.5 rounded-full bg-emerald-900 text-emerald-100 text-xs font-bold border border-emerald-400/50">
            ${lang === 'ar' ? 'تم تأكيد الحضور والدخول' : 'Access Granted & Checked In'} • ${lang === 'ar' ? 'طاولة:' : 'Table:'} ${guest.tableNo}
          </div>
          <div class="text-[11px] text-emerald-300 font-mono">${lang === 'ar' ? 'وقت الدخول:' : 'Recorded at:'} ${res.checkedInAt}</div>
        `;
      } else if (res.alreadyCheckedIn) {
        this.playSound('warning');
        const guest = res.guest;
        const name = (lang === 'ar' ? guest.nameAr : guest.nameEn) || guest.nameAr;

        resultBox.className = "p-6 rounded-3xl bg-amber-950 text-white border-2 border-amber-400 shadow-2xl text-center space-y-3 animate-fadeIn";
        resultBox.innerHTML = `
          <div class="w-14 h-14 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            ⚠️
          </div>
          <div>
            <h3 class="text-2xl font-bold font-serif">${name}</h3>
            <p class="text-xs text-amber-200">${lang === 'ar' ? 'تم تسجيل حضور هذا الضيف مسبقاً' : 'Guest already checked in'}</p>
          </div>
          <div class="p-3 bg-amber-900/60 rounded-xl text-xs text-amber-100 border border-amber-400/30">
            <div>${lang === 'ar' ? 'وقت تسجيل الدخول الأول:' : 'Initial Check-in Time:'} <strong class="font-mono">${res.checkedInAt}</strong></div>
            <div>${lang === 'ar' ? 'طاولة الضيف:' : 'Assigned Table:'} <strong>${guest.tableNo}</strong></div>
          </div>
          <button type="button" onclick="Scanner.allowOverride('${token}')" class="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs shadow-md transition">
            ${lang === 'ar' ? 'السماح بالدخول الإضافي ✓' : 'Allow Additional Entry ✓'}
          </button>
        `;
      } else {
        this.playSound('warning');
        resultBox.className = "p-6 rounded-3xl bg-rose-950 text-white border-2 border-rose-400 shadow-2xl text-center space-y-3 animate-fadeIn";
        resultBox.innerHTML = `
          <div class="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-3xl font-bold mx-auto shadow-md">
            ✕
          </div>
          <h3 class="text-xl font-bold font-serif">${lang === 'ar' ? 'رمز الدخول غير صالح' : 'Invalid Entry Token'}</h3>
          <p class="text-xs text-rose-200">${lang === 'ar' ? 'لم يتم العثور على أي ضيف مطابق لهذا الرمز' : 'No guest matching this token found in database'}</p>
        `;
      }
    });

    this.renderLiveDoorStats();
    this.renderRecentArrivals();
  },

  allowOverride(token) {
    App.showToast(I18n.currentLang === 'ar' ? 'تم السماح بالدخول الإضافي' : 'Additional entry allowed');
    const resultBox = document.getElementById('scanner-result-box');
    const recBox = document.getElementById('reception-result-box');
    if (resultBox) resultBox.classList.add('hidden');
    if (recBox) recBox.classList.add('hidden');
  },

  // Simulate scanning sample guest
  simulateScan(sampleToken = 'k82f9x') {
    this.processScannedPayload(sampleToken);
  },

  // Manual search by guest name or phone
  handleManualSearch(query) {
    if (!query || query.trim().length < 2) return;
    const q = query.trim().toLowerCase();
    const guest = Store.state.guests.find(g =>
      (g.nameAr && g.nameAr.toLowerCase().includes(q)) ||
      (g.nameEn && g.nameEn.toLowerCase().includes(q)) ||
      (g.phone && g.phone.includes(q)) ||
      (g.token && g.token.toLowerCase() === q)
    );

    if (guest) {
      this.processScannedPayload(guest.token);
    } else {
      this.processScannedPayload('invalid_token');
    }
  },

  renderLiveDoorStats() {
    const guests = Store.state.guests || [];
    const checkedInGuests = guests.filter(g => g.checkedIn);
    const confirmedGuests = guests.filter(g => g.rsvpStatus === 'attending');

    const totalArrivedSeats = checkedInGuests.reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);
    const totalExpectedSeats = confirmedGuests.reduce((sum, g) => sum + (g.attendingCount || g.allowedSeats || 1), 0);

    const percent = totalExpectedSeats > 0 ? Math.round((totalArrivedSeats / totalExpectedSeats) * 100) : 0;

    ['door-stat-arrived', 'reception-stat-arrived'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = totalArrivedSeats;
    });

    ['door-stat-expected', 'reception-stat-expected'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = totalExpectedSeats;
    });

    ['door-stat-rate', 'reception-stat-rate'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerText = `${percent}%`;
    });
  },

  renderRecentArrivals() {
    const container = document.getElementById('recent-arrivals-list');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const checkedIn = (Store.state.guests || []).filter(g => g.checkedIn);

    if (checkedIn.length === 0) {
      container.innerHTML = `
        <div class="p-6 text-center text-slate-400 text-xs">
          ${lang === 'ar' ? 'لم يتم تسجيل أي حضور حتى الآن' : 'No check-ins recorded yet'}
        </div>
      `;
      return;
    }

    container.innerHTML = checkedIn.slice(0, 8).map(g => {
      const name = (lang === 'ar' ? g.nameAr : g.nameEn) || g.nameAr;
      return `
        <div class="p-3 rounded-2xl bg-white border border-slate-100 flex items-center justify-between gap-3 shadow-2xs">
          <div class="flex items-center gap-2.5 min-w-0">
            <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
              ✓
            </div>
            <div class="truncate text-right">
              <div class="text-xs font-bold text-slate-900 truncate">${name}</div>
              <div class="text-[10px] text-slate-500 font-mono">طاولة: ${g.tableNo} • ${g.attendingCount || g.allowedSeats} أفراد</div>
            </div>
          </div>
          <span class="text-[10px] text-slate-400 font-mono shrink-0">${g.checkedInAt || 'الآن'}</span>
        </div>
      `;
    }).join('');
  }
};

if (typeof window !== 'undefined') {
  window.Scanner = Scanner;
}
