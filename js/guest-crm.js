/**
 * QuickRSVP - Guest Management & CRM Controller
 * High-Density Data Table, Multi-Criteria Filter Bar, Slide-Out Guest Drawer,
 * Responsive Mobile Cards, CSV Import/Export, and WhatsApp Dispatch
 */

const GuestCRM = {
  currentFilter: 'all',
  searchQuery: '',
  activeDrawerGuestId: null,

  init() {
    this.render();
  },

  setFilter(filterKey) {
    this.currentFilter = filterKey;
    this.render();
  },

  setSearch(query) {
    this.searchQuery = (query || '').trim().toLowerCase();
    this.render();
  },

  getFilteredGuests() {
    let list = Store.getGuests() || [];

    if (this.currentFilter === 'attending') {
      list = list.filter(g => g.rsvpStatus === 'attending');
    } else if (this.currentFilter === 'declined') {
      list = list.filter(g => g.rsvpStatus === 'declined');
    } else if (this.currentFilter === 'awaiting') {
      list = list.filter(g => g.rsvpStatus === 'awaiting');
    } else if (this.currentFilter === 'not_sent') {
      list = list.filter(g => !g.inviteSent || g.rsvpStatus === 'not_sent');
    } else if (this.currentFilter === 'checked_in') {
      list = list.filter(g => g.checkedIn);
    } else if (this.currentFilter === 'families') {
      list = list.filter(g => g.allowedSeats > 1);
    }

    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(g =>
        (g.nameAr && g.nameAr.toLowerCase().includes(q)) ||
        (g.nameEn && g.nameEn.toLowerCase().includes(q)) ||
        (g.phone && g.phone.includes(q)) ||
        (g.groupAr && g.groupAr.toLowerCase().includes(q)) ||
        (g.groupEn && g.groupEn.toLowerCase().includes(q)) ||
        (g.tableNo && g.tableNo.toLowerCase().includes(q)) ||
        (g.token && g.token.toLowerCase().includes(q))
      );
    }

    return list;
  },

  render() {
    this.renderFilterChips();
    this.renderGuestsDesktopTable();
    this.renderGuestsMobileCards();
    this.renderHeaderSummaryStats();
  },

  renderHeaderSummaryStats() {
    const totalEl = document.getElementById('crm-stat-total');
    const confirmedEl = document.getElementById('crm-stat-confirmed');
    const awaitingEl = document.getElementById('crm-stat-awaiting');
    const checkedInEl = document.getElementById('crm-stat-checkedin');

    const guests = Store.state.guests || [];
    if (totalEl) totalEl.innerText = guests.length;
    if (confirmedEl) confirmedEl.innerText = guests.filter(g => g.rsvpStatus === 'attending').length;
    if (awaitingEl) awaitingEl.innerText = guests.filter(g => g.rsvpStatus === 'awaiting').length;
    if (checkedInEl) checkedInEl.innerText = guests.filter(g => g.checkedIn).length;
  },

  renderFilterChips() {
    const container = document.getElementById('crm-filter-chips-container');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const guests = Store.state.guests || [];

    const filters = [
      { key: 'all', label: lang === 'ar' ? 'الكل' : 'All', count: guests.length },
      { key: 'attending', label: lang === 'ar' ? 'مؤكد الحضور' : 'Attending', count: guests.filter(g => g.rsvpStatus === 'attending').length },
      { key: 'awaiting', label: lang === 'ar' ? 'بانتظار الرد' : 'Awaiting', count: guests.filter(g => g.rsvpStatus === 'awaiting').length },
      { key: 'declined', label: lang === 'ar' ? 'المعتذرون' : 'Declined', count: guests.filter(g => g.rsvpStatus === 'declined').length },
      { key: 'checked_in', label: lang === 'ar' ? 'الحاضرون بالقاعة' : 'Checked In', count: guests.filter(g => g.checkedIn).length },
      { key: 'families', label: lang === 'ar' ? 'عائلات ومجموعات' : 'Families', count: guests.filter(g => g.allowedSeats > 1).length },
      { key: 'not_sent', label: lang === 'ar' ? 'لم تُرسل' : 'Not Sent', count: guests.filter(g => !g.inviteSent).length }
    ];

    container.innerHTML = filters.map(f => `
      <button type="button" onclick="GuestCRM.setFilter('${f.key}')" class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${this.currentFilter === f.key ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}">
        <span>${f.label}</span>
        <span class="px-1.5 py-0.2 text-[10px] rounded-full ${this.currentFilter === f.key ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'} font-mono">${f.count}</span>
      </button>
    `).join('');
  },

  renderGuestsDesktopTable() {
    const container = document.getElementById('crm-table-tbody');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const guests = this.getFilteredGuests();

    if (guests.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="7" class="py-16 text-center text-slate-500 text-xs">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-xl mb-2">🔍</div>
            <p class="font-bold">${lang === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching guests found'}</p>
            <p class="text-[11px] text-slate-400 mt-1">${lang === 'ar' ? 'جرب البحث باسم آخر أو إزالة التصفية الحالية' : 'Try searching with another name or clear filters'}</p>
          </td>
        </tr>
      `;
      return;
    }

    container.innerHTML = guests.map(g => {
      const name = (lang === 'ar' ? g.nameAr : g.nameEn) || g.nameAr || g.nameEn;
      const group = (lang === 'ar' ? g.groupAr : g.groupEn) || g.groupAr || g.groupEn || 'عام';
      const seats = g.allowedSeats || 1;
      const attendingCount = g.attendingCount || 0;

      // Status Badge
      let statusBadge = '';
      if (g.rsvpStatus === 'attending') {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          <span>${lang === 'ar' ? 'حاضر' : 'Attending'} (${attendingCount})</span>
        </span>`;
      } else if (g.rsvpStatus === 'declined') {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
          <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          <span>${lang === 'ar' ? 'اعتذر' : 'Declined'}</span>
        </span>`;
      } else {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>${lang === 'ar' ? 'بانتظار الرد' : 'Awaiting'}</span>
        </span>`;
      }

      // Meal badge
      let mealLabel = '—';
      if (g.mealChoice === 'beef') mealLabel = lang === 'ar' ? '🥩 لحم العجل' : '🥩 Beef';
      else if (g.mealChoice === 'salmon') mealLabel = lang === 'ar' ? '🐟 سلمون' : '🐟 Salmon';
      else if (g.mealChoice === 'vegetarian') mealLabel = lang === 'ar' ? '🥗 نباتي' : '🥗 Veg';

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 cursor-pointer" onclick="GuestCRM.openGuestDrawer('${g.id}')">
          
          <!-- Guest Name & Group -->
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-[var(--brand-sand)]/70 text-[var(--brand-primary)] font-bold text-xs flex items-center justify-center shrink-0">
                ${name.charAt(0)}
              </div>
              <div class="min-w-0">
                <div class="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                  <span>${name}</span>
                  ${g.tableNo && g.tableNo.includes('VIP') ? '<span class="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-amber-100 text-amber-900 rounded">VIP</span>' : ''}
                </div>
                <div class="text-[11px] text-slate-500 truncate">${group}</div>
              </div>
            </div>
          </td>

          <!-- Contact Phone -->
          <td class="py-3.5 px-4 text-xs font-mono text-slate-600 dir-ltr text-right">
            ${g.phone || '—'}
          </td>

          <!-- Allowed Seats & Attendance -->
          <td class="py-3.5 px-4 text-xs text-center font-bold text-slate-700">
            ${seats} ${lang === 'ar' ? 'مقاعد' : 'seats'}
          </td>

          <!-- RSVP Status -->
          <td class="py-3.5 px-4 text-center">
            ${statusBadge}
          </td>

          <!-- Meal Choice -->
          <td class="py-3.5 px-4 text-xs text-slate-600 truncate">
            ${mealLabel}
          </td>

          <!-- Table -->
          <td class="py-3.5 px-4 text-xs font-semibold text-slate-700">
            ${g.tableNo || 'Unassigned'}
          </td>

          <!-- Actions (WhatsApp, Edit, Delete) -->
          <td class="py-3.5 px-4 text-left" onclick="event.stopPropagation()">
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" onclick="GuestCRM.sendWhatsApp('${g.id}')" title="إرسال عبر واتساب" class="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition">
                ${Icons.get('whatsapp')}
              </button>
              <button type="button" onclick="GuestCRM.openGuestDrawer('${g.id}')" title="عرض التفاصيل" class="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition">
                ${Icons.get('edit')}
              </button>
              <button type="button" onclick="GuestCRM.deleteGuest('${g.id}')" title="حذف" class="p-2 rounded-lg hover:bg-rose-50 text-rose-500 transition">
                ${Icons.get('trash')}
              </button>
            </div>
          </td>

        </tr>
      `;
    }).join('');
  },

  renderGuestsMobileCards() {
    const container = document.getElementById('crm-mobile-cards-container');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const guests = this.getFilteredGuests();

    if (guests.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 text-xs">
          <p class="font-bold">${lang === 'ar' ? 'لا توجد نتائج' : 'No guests found'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = guests.map(g => {
      const name = (lang === 'ar' ? g.nameAr : g.nameEn) || g.nameAr || g.nameEn;
      const group = (lang === 'ar' ? g.groupAr : g.groupEn) || g.groupAr || g.groupEn || 'عام';

      return `
        <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3" onclick="GuestCRM.openGuestDrawer('${g.id}')">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl bg-[var(--brand-sand)]/70 text-[var(--brand-primary)] font-bold text-xs flex items-center justify-center">
                ${name.charAt(0)}
              </div>
              <div>
                <h4 class="text-xs font-bold text-slate-900">${name}</h4>
                <span class="text-[10px] text-slate-500">${group} • ${g.allowedSeats} مقاعد</span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${g.rsvpStatus === 'attending' ? 'bg-emerald-50 text-emerald-800' : g.rsvpStatus === 'declined' ? 'bg-rose-50 text-rose-800' : 'bg-amber-50 text-amber-800'}">
              ${g.rsvpStatus === 'attending' ? 'حاضر' : g.rsvpStatus === 'declined' ? 'اعتذر' : 'بانتظار الرد'}
            </span>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs" onclick="event.stopPropagation()">
            <span class="text-[11px] text-slate-500 font-mono">طاولة: ${g.tableNo || '—'}</span>
            <div class="flex items-center gap-1.5">
              <button onclick="GuestCRM.sendWhatsApp('${g.id}')" class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                <span>واتساب</span>
              </button>
              <button onclick="GuestCRM.openGuestDrawer('${g.id}')" class="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-bold">
                <span>تعديل</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Open Detailed Slide-Out Guest Drawer
  openGuestDrawer(id) {
    const guest = Store.getGuestById(id);
    if (!guest) return;

    this.activeDrawerGuestId = id;
    const drawer = document.getElementById('guest-detail-drawer');
    const backdrop = document.getElementById('guest-detail-drawer-backdrop');
    const content = document.getElementById('guest-drawer-body');

    if (!drawer || !content) return;

    const lang = I18n.currentLang || 'ar';
    const name = (lang === 'ar' ? guest.nameAr : guest.nameEn) || guest.nameAr || guest.nameEn;
    const inviteUrl = `http://localhost:3000/invite.html?token=${guest.token}`;

    content.innerHTML = `
      <div class="space-y-6">
        
        <!-- Header Info Card -->
        <div class="p-5 rounded-2xl bg-[var(--brand-sand)]/40 border border-slate-200/80 flex items-center gap-4">
          <div class="w-14 h-14 rounded-2xl bg-[var(--brand-primary)] text-[var(--brand-accent)] font-bold font-serif text-2xl flex items-center justify-center shadow-md shrink-0">
            ${name.charAt(0)}
          </div>
          <div class="min-w-0">
            <h3 class="font-serif font-bold text-base text-slate-900 truncate">${name}</h3>
            <div class="text-xs text-slate-500 font-mono mt-0.5">${guest.phone || 'بدون رقم'}</div>
            <div class="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold bg-white border border-slate-200 text-slate-700 font-mono">
              TOKEN: ${guest.token}
            </div>
          </div>
        </div>

        <!-- Direct Actions -->
        <div class="grid grid-cols-2 gap-2">
          <a href="${inviteUrl}" target="_blank" class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition flex items-center justify-center gap-1.5 border border-slate-200">
            <span>👁️</span>
            <span>${lang === 'ar' ? 'فتح دعوة الضيف' : 'Open Invite'}</span>
          </a>
          <button type="button" onclick="GuestCRM.sendWhatsApp('${guest.id}')" class="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-sm">
            <span>💬</span>
            <span>${lang === 'ar' ? 'إرسال واتساب' : 'WhatsApp'}</span>
          </button>
        </div>

        <!-- Editable Fields Form -->
        <div class="space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الاسم بالعربية:' : 'Name (Arabic):'}</label>
            <input type="text" id="drawer-name-ar" value="${guest.nameAr || ''}" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'الاسم بالإنجليزية:' : 'Name (English):'}</label>
            <input type="text" id="drawer-name-en" value="${guest.nameEn || ''}" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'رقم الجوال:' : 'Phone:'}</label>
              <input type="text" id="drawer-phone" value="${guest.phone || ''}" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'عدد المقاعد:' : 'Allowed Seats:'}</label>
              <input type="number" id="drawer-seats" value="${guest.allowedSeats || 1}" min="1" max="10" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'المجموعة / العائلة:' : 'Group:'}</label>
              <input type="text" id="drawer-group-ar" value="${guest.groupAr || ''}" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'رقم الطاولة:' : 'Table No:'}</label>
              <input type="text" id="drawer-table" value="${guest.tableNo || ''}" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'ملاحظة خاصة للمنظمين:' : 'Private Note:'}</label>
            <textarea id="drawer-notes" rows="2" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">${guest.privateNotes || ''}</textarea>
          </div>
        </div>

        <!-- Save Button -->
        <button type="button" onclick="GuestCRM.saveDrawerChanges()" class="w-full py-3.5 rounded-2xl bg-[var(--brand-primary)] text-white font-bold text-xs shadow-md hover:opacity-95 transition">
          ${lang === 'ar' ? 'حفظ التعديلات ✓' : 'Save Changes ✓'}
        </button>

      </div>
    `;

    drawer.classList.remove('hidden');
    setTimeout(() => {
      document.body.classList.add('drawer-open');
    }, 10);
  },

  closeGuestDrawer() {
    document.body.classList.remove('drawer-open');
    setTimeout(() => {
      const drawer = document.getElementById('guest-detail-drawer');
      if (drawer) drawer.classList.add('hidden');
      this.activeDrawerGuestId = null;
    }, 300);
  },

  saveDrawerChanges() {
    if (!this.activeDrawerGuestId) return;

    const updates = {
      nameAr: document.getElementById('drawer-name-ar')?.value || '',
      nameEn: document.getElementById('drawer-name-en')?.value || '',
      phone: document.getElementById('drawer-phone')?.value || '',
      allowedSeats: parseInt(document.getElementById('drawer-seats')?.value, 10) || 1,
      groupAr: document.getElementById('drawer-group-ar')?.value || 'عام',
      tableNo: document.getElementById('drawer-table')?.value || 'Unassigned',
      privateNotes: document.getElementById('drawer-notes')?.value || ''
    };

    Store.updateGuest(this.activeDrawerGuestId, updates);
    this.closeGuestDrawer();
    this.render();
    App.showToast(I18n.t('toast_guest_updated', 'تم تحديث بيانات الضيف بنجاح'));
  },

  // WhatsApp Dispatch Helper
  sendWhatsApp(id) {
    const guest = Store.getGuestById(id);
    if (!guest) return;

    const lang = I18n.currentLang || 'ar';
    const guestName = (lang === 'ar' ? guest.nameAr : guest.nameEn) || guest.nameAr;
    const inviteLink = `https://quickrsvp.me/i/${guest.token}`;

    const text = lang === 'ar'
      ? `السلام عليكم ورحمة الله وبركاته،\nدعوة خاصة ومميزة إلى: ${guestName}\n\nيسعدنا ويشرفنا حضوركم لمشاركتنا فرحة العمر في حفل زفاف مايا & ليام.\n\nلمشاهدة بطاقة الدعوة وتأكيد الحضور عبر الرابط:\n${inviteLink}`
      : `Dear ${guestName},\nYou are cordially invited to the wedding celebration of Maya & Liam.\n\nPlease view your personalized invitation and RSVP here:\n${inviteLink}`;

    const cleanPhone = (guest.phone || '').replace(/[^0-9]/g, '');
    const waUrl = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;

    window.open(waUrl, '_blank');
    Store.updateGuest(guest.id, { inviteSent: true, inviteSentAt: new Date().toISOString().slice(0, 16).replace('T', ' ') });
    this.render();
  },

  deleteGuest(id) {
    if (confirm(I18n.t('confirm_delete_guest', 'هل أنت متأكد من حذف هذا الضيف من القائمة؟'))) {
      Store.deleteGuest(id);
      this.render();
      App.showToast(I18n.t('toast_guest_deleted', 'تم حذف الضيف'));
    }
  },

  // Open Add Guest Modal
  openAddGuestModal() {
    const modal = document.getElementById('add-guest-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeAddGuestModal() {
    const modal = document.getElementById('add-guest-modal');
    if (modal) modal.classList.add('hidden');
  },

  submitNewGuest() {
    const name = document.getElementById('new-guest-name')?.value || '';
    const phone = document.getElementById('new-guest-phone')?.value || '';
    const seats = parseInt(document.getElementById('new-guest-seats')?.value, 10) || 1;
    const group = document.getElementById('new-guest-group')?.value || 'عام';
    const table = document.getElementById('new-guest-table')?.value || 'Unassigned';
    const notes = document.getElementById('new-guest-notes')?.value || '';

    if (!name.trim()) {
      alert(I18n.currentLang === 'ar' ? 'يرجى كتابة اسم الضيف' : 'Please enter guest name');
      return;
    }

    Store.addGuest({
      nameAr: name,
      nameEn: name,
      phone: phone,
      allowedSeats: seats,
      groupAr: group,
      groupEn: group,
      tableNo: table,
      privateNotes: notes
    });

    this.closeAddGuestModal();
    this.render();
    App.showToast(I18n.t('toast_guest_added', 'تمت إضافة الضيف بنجاح'));
  },

  // CSV Export
  exportCsv(type = 'all') {
    const guests = Store.getGuests();
    let csv = '';

    if (type === 'catering') {
      csv = 'Name,Phone,Seats,RSVP_Status,Meal_Choice,Dietary_Notes\n';
      guests.forEach(g => {
        csv += `"${g.nameAr}","${g.phone}",${g.allowedSeats},"${g.rsvpStatus}","${g.mealChoice || ''}","${g.dietaryNotes || ''}"\n`;
      });
    } else if (type === 'checkin') {
      csv = 'Name,Phone,Table,Seats,Checked_In,Checkin_Time\n';
      guests.forEach(g => {
        csv += `"${g.nameAr}","${g.phone}","${g.tableNo}",${g.allowedSeats},${g.checkedIn},"${g.checkedInAt || ''}"\n`;
      });
    } else {
      csv = 'Name_AR,Name_EN,Phone,Group,Seats,RSVP_Status,Table,Token\n';
      guests.forEach(g => {
        csv += `"${g.nameAr}","${g.nameEn}","${g.phone}","${g.groupAr}",${g.allowedSeats},"${g.rsvpStatus}","${g.tableNo}","${g.token}"\n`;
      });
    }

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `QuickRSVP_${type}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast(I18n.t('toast_export_success', 'تم تصدير ملف CSV بنجاح'));
  }
};

if (typeof window !== 'undefined') {
  window.GuestCRM = GuestCRM;
}
