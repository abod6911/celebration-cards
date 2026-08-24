/**
 * QuickRSVP - Creative Studio Invitation Builder
 * 3-Panel Viewport-Bound Workspace Controller with Category Drawers,
 * Grouped Collapsible Inspector, Undo/Redo, Focus-Safe Localized Updates,
 * and Zero-Undefined Defensive UI Fallbacks
 */

const Builder = {
  selectedBlockId: 'blk_hero',
  activeTab: 'sections', // 'sections' | 'theme'
  currentViewport: 'mobile', // 'mobile' | 'tablet' | 'desktop'
  currentZoom: 100,
  undoStack: [],
  redoStack: [],

  init() {
    this.selectedBlockId = Store.state.activeBlocks[0]?.id || 'blk_hero';
    this.renderStructureTree();
    this.renderInspector();
    this.renderLiveCanvas();
    this.setViewport('mobile');
  },

  // Save State Snapshot for Undo/Redo
  pushHistorySnapshot() {
    this.undoStack.push(JSON.stringify(Store.state.activeBlocks));
    if (this.undoStack.length > 20) this.undoStack.shift();
    this.redoStack = [];
    this.updateUndoRedoButtons();
  },

  undo() {
    if (this.undoStack.length === 0) return;
    this.redoStack.push(JSON.stringify(Store.state.activeBlocks));
    const previousState = JSON.parse(this.undoStack.pop());
    Store.state.activeBlocks = previousState;
    Store.saveToStorage();
    this.renderStructureTree();
    this.renderLiveCanvas();
    this.renderInspector();
    this.updateUndoRedoButtons();
    App.showToast(I18n.t('toast_undo') || 'تم التراجع عن الإجراء');
  },

  redo() {
    if (this.redoStack.length === 0) return;
    this.undoStack.push(JSON.stringify(Store.state.activeBlocks));
    const nextState = JSON.parse(this.redoStack.pop());
    Store.state.activeBlocks = nextState;
    Store.saveToStorage();
    this.renderStructureTree();
    this.renderLiveCanvas();
    this.renderInspector();
    this.updateUndoRedoButtons();
    App.showToast(I18n.t('toast_redo') || 'تمت إعادة الإجراء');
  },

  updateUndoRedoButtons() {
    const undoBtn = document.getElementById('btn-builder-undo');
    const redoBtn = document.getElementById('btn-builder-redo');
    if (undoBtn) undoBtn.disabled = this.undoStack.length === 0;
    if (redoBtn) redoBtn.disabled = this.redoStack.length === 0;
  },

  // Set Preview Viewport Device Mode
  setViewport(mode) {
    this.currentViewport = mode;
    const canvasFrame = document.getElementById('canvas-preview-frame');
    if (!canvasFrame) return;

    canvasFrame.classList.remove('viewport-mobile', 'viewport-tablet', 'viewport-desktop');

    const btnMobile = document.getElementById('btn-vp-mobile');
    const btnTablet = document.getElementById('btn-vp-tablet');
    const btnDesktop = document.getElementById('btn-vp-desktop');

    [btnMobile, btnTablet, btnDesktop].forEach(b => {
      if (b) b.className = "px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5";
    });

    if (mode === 'mobile') {
      canvasFrame.classList.add('viewport-mobile');
      if (btnMobile) btnMobile.className = "px-3 py-1.5 rounded-lg bg-white shadow-xs text-xs font-bold text-[var(--brand-primary)] transition flex items-center gap-1.5";
    } else if (mode === 'tablet') {
      canvasFrame.classList.add('viewport-tablet');
      if (btnTablet) btnTablet.className = "px-3 py-1.5 rounded-lg bg-white shadow-xs text-xs font-bold text-[var(--brand-primary)] transition flex items-center gap-1.5";
    } else if (mode === 'desktop') {
      canvasFrame.classList.add('viewport-desktop');
      if (btnDesktop) btnDesktop.className = "px-3 py-1.5 rounded-lg bg-white shadow-xs text-xs font-bold text-[var(--brand-primary)] transition flex items-center gap-1.5";
    }
  },

  // Set Zoom Scale
  setZoom(zoomPercent) {
    this.currentZoom = zoomPercent;
    const canvasMount = document.getElementById('builder-canvas-blocks-mount');
    if (canvasMount) {
      canvasMount.style.transform = `scale(${zoomPercent / 100})`;
      canvasMount.style.transformOrigin = 'top center';
    }
    const zoomLabel = document.getElementById('builder-zoom-label');
    if (zoomLabel) zoomLabel.innerText = `${zoomPercent}%`;
  },

  // Render Clean Left Structure Tree with Defensive Fallbacks
  renderStructureTree() {
    const container = document.getElementById('builder-structure-list');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const blocks = Store.state.activeBlocks || [];

    if (blocks.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 space-y-3">
          <span class="text-3xl">📑</span>
          <div class="text-xs font-bold">${lang === 'ar' ? 'لا توجد أقسام في الدعوة حالياً' : 'No sections added yet'}</div>
          <button onclick="Builder.openAddSectionModal()" class="px-4 py-2 rounded-xl bg-[var(--brand-primary)] text-white text-xs font-bold shadow-sm">
            + ${lang === 'ar' ? 'إضافة قسم جديد' : 'Add Section'}
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = blocks.map((blk, idx) => {
      const def = SectionRegistry.get(blk.type) || {
        nameAr: blk.type || 'قسم',
        nameEn: blk.type || 'Section',
        icon: 'sparkles'
      };

      const isSelected = blk.id === this.selectedBlockId;
      const isEnabled = blk.enabled !== false;
      const sectionName = (lang === 'ar' ? def.nameAr : def.nameEn) || def.nameAr || def.nameEn || 'قسم';
      const iconSvg = Icons.get(def.icon);

      return `
        <div class="p-3 rounded-2xl border transition-all duration-200 ${isSelected ? 'bg-emerald-50/70 border-[var(--brand-primary)] ring-1 ring-[var(--brand-primary)]' : 'bg-white border-slate-200/80 hover:border-slate-300'} flex items-center justify-between gap-2 cursor-pointer group shadow-2xs" onclick="Builder.selectBlock('${blk.id}')">
          
          <!-- Left Drag Handle, Icon, and Section Title -->
          <div class="flex items-center gap-2.5 min-w-0 flex-1">
            <span class="text-slate-400 group-hover:text-slate-600 text-xs select-none">⋮⋮</span>
            <div class="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              ${iconSvg}
            </div>
            <div class="text-right flex-1 min-w-0">
              <div class="text-xs font-bold text-slate-800 leading-tight">${sectionName}</div>
              <div class="text-[10px] ${isEnabled ? 'text-emerald-700' : 'text-slate-400'} font-medium mt-0.5">
                ${isEnabled ? (lang === 'ar' ? '● مفعّل' : '● Active') : (lang === 'ar' ? '○ مخفي' : '○ Hidden')}
              </div>
            </div>
          </div>

          <!-- Actions Group (Move Up/Down, Visibility, More Menu) -->
          <div class="flex items-center gap-1 shrink-0" onclick="event.stopPropagation()">
            <button type="button" onclick="Builder.moveBlock(event, ${idx}, -1)" title="${I18n.t('btn_move_up', 'تحريك لأعلى')}" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-20 transition" ${idx === 0 ? 'disabled' : ''}>
              ${Icons.get('chevronUp')}
            </button>
            <button type="button" onclick="Builder.moveBlock(event, ${idx}, 1)" title="${I18n.t('btn_move_down', 'تحريك لأسفل')}" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-20 transition" ${idx === blocks.length - 1 ? 'disabled' : ''}>
              ${Icons.get('chevronDown')}
            </button>
            <button type="button" onclick="Builder.toggleBlockVisibility(event, '${blk.id}')" title="${isEnabled ? (I18n.t('btn_hide_section', 'إخفاء')) : (I18n.t('btn_show_section', 'إظهار'))}" class="p-1.5 rounded-lg hover:bg-slate-100 ${isEnabled ? 'text-slate-600' : 'text-slate-400'} transition">
              ${isEnabled ? Icons.get('eye') : Icons.get('eyeOff')}
            </button>
            
            ${!def.isFixed ? `
              <button type="button" onclick="Builder.removeBlock(event, '${blk.id}')" title="${I18n.t('btn_delete', 'حذف')}" class="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition">
                ${Icons.get('trash')}
              </button>
            ` : ''}
          </div>

        </div>
      `;
    }).join('');
  },

  // Open Categorized "Add Section" Modal
  openAddSectionModal() {
    const modal = document.getElementById('builder-add-section-modal');
    if (!modal) return;
    this.renderCategorizedSectionLibrary();
    modal.classList.remove('hidden');
  },

  closeAddSectionModal() {
    const modal = document.getElementById('builder-add-section-modal');
    if (modal) modal.classList.add('hidden');
  },

  // Render Section Library Categorized by Flow
  renderCategorizedSectionLibrary() {
    const container = document.getElementById('builder-library-categories');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const categories = SectionRegistry.getCategories();
    const activeBlocks = Store.state.activeBlocks || [];

    container.innerHTML = categories.map(cat => {
      const sections = SectionRegistry.getByCategory(cat.id);
      if (sections.length === 0) return '';

      return `
        <div class="space-y-3">
          <div class="flex items-center gap-2 pb-1 border-b border-slate-100">
            <span class="text-sm">${cat.icon || '✨'}</span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700">${lang === 'ar' ? cat.nameAr : cat.nameEn}</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${sections.map(sec => {
              const isAlreadyAdded = activeBlocks.some(b => b.type === sec.type);
              const iconSvg = Icons.get(sec.icon);
              const name = (lang === 'ar' ? sec.nameAr : sec.nameEn) || sec.nameAr || sec.nameEn;

              return `
                <div class="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/80 transition-all flex items-center justify-between gap-3 cursor-pointer shadow-2xs" onclick="Builder.addSection('${sec.type}')">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-9 h-9 rounded-xl bg-[var(--brand-sand)]/60 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
                      ${iconSvg}
                    </div>
                    <div class="truncate text-right">
                      <div class="text-xs font-bold text-slate-800">${name}</div>
                      <div class="text-[10px] text-slate-500 leading-snug">${lang === 'ar' ? 'قسم مستقل قابل للتخصيص' : 'Customizable block'}</div>
                    </div>
                  </div>
                  <button type="button" class="px-3 py-1.5 rounded-xl ${isAlreadyAdded ? 'bg-slate-100 text-slate-600' : 'bg-[var(--brand-primary)] text-white hover:opacity-90'} text-xs font-bold shrink-0 transition">
                    ${isAlreadyAdded ? (lang === 'ar' ? 'مضاف' : 'Added') : `+ ${lang === 'ar' ? 'إضافة' : 'Add'}`}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  // Render Theme, Opening Experience Modes, Hanging Card, Video Source, and Overlays
  renderThemesPicker() {
    const container = document.getElementById('builder-theme-picker-container');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const currentTheme = Store.state.event.activeTheme || 'royal-arabic';
    const currentOpening = Store.state.event.openingStyle || 'hanging-card';
    const videoConfig = Store.state.event.videoInvitation || {};
    const hangingConfig = Store.state.event.hangingCard || { animationIntensity: 'cinematic' };
    const themes = ThemeRegistry.getAllThemes();
    const videoTemplates = typeof VideoTemplateRegistry !== 'undefined' ? VideoTemplateRegistry.getAllTemplates() : [];

    const isVideoExperience = currentOpening === 'video' || currentOpening === 'video-card' || currentOpening === 'video-hanging-card';
    const isHangingExperience = currentOpening === 'hanging-card' || currentOpening === 'video-hanging-card';

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn">
        
        <!-- 1. The 7 Opening Experience Modes -->
        <div class="p-4 rounded-3xl bg-gradient-to-br from-amber-50/80 to-amber-100/40 border border-amber-200 space-y-4 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">🎗️</span>
              <div>
                <h4 class="text-xs font-bold text-slate-900" data-i18n="opening_experience_title">نوع تجربة وافتتاحية الدعوة</h4>
                <p class="text-[10px] text-slate-500" data-i18n="opening_experience_sub">اختر كيف سيتم استقبال ضيوفك عند فتح الرابط</p>
              </div>
            </div>
            <button type="button" onclick="Builder.previewOpening()" class="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-700 to-amber-800 text-white text-[11px] font-bold shadow-xs hover:opacity-95 transition active:scale-95 flex items-center gap-1.5">
              <span>👁️</span>
              <span>${lang === 'ar' ? 'معاينة الافتتاحية' : 'Preview Intro'}</span>
            </button>
          </div>

          <!-- Opening Modes Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            
            <!-- Mode 1: Hanging Invitation Card (Royal Signature) -->
            <div onclick="Builder.selectOpeningStyle('hanging-card')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'hanging-card' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">🎗️</span>
                <span class="px-2 py-0.5 text-[9px] font-bold rounded-md bg-amber-100 text-amber-900">التوقيع الملكي</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'بطاقة دعوة معلّقة' : 'Hanging Card'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'بطاقة معلقة بشريط حريري تتأرجح بنعومة' : 'Suspended card with silk ribbon sway'}</div>
            </div>

            <!-- Mode 2: Video + Hanging Card -->
            <div onclick="Builder.selectOpeningStyle('video-hanging-card')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'video-hanging-card' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">🎬🎗️</span>
                <span class="px-2 py-0.5 text-[9px] font-bold rounded-md bg-emerald-100 text-emerald-900">الأكثر فخامة</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'فيديو + بطاقة معلّقة' : 'Video + Hanging Card'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'فيديو سينمائي ثم بطاقة معلقة يسحبها الضيف' : 'Video resolves into a hanging card'}</div>
            </div>

            <!-- Mode 3: Video + Interactive Card -->
            <div onclick="Builder.selectOpeningStyle('video-card')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'video-card' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">✨</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'فيديو + بطاقة تفاعلية' : 'Video + Card Reveal'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'فيديو مخصص ثم بطاقة بختم الشمع' : 'Video resolves into wax seal card'}</div>
            </div>

            <!-- Mode 4: Video Invitation -->
            <div onclick="Builder.selectOpeningStyle('video')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'video' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">📹</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'فيديو سينمائي مخصص' : 'Video Invitation'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'فيديو بالأسماء ينتقل مباشرة للدعوة' : 'Cinematic video with dynamic names'}</div>
            </div>

            <!-- Mode 5: Interactive Card -->
            <div onclick="Builder.selectOpeningStyle('card-reveal')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'card-reveal' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">✉️</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'بطاقة تفاعلية (ختم الشمع)' : 'Wax Seal Card'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'بطاقة بختم الشمع مع سحب للأعلى' : 'Wax seal card with swipe reveal'}</div>
            </div>

            <!-- Mode 6: Couple Reveal -->
            <div onclick="Builder.selectOpeningStyle('couple-reveal')" class="p-3 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'couple-reveal' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'}">
              <div class="flex items-center justify-between mb-1">
                <span class="text-base">🕊️</span>
              </div>
              <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'مشهد العروسين' : 'Couple Reveal'}</div>
              <div class="text-[10px] text-slate-500 leading-snug mt-0.5">${lang === 'ar' ? 'مشهد ظلال العروسين الفني الحالم' : 'Couple silhouette artwork reveal'}</div>
            </div>

            <!-- Mode 7: Direct Invitation -->
            <div onclick="Builder.selectOpeningStyle('none')" class="sm:col-span-2 p-2.5 rounded-2xl border text-right cursor-pointer transition-all ${currentOpening === 'none' ? 'bg-white border-amber-600 ring-2 ring-amber-500/80 shadow-sm' : 'bg-white/60 border-slate-200 hover:bg-white'} flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-base">⚡</span>
                <div>
                  <div class="text-xs font-bold text-slate-900">${lang === 'ar' ? 'دخول مباشر بدون افتتاحية' : 'Direct Invitation (No Intro)'}</div>
                  <div class="text-[10px] text-slate-500">${lang === 'ar' ? 'الدخول فوراً إلى محتوى الدعوة' : 'Loads invitation directly'}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        ${isHangingExperience ? `
          <!-- Hanging Card Settings & Animation Intensity -->
          <div class="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>🎗️</span>
                <span>${lang === 'ar' ? 'شدة وتأثير حركة البطاقة المعلّقة' : 'Suspension Motion Intensity'}</span>
              </h4>
            </div>

            <div class="grid grid-cols-3 gap-2 pt-1">
              <button type="button" onclick="Builder.setHangingIntensity('cinematic')" class="py-2 px-2.5 rounded-xl border text-[11px] font-bold transition text-center ${hangingConfig.animationIntensity === 'cinematic' ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                ${lang === 'ar' ? 'سينمائي' : 'Cinematic'}
              </button>
              <button type="button" onclick="Builder.setHangingIntensity('calm')" class="py-2 px-2.5 rounded-xl border text-[11px] font-bold transition text-center ${hangingConfig.animationIntensity === 'calm' ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                ${lang === 'ar' ? 'هادئ وناعم' : 'Calm & Subtle'}
              </button>
              <button type="button" onclick="Builder.setHangingIntensity('static')" class="py-2 px-2.5 rounded-xl border text-[11px] font-bold transition text-center ${hangingConfig.animationIntensity === 'static' ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                ${lang === 'ar' ? 'بدون حركة' : 'Static'}
              </button>
            </div>
            <p class="text-[10px] text-slate-400">تتكيف خامة الشريط الحريري والحلقة المعدنية تلقائياً مع الثيم المختار للحفل.</p>
          </div>
        ` : ''}

        ${isVideoExperience ? `
          <!-- 2. Video Source & Preset Templates Configuration -->
          <div class="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>📹</span>
                <span>${lang === 'ar' ? 'مصدر وخلفية الفيديو السينمائي' : 'Cinematic Video Source'}</span>
              </h4>
            </div>

            <!-- Video Source Selector -->
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="Builder.setVideoSourceType('template')" class="py-2.5 px-3 rounded-xl border text-xs font-bold transition ${videoConfig.sourceType !== 'upload' ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                ${lang === 'ar' ? 'قوالب QuickRSVP الملكية' : 'QuickRSVP Presets'}
              </button>
              <button type="button" onclick="Builder.setVideoSourceType('upload')" class="py-2.5 px-3 rounded-xl border text-xs font-bold transition ${videoConfig.sourceType === 'upload' ? 'bg-[var(--brand-primary)] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}">
                ${lang === 'ar' ? 'رفع فيديو خاص' : 'Upload Video'}
              </button>
            </div>

            ${videoConfig.sourceType !== 'upload' ? `
              <!-- Template Presets List -->
              <div class="space-y-2 pt-1">
                <div class="text-[11px] font-bold text-slate-600">${lang === 'ar' ? 'اختر قالب الفيديو المتناسق مع الثيم:' : 'Select Video Template:'}</div>
                <div class="grid grid-cols-1 gap-2">
                  ${videoTemplates.map(tpl => `
                    <div onclick="Builder.selectVideoTemplate('${tpl.id}')" class="p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${videoConfig.templateId === tpl.id ? 'bg-emerald-50 border-emerald-600 ring-1 ring-emerald-500' : 'bg-white border-slate-200 hover:border-slate-300'}">
                      <div class="flex items-center gap-2.5 min-w-0">
                        <img src="${tpl.posterUrl}" class="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0">
                        <div class="truncate text-right">
                          <div class="text-xs font-bold text-slate-900 truncate">${lang === 'ar' ? tpl.nameAr : tpl.nameEn}</div>
                          <div class="text-[10px] text-slate-500 truncate">${lang === 'ar' ? tpl.descriptionAr : tpl.descriptionEn}</div>
                        </div>
                      </div>
                      <span class="text-xs ${videoConfig.templateId === tpl.id ? 'text-emerald-700 font-bold' : 'text-slate-400'}">
                        ${videoConfig.templateId === tpl.id ? '✓' : '○'}
                      </span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : `
              <!-- Custom Video URL / Upload -->
              <div class="space-y-3 pt-1 text-xs">
                <div>
                  <label class="block font-bold text-slate-700 mb-1">${lang === 'ar' ? 'رابط ملف الفيديو (MP4 / WebM):' : 'Video File URL (MP4):'}</label>
                  <input type="text" value="${videoConfig.customVideoUrl || ''}" placeholder="https://..." oninput="Builder.updateVideoField('customVideoUrl', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white shadow-2xs">
                </div>
                <div class="p-3 rounded-xl bg-amber-50 text-[11px] text-amber-900 border border-amber-200 leading-relaxed">
                  💡 <strong>نصيحة:</strong> يفضل أن تكون مدة الفيديو بين 8 إلى 18 ثانية وبمقاس 9:16 لضمان أفضل تجربة وسرعة تحميل للضيوف على الهواتف.
                </div>
              </div>
            `}
          </div>

          <!-- 3. Dynamic Personalization Overlay Timeline Editor -->
          <div class="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h4 class="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>${lang === 'ar' ? 'تخصيص نصوص وأسماء الضيوف (Timeline)' : 'Personalization Overlay Timeline'}</span>
                </h4>
                <p class="text-[10px] text-slate-400">${lang === 'ar' ? 'تظهر النصوص تلقائياً في توقيت محدد خلال الفيديو' : 'Overlays sync with video playback'}</p>
              </div>
              <button type="button" onclick="Builder.addVideoOverlay()" class="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition">
                + ${lang === 'ar' ? 'إضافة نص' : 'Add Text'}
              </button>
            </div>

            <!-- Overlays List -->
            <div class="space-y-3">
              ${(videoConfig.overlays || []).map((ov, idx) => `
                <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-slate-800">نص #${idx + 1} (${ov.startTime}s - ${ov.endTime}s)</span>
                    <button type="button" onclick="Builder.removeVideoOverlay(${idx})" class="text-rose-500 hover:text-rose-700 text-[11px] font-bold">
                      ${lang === 'ar' ? 'حذف' : 'Remove'}
                    </button>
                  </div>

                  <!-- Text / Variable Input -->
                  <div class="space-y-1">
                    <input type="text" value="${ov.variable ? ov.variable : (ov.text || '')}" placeholder="اكتب النص أو {guest_name}..." oninput="Builder.updateVideoOverlayField(${idx}, 'text', this.value)" class="w-full px-3 py-2 border rounded-xl bg-white text-xs font-serif font-bold">
                  </div>

                  <!-- Quick Variable Tags -->
                  <div class="flex flex-wrap gap-1 pt-1">
                    <button type="button" onclick="Builder.setVideoOverlayVariable(${idx}, '{guest_name}')" class="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold hover:bg-amber-200">
                      + {guest_name}
                    </button>
                    <button type="button" onclick="Builder.setVideoOverlayVariable(${idx}, '{couple_names}')" class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[10px] font-bold hover:bg-emerald-200">
                      + {couple_names}
                    </button>
                    <button type="button" onclick="Builder.setVideoOverlayVariable(${idx}, '{event_date}')" class="px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 text-[10px] font-bold hover:bg-sky-200">
                      + {event_date}
                    </button>
                  </div>

                  <!-- Timing Start/End Inputs -->
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label class="text-[10px] text-slate-500">البداية (ثواني):</label>
                      <input type="number" min="0" max="30" step="0.5" value="${ov.startTime}" oninput="Builder.updateVideoOverlayField(${idx}, 'startTime', parseFloat(this.value))" class="w-full px-2 py-1 border rounded-lg bg-white text-center">
                    </div>
                    <div>
                      <label class="text-[10px] text-slate-500">النهاية (ثواني):</label>
                      <input type="number" min="0" max="30" step="0.5" value="${ov.endTime}" oninput="Builder.updateVideoOverlayField(${idx}, 'endTime', parseFloat(this.value))" class="w-full px-2 py-1 border rounded-lg bg-white text-center">
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- 4. 5 Bespoke Themes List -->
        <div class="space-y-3 pt-2">
          <div class="text-xs text-slate-800 font-bold">
            ${lang === 'ar' ? 'الطابع والنمط الجمالي العام للدعوة (Themes):' : 'Invitation Aesthetic Theme:'}
          </div>
          <div class="space-y-3">
            ${themes.map(th => ThemeRegistry.renderThemePreviewCard(th, th.id === currentTheme, lang)).join('')}
          </div>
        </div>

      </div>
    `;
  },

  selectOpeningStyle(style) {
    this.pushHistorySnapshot();
    Store.state.event.openingStyle = style;
    Store.saveToStorage();
    this.renderThemesPicker();
    const lang = I18n.currentLang || 'ar';
    App.showToast(lang === 'ar' ? 'تم تحديث نوع تجربة الدعوة' : 'Invitation opening experience updated');
  },

  setHangingIntensity(intensity) {
    this.pushHistorySnapshot();
    if (!Store.state.event.hangingCard) Store.state.event.hangingCard = {};
    Store.state.event.hangingCard.animationIntensity = intensity;
    Store.saveToStorage();
    this.renderThemesPicker();
    const lang = I18n.currentLang || 'ar';
    App.showToast(lang === 'ar' ? 'تم تحديث شدة حركة البطاقة' : 'Motion intensity updated');
  },

  setVideoSourceType(type) {
    this.pushHistorySnapshot();
    if (!Store.state.event.videoInvitation) Store.state.event.videoInvitation = {};
    Store.state.event.videoInvitation.sourceType = type;
    Store.saveToStorage();
    this.renderThemesPicker();
  },

  selectVideoTemplate(templateId) {
    this.pushHistorySnapshot();
    const template = VideoTemplateRegistry.getTemplate(templateId);
    if (!Store.state.event.videoInvitation) Store.state.event.videoInvitation = {};
    Store.state.event.videoInvitation.templateId = templateId;
    Store.state.event.videoInvitation.posterUrl = template.posterUrl;
    Store.state.event.videoInvitation.videoUrl = template.videoUrl;
    Store.state.event.videoInvitation.duration = template.duration;
    Store.state.event.videoInvitation.overlays = JSON.parse(JSON.stringify(template.defaultOverlays));
    Store.saveToStorage();
    this.renderThemesPicker();
    App.showToast(I18n.currentLang === 'ar' ? 'تم تطبيق قالب الفيديو بنجاح' : 'Video template applied');
  },

  updateVideoField(field, value) {
    if (!Store.state.event.videoInvitation) Store.state.event.videoInvitation = {};
    Store.state.event.videoInvitation[field] = value;
    Store.saveToStorage();
  },

  addVideoOverlay() {
    this.pushHistorySnapshot();
    if (!Store.state.event.videoInvitation) Store.state.event.videoInvitation = {};
    if (!Store.state.event.videoInvitation.overlays) Store.state.event.videoInvitation.overlays = [];

    Store.state.event.videoInvitation.overlays.push({
      id: `ov_${Date.now().toString(36)}`,
      startTime: 3,
      endTime: 7,
      text: '',
      variable: '{guest_name}',
      position: 'center',
      animation: 'soft-rise',
      color: '#D4AF37',
      isHighlight: true
    });
    Store.saveToStorage();
    this.renderThemesPicker();
  },

  removeVideoOverlay(index) {
    this.pushHistorySnapshot();
    if (Store.state.event.videoInvitation?.overlays) {
      Store.state.event.videoInvitation.overlays.splice(index, 1);
      Store.saveToStorage();
      this.renderThemesPicker();
    }
  },

  updateVideoOverlayField(index, field, value) {
    const overlays = Store.state.event.videoInvitation?.overlays;
    if (overlays && overlays[index]) {
      overlays[index][field] = value;
      if (field === 'text' && value.includes('{')) {
        overlays[index].variable = value;
      }
      Store.saveToStorage();
    }
  },

  setVideoOverlayVariable(index, variableTag) {
    this.pushHistorySnapshot();
    const overlays = Store.state.event.videoInvitation?.overlays;
    if (overlays && overlays[index]) {
      overlays[index].variable = variableTag;
      overlays[index].text = '';
      overlays[index].isHighlight = variableTag === '{guest_name}';
      Store.saveToStorage();
      this.renderThemesPicker();
    }
  },

  previewOpening() {
    const phoneContainer = document.getElementById('canvas-preview-frame');
    if (!phoneContainer) return;

    let mountEl = document.getElementById('builder-opening-preview-mount');
    if (!mountEl) {
      mountEl = document.createElement('div');
      mountEl.id = 'builder-opening-preview-mount';
      mountEl.className = 'absolute inset-0 z-50 overflow-hidden';
      phoneContainer.appendChild(mountEl);
    }

    const sampleGuest = Store.state.guests[0] || { nameAr: 'هاشم النماري', nameEn: 'Hashim Al-Nemari', token: 'k82f9x' };
    OpeningEngine.mount(mountEl, sampleGuest, Store.state.event.openingStyle || 'video-card', true);
  },

  // Select Block & Focus Inspector
  selectBlock(id) {
    this.selectedBlockId = id;
    this.renderStructureTree();
    this.renderInspector();

    // Scroll block in Canvas into view smoothly
    const blockEl = document.getElementById(`canvas-block-${id}`);
    if (blockEl) {
      blockEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  // Add Section to Invitation
  addSection(type) {
    const def = SectionRegistry.get(type);
    if (!def) return;

    this.pushHistorySnapshot();

    const newBlock = {
      id: `blk_${type}_${Date.now().toString(36)}`,
      type: type,
      enabled: true,
      data: {
        titleAr: def.nameAr || 'قسم جديد',
        titleEn: def.nameEn || 'New Section'
      }
    };

    Store.state.activeBlocks.push(newBlock);
    Store.saveToStorage();

    this.selectedBlockId = newBlock.id;
    this.closeAddSectionModal();
    this.renderStructureTree();
    this.renderLiveCanvas();
    this.renderInspector();

    App.showToast(I18n.t('toast_section_added', 'تمت إضافة القسم بنجاح'));
  },

  // Remove Block
  removeBlock(event, id) {
    if (event) event.stopPropagation();
    this.pushHistorySnapshot();

    Store.state.activeBlocks = Store.state.activeBlocks.filter(b => b.id !== id);
    Store.saveToStorage();

    if (this.selectedBlockId === id) {
      this.selectedBlockId = Store.state.activeBlocks[0]?.id || null;
    }

    this.renderStructureTree();
    this.renderLiveCanvas();
    this.renderInspector();
    App.showToast(I18n.t('toast_section_deleted', 'تم حذف القسم'));
  },

  // Toggle Visibility
  toggleBlockVisibility(event, id) {
    if (event) event.stopPropagation();
    this.pushHistorySnapshot();

    const blk = Store.state.activeBlocks.find(b => b.id === id);
    if (blk) {
      blk.enabled = blk.enabled === false ? true : false;
      Store.saveToStorage();
    }

    this.renderStructureTree();
    this.renderLiveCanvas();
    this.renderInspector();
  },

  // Move Block Up/Down
  moveBlock(event, index, direction) {
    if (event) event.stopPropagation();
    const newIdx = index + direction;
    const blocks = Store.state.activeBlocks;
    if (newIdx < 0 || newIdx >= blocks.length) return;

    this.pushHistorySnapshot();

    const temp = blocks[index];
    blocks[index] = blocks[newIdx];
    blocks[newIdx] = temp;

    Store.saveToStorage();
    this.renderStructureTree();
    this.renderLiveCanvas();
  },

  // Select Theme
  selectTheme(themeId) {
    this.pushHistorySnapshot();
    Store.state.event.activeTheme = themeId;
    Store.saveToStorage();

    const theme = ThemeRegistry.getTheme(themeId);
    const canvasFrame = document.getElementById('canvas-preview-frame');
    if (canvasFrame) {
      ThemeRegistry.applyThemeToElement(canvasFrame, theme.id);
    }

    this.renderThemesPicker();
    this.renderLiveCanvas();
    App.showToast(`${I18n.t('toast_theme_updated', 'تم تحديث الثيم')}: ${I18n.currentLang === 'ar' ? theme.nameAr : theme.nameEn}`);
  },

  // Localized State Update: Update field WITHOUT re-rendering inspector inputs to preserve focus/cursor
  updateActiveBlockField(field, value) {
    const blk = Store.state.activeBlocks.find(b => b.id === this.selectedBlockId);
    if (!blk) return;

    if (!blk.data) blk.data = {};
    blk.data[field] = value;

    // Save state to store
    Store.saveToStorage();

    // Re-render ONLY the live canvas preview
    this.renderLiveCanvas();
  },

  // Render Live Preview Canvas
  renderLiveCanvas() {
    const container = document.getElementById('builder-canvas-blocks-mount');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const currentTheme = Store.state.event.activeTheme || 'royal-arabic';
    const sampleGuest = Store.state.guests[0] || { nameAr: 'هاشم النماري', nameEn: 'Hashim Al-Nemari', token: 'k82f9x' };

    const canvasFrame = document.getElementById('canvas-preview-frame');
    if (canvasFrame) {
      ThemeRegistry.applyThemeToElement(canvasFrame, currentTheme);
    }

    container.innerHTML = Store.state.activeBlocks.filter(b => b.enabled !== false).map(blk => {
      const def = SectionRegistry.get(blk.type);
      if (!def) return '';

      const isSelected = blk.id === this.selectedBlockId;

      return `
        <div id="canvas-block-${blk.id}" class="relative transition-all duration-200 ${isSelected ? 'ring-2 ring-[var(--brand-primary)] ring-offset-4 rounded-3xl' : ''}" onclick="Builder.selectBlock('${blk.id}')">
          ${def.renderGuest(blk.data, sampleGuest, lang)}
        </div>
      `;
    }).join('');

    // Mount RSVP Engine in Preview Canvas
    const rsvpMount = container.querySelector('#interactive-rsvp-mount-container');
    if (rsvpMount && typeof RsvpEngine !== 'undefined') {
      RsvpEngine.mount(rsvpMount, sampleGuest.token);
    }

    // Mount QR Pass in Preview Canvas
    const qrCanvas = container.querySelector('#guest-qrcode-canvas');
    if (qrCanvas && typeof QRCode !== 'undefined') {
      qrCanvas.innerHTML = '';
      new QRCode(qrCanvas, {
        text: `https://quickrsvp.me/entry/${sampleGuest.token}`,
        width: 140,
        height: 140,
        colorDark: '#0A2E23',
        colorLight: '#ffffff'
      });
    }
  },

  // Render Right-Panel Block Inspector
  renderInspector() {
    const container = document.getElementById('builder-inspector-container');
    if (!container) return;

    const lang = I18n.currentLang || 'ar';
    const blk = Store.state.activeBlocks.find(b => b.id === this.selectedBlockId);

    if (!blk) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-400 space-y-3">
          <span class="text-3xl">🔍</span>
          <div class="text-xs font-bold">${lang === 'ar' ? 'حدد قسماً لتعديل محتواه' : 'Select a section to edit'}</div>
        </div>
      `;
      return;
    }

    const def = SectionRegistry.get(blk.type);
    if (!def) return;

    const iconSvg = Icons.get(def.icon);
    const sectionName = (lang === 'ar' ? def.nameAr : def.nameEn) || def.nameAr || def.nameEn || 'قسم';

    container.innerHTML = `
      <div class="space-y-5 animate-fadeIn">
        
        <!-- Inspector Header -->
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-[var(--brand-sand)]/70 text-[var(--brand-primary)] flex items-center justify-center">
              ${iconSvg}
            </div>
            <div>
              <h3 class="text-xs font-bold text-slate-800">${sectionName}</h3>
              <span class="text-[10px] text-slate-400 font-mono">ID: ${blk.id}</span>
            </div>
          </div>
          <button type="button" onclick="Builder.toggleBlockVisibility(null, '${blk.id}')" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200 transition">
            ${blk.enabled !== false ? (lang === 'ar' ? 'إخفاء القسم' : 'Hide') : (lang === 'ar' ? 'إظهار القسم' : 'Show')}
          </button>
        </div>

        <!-- Custom Fields Form -->
        <div>
          ${def.renderInspector ? def.renderInspector(blk.data, lang) : '<p class="text-xs text-slate-400">لا توجد إعدادات إضافية لهذا القسم</p>'}
        </div>

      </div>
    `;
  },

  // Switch Builder Inspector Tabs
  switchTab(tab) {
    this.activeTab = tab;
    const structurePanel = document.getElementById('builder-tab-structure-content');
    const themePanel = document.getElementById('builder-tab-theme-content');

    const tabBtnStructure = document.getElementById('btn-tab-structure');
    const tabBtnTheme = document.getElementById('btn-tab-theme');

    if (tab === 'sections') {
      if (structurePanel) structurePanel.classList.remove('hidden');
      if (themePanel) themePanel.classList.add('hidden');
      if (tabBtnStructure) tabBtnStructure.className = "flex-1 py-2 rounded-xl bg-white text-[var(--brand-primary)] font-bold text-xs shadow-xs transition";
      if (tabBtnTheme) tabBtnTheme.className = "flex-1 py-2 rounded-xl text-slate-600 font-semibold text-xs hover:text-slate-900 transition";
    } else {
      if (structurePanel) structurePanel.classList.add('hidden');
      if (themePanel) themePanel.classList.remove('hidden');
      if (tabBtnStructure) tabBtnStructure.className = "flex-1 py-2 rounded-xl text-slate-600 font-semibold text-xs hover:text-slate-900 transition";
      if (tabBtnTheme) tabBtnTheme.className = "flex-1 py-2 rounded-xl bg-white text-[var(--brand-primary)] font-bold text-xs shadow-xs transition";
      this.renderThemesPicker();
    }
  },

  switchInspectorTab(tab) {
    return this.switchTab(tab);
  }
};

if (typeof window !== 'undefined') {
  window.Builder = Builder;
}
