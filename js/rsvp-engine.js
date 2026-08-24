/**
 * QuickRSVP - Progressive RSVP Interaction Engine
 * Implements smooth progressive disclosure, companion management, meal selection, and VIP pass generation
 */

const RsvpEngine = {
  currentGuest: null,
  currentStatus: null, // 'attending' | 'declined'

  mount(containerEl, guestToken) {
    if (!containerEl) return;
    const guest = Store.getGuestByToken(guestToken) || Store.state.guests[0];
    this.currentGuest = guest;
    this.currentStatus = guest.rsvpStatus === 'attending' || guest.rsvpStatus === 'declined' ? guest.rsvpStatus : null;

    this.render(containerEl);
  },

  render(containerEl) {
    const lang = I18n.currentLang;
    const guest = this.currentGuest;
    const isAlreadyAnswered = guest.rsvpStatus === 'attending' || guest.rsvpStatus === 'declined';

    if (isAlreadyAnswered && !this.isEditing) {
      containerEl.innerHTML = this.renderSuccessState(guest, lang);
      // Generate QR Code if attending
      if (guest.rsvpStatus === 'attending') {
        setTimeout(() => this.generatePassQrCode(guest.token), 100);
      }
      return;
    }

    containerEl.innerHTML = `
      <div class="theme-card p-6 md:p-8 space-y-6 rounded-3xl bg-[var(--theme-surface)] border-2 border-[var(--theme-accent)]/40 shadow-lg text-center" id="rsvp-interactive-card">
        
        <!-- Header -->
        <div class="space-y-2">
          <span class="text-xs font-bold uppercase tracking-widest text-[var(--theme-accent)]">RSVP</span>
          <h2 class="text-2xl md:text-3xl font-bold font-serif text-[var(--theme-primary)]">
            ${I18n.t('rsvp_question')}
          </h2>
          <p class="text-xs text-[var(--theme-text-muted)]">
            ${lang === 'ar' ? 'دعوة مخصصة لـ' : 'Invitation for'} <span class="font-bold text-[var(--theme-primary)]">${lang === 'ar' ? guest.nameAr : guest.nameEn}</span> (${guest.allowedSeats} ${lang === 'ar' ? 'مقاعد' : 'seats'})
          </p>
        </div>

        <!-- Step 1: Binary Choice Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <button type="button" onclick="RsvpEngine.selectChoice('attending')" class="py-4 px-5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${this.currentStatus === 'attending' ? 'bg-[var(--theme-primary)] text-white ring-2 ring-[var(--theme-accent)] shadow-md' : 'bg-[var(--theme-surface-alt)] text-[var(--theme-primary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]'}">
            <span>🤍</span>
            <span>${I18n.t('rsvp_btn_attending')}</span>
          </button>

          <button type="button" onclick="RsvpEngine.selectChoice('declined')" class="py-4 px-5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${this.currentStatus === 'declined' ? 'bg-rose-900 text-white ring-2 ring-rose-400 shadow-md' : 'bg-[var(--theme-surface-alt)] text-rose-800 border border-[var(--theme-border)] hover:bg-rose-50'}">
            <span>💌</span>
            <span>${I18n.t('rsvp_btn_declined')}</span>
          </button>
        </div>

        <!-- Step 2A: Progressive Form for Attending -->
        ${this.currentStatus === 'attending' ? this.renderAttendingForm(guest, lang) : ''}

        <!-- Step 2B: Progressive Form for Declining -->
        ${this.currentStatus === 'declined' ? this.renderDeclinedForm(guest, lang) : ''}

      </div>
    `;
  },

  renderAttendingForm(guest, lang) {
    const maxSeats = guest.allowedSeats || 1;

    return `
      <div class="pt-6 border-t border-[var(--theme-border)] space-y-5 text-right max-w-md mx-auto animate-fadeIn">
        
        <!-- Attending Headcount Selector (if > 1 allowed) -->
        ${maxSeats > 1 ? `
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-[var(--theme-text)]">
              ${I18n.t('rsvp_attending_count_label')}
            </label>
            <select id="rsvp-count-select" onchange="RsvpEngine.updateCompanionInputs(this.value)" class="w-full px-4 py-2.5 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] text-xs font-semibold text-[var(--theme-text)] focus:ring-2 focus:ring-[var(--theme-primary)] outline-none">
              ${Array.from({ length: maxSeats }, (_, i) => i + 1).map(n => `
                <option value="${n}" ${n === (guest.attendingCount || maxSeats) ? 'selected' : ''}>${n} ${lang === 'ar' ? (n === 1 ? 'ضيف (بمفردي)' : n === 2 ? 'ضيفان' : 'ضيوف') : (n === 1 ? 'Guest (Solo)' : 'Guests')}</option>
              `).join('')}
            </select>
          </div>
        ` : ''}

        <!-- Companion Names Container -->
        <div id="rsvp-companions-container" class="space-y-2">
          ${this.renderCompanionFields(guest.attendingCount || maxSeats, lang)}
        </div>

        <!-- Meal Selection -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-[var(--theme-text)]">
            ${I18n.t('rsvp_meal_choice_label')}
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label class="p-3 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] flex items-center gap-2 cursor-pointer hover:border-[var(--theme-accent)]">
              <input type="radio" name="rsvp_meal" value="beef" checked class="text-[var(--theme-primary)] focus:ring-[var(--theme-accent)]">
              <span class="text-xs font-semibold text-[var(--theme-text)]">${lang === 'ar' ? '🥩 لحم العجل بالكمأة' : '🥩 Truffle Angus Beef'}</span>
            </label>
            <label class="p-3 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] flex items-center gap-2 cursor-pointer hover:border-[var(--theme-accent)]">
              <input type="radio" name="rsvp_meal" value="salmon" class="text-[var(--theme-primary)] focus:ring-[var(--theme-accent)]">
              <span class="text-xs font-semibold text-[var(--theme-text)]">${lang === 'ar' ? '🐟 السلمون المشوي' : '🐟 Atlantic Salmon'}</span>
            </label>
            <label class="p-3 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] flex items-center gap-2 cursor-pointer hover:border-[var(--theme-accent)] sm:col-span-2">
              <input type="radio" name="rsvp_meal" value="vegetarian" class="text-[var(--theme-primary)] focus:ring-[var(--theme-accent)]">
              <span class="text-xs font-semibold text-[var(--theme-text)]">${lang === 'ar' ? '🥗 طبق نباتي فاخر (خالي من الجلوتين)' : '🥗 Artisanal Vegetarian (Gluten-Free)'}</span>
            </label>
          </div>
        </div>

        <!-- Allergies -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-[var(--theme-text)]">
            ${I18n.t('rsvp_allergies_label')}
          </label>
          <input type="text" id="rsvp-allergies-input" value="${guest.dietaryNotes || ''}" placeholder="${I18n.t('rsvp_allergies_ph')}" class="w-full px-4 py-2.5 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] focus:ring-2 focus:ring-[var(--theme-primary)] outline-none">
        </div>

        <!-- Warm Notes -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-[var(--theme-text)]">
            ${I18n.t('rsvp_notes_label')}
          </label>
          <textarea id="rsvp-wishes-input" rows="2" placeholder="${I18n.t('rsvp_notes_ph')}" class="w-full px-4 py-2.5 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] focus:ring-2 focus:ring-[var(--theme-primary)] outline-none">${guest.wishes || ''}</textarea>
        </div>

        <!-- Submit Button -->
        <button type="button" onclick="RsvpEngine.submitAttending()" class="w-full py-4 rounded-2xl bg-[var(--theme-primary)] text-white font-bold text-sm shadow-xl hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2">
          <span>✨</span>
          <span>${I18n.t('rsvp_submit_btn')}</span>
        </button>
      </div>
    `;
  },

  renderDeclinedForm(guest, lang) {
    return `
      <div class="pt-6 border-t border-[var(--theme-border)] space-y-4 text-right max-w-md mx-auto animate-fadeIn">
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-[var(--theme-text)]">
            ${lang === 'ar' ? 'رسالة تهنئة ومباركة للعروسين:' : 'Warm wishes to the couple:'}
          </label>
          <textarea id="rsvp-decline-wishes-input" rows="3" placeholder="${lang === 'ar' ? 'نعتز بمشاعركم وكلماتكم الطيبة...' : 'Share your warm blessings...'}" class="w-full px-4 py-2.5 rounded-xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] focus:ring-2 focus:ring-[var(--theme-primary)] outline-none">${guest.wishes || ''}</textarea>
        </div>

        <button type="button" onclick="RsvpEngine.submitDeclined()" class="w-full py-3.5 rounded-2xl bg-rose-900 text-white font-bold text-xs shadow-lg hover:bg-rose-950 transition">
          <span>💌</span>
          <span>${I18n.t('rsvp_decline_submit_btn')}</span>
        </button>
      </div>
    `;
  },

  renderCompanionFields(count, lang) {
    if (count <= 1) return '';
    let html = `<div class="p-3 bg-[var(--theme-surface-alt)] rounded-xl border border-[var(--theme-border)] space-y-2">
      <div class="text-[11px] font-bold text-[var(--theme-accent)]">${lang === 'ar' ? 'أسماء المرافقين الإضافيين:' : 'Additional Companion Names:'}</div>`;
    for (let i = 2; i <= count; i++) {
      html += `
        <input type="text" id="companion-name-${i}" placeholder="${lang === 'ar' ? `اسم المرافق ${i}` : `Companion ${i} Name`}" class="w-full px-3 py-2 text-xs rounded-lg bg-white border border-[var(--theme-border)] text-gray-800">
      `;
    }
    html += `</div>`;
    return html;
  },

  updateCompanionInputs(val) {
    const count = parseInt(val, 10);
    const container = document.getElementById('rsvp-companions-container');
    if (container) {
      container.innerHTML = this.renderCompanionFields(count, I18n.currentLang);
    }
  },

  selectChoice(status) {
    this.currentStatus = status;
    const container = document.getElementById('interactive-rsvp-mount-container');
    if (container) {
      this.render(container);
    }
  },

  submitAttending() {
    const countEl = document.getElementById('rsvp-count-select');
    const attendingCount = countEl ? parseInt(countEl.value, 10) : 1;
    const mealEl = document.querySelector('input[name="rsvp_meal"]:checked');
    const mealChoice = mealEl ? mealEl.value : 'beef';
    const dietaryNotes = document.getElementById('rsvp-allergies-input')?.value || '';
    const wishes = document.getElementById('rsvp-wishes-input')?.value || '';

    // Collect companions
    const companions = [];
    for (let i = 2; i <= attendingCount; i++) {
      const compName = document.getElementById(`companion-name-${i}`)?.value || `مرافق ${i}`;
      companions.push({ name: compName, meal: mealChoice, allergies: dietaryNotes });
    }

    Store.submitRsvp(this.currentGuest.token, {
      status: 'attending',
      attendingCount,
      companions,
      mealChoice,
      dietaryNotes,
      wishes
    });

    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast(I18n.t('toast_rsvp_success'));
    }

    // Refresh display to Confirmation Card
    const container = document.getElementById('interactive-rsvp-mount-container');
    if (container) {
      this.isEditing = false;
      this.render(container);
    }
  },

  submitDeclined() {
    const wishes = document.getElementById('rsvp-decline-wishes-input')?.value || '';

    Store.submitRsvp(this.currentGuest.token, {
      status: 'declined',
      attendingCount: 0,
      companions: [],
      mealChoice: null,
      dietaryNotes: '',
      wishes
    });

    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast(I18n.t('toast_rsvp_success'));
    }

    const container = document.getElementById('interactive-rsvp-mount-container');
    if (container) {
      this.isEditing = false;
      this.render(container);
    }
  },

  renderSuccessState(guest, lang) {
    if (guest.rsvpStatus === 'attending') {
      return `
        <div class="theme-card p-6 md:p-8 space-y-6 rounded-3xl bg-[var(--theme-surface)] border-2 border-[var(--theme-accent)] shadow-xl text-center animate-fadeIn">
          <div class="w-16 h-16 rounded-full bg-[var(--theme-primary)] text-[var(--theme-accent-light)] flex items-center justify-center text-3xl mx-auto shadow-md">
            ✓
          </div>
          
          <div class="space-y-1">
            <h2 class="text-2xl font-bold font-serif text-[var(--theme-primary)]">
              ${I18n.t('rsvp_success_title')}
            </h2>
            <p class="text-xs md:text-sm text-[var(--theme-text-muted)] max-w-md mx-auto">
              ${I18n.t('rsvp_success_subtitle')}
            </p>
          </div>

          <!-- Summary Badge Details -->
          <div class="p-4 rounded-2xl bg-[var(--theme-surface-alt)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] space-y-1.5 max-w-sm mx-auto text-right">
            <div class="flex justify-between font-bold">
              <span>${lang === 'ar' ? 'عدد المقاعد المؤكدة:' : 'Confirmed Seats:'}</span>
              <span class="text-[var(--theme-accent)]">${guest.attendingCount} ${lang === 'ar' ? 'مقاعد' : 'Seats'}</span>
            </div>
            <div class="flex justify-between">
              <span>${lang === 'ar' ? 'الطاولة المخصصة:' : 'Assigned Table:'}</span>
              <span class="font-semibold text-[var(--theme-primary)]">${guest.tableNo}</span>
            </div>
          </div>

          <!-- VIP PASS PREVIEW -->
          <div class="p-5 rounded-2xl bg-white border-2 border-[var(--theme-accent)] inline-block shadow-lg">
            <div class="text-[10px] font-bold text-[var(--theme-accent)] mb-2 uppercase tracking-wider">VIP GATE PASS</div>
            <div id="rsvp-confirmation-qrcode" class="flex items-center justify-center min-w-[130px] min-h-[130px] mx-auto"></div>
            <div class="text-[10px] font-mono text-gray-500 mt-2">ID: ${guest.token}</div>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button onclick="RsvpEngine.editRsvp()" class="text-xs text-[var(--theme-accent)] hover:underline font-bold">
              ✏️ ${lang === 'ar' ? 'تعديل رد التأكيد' : 'Edit RSVP Response'}
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="theme-card p-6 md:p-8 space-y-5 rounded-3xl bg-[var(--theme-surface)] border border-[var(--theme-border)] shadow-md text-center animate-fadeIn">
          <div class="w-14 h-14 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-2xl mx-auto">
            💌
          </div>
          <div class="space-y-1">
            <h2 class="text-2xl font-bold font-serif text-[var(--theme-primary)]">
              ${I18n.t('rsvp_decline_success_title')}
            </h2>
            <p class="text-xs text-[var(--theme-text-muted)] max-w-md mx-auto">
              ${I18n.t('rsvp_decline_success_subtitle')}
            </p>
          </div>
          <button onclick="RsvpEngine.editRsvp()" class="text-xs text-[var(--theme-accent)] hover:underline font-bold pt-2">
            ✏️ ${lang === 'ar' ? 'تغيير الرد إلى تأكيد الحضور' : 'Change Response to Attending'}
          </button>
        </div>
      `;
    }
  },

  editRsvp() {
    this.isEditing = true;
    const container = document.getElementById('interactive-rsvp-mount-container');
    if (container) {
      this.render(container);
    }
  },

  generatePassQrCode(token) {
    const el = document.getElementById('rsvp-confirmation-qrcode') || document.getElementById('guest-qrcode-canvas');
    if (!el || typeof QRCode === 'undefined') return;
    el.innerHTML = '';
    new QRCode(el, {
      text: `https://quickrsvp.me/entry/${token}`,
      width: 130,
      height: 130,
      colorDark: '#0A2E23',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }
};

if (typeof window !== 'undefined') {
  window.RsvpEngine = RsvpEngine;
}
