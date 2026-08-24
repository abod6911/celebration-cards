/**
 * QuickRSVP - Internationalization & Localization Engine
 * Complete Arabic (Saudi/Gulf Wedding conventions) and English translations
 */

const I18n = {
  currentLang: 'ar',

  translations: {
    ar: {
      // Brand & Header
      brand_name: 'QuickRSVP',
      brand_tagline: 'منصة إدارة وتصميم بطاقات الزفاف الفاخرة',
      switch_lang: 'English',
      switch_lang_flag: '🇬🇧',
      preview_as_guest: 'معاينة كضيف',
      save_changes: 'حفظ التغييرات',
      saving: 'جاري الحفظ...',
      saved: 'تم الحفظ بنجاح ✓',
      unsaved_changes: 'تغييرات غير محفوظة',

      // Primary Navigation
      nav_overview: 'نظرة عامة',
      nav_invitation: 'تصميم الدعوة',
      nav_guests: 'سجل الضيوف',
      nav_rsvp: 'التأكيدات والوجبات',
      nav_messages: 'رسائل الواتساب',
      nav_checkin: 'تسجيل الحضور (Check-In)',
      nav_analytics: 'التقارير والإحصائيات',
      nav_settings: 'إعدادات الحفل',
      nav_more: 'المزيد',

      // Overview Dashboard
      dash_greeting_afternoon: 'طاب مساؤكم 👋',
      dash_greeting_morning: 'صباح الخير 👋',
      dash_event_countdown: 'متبقي على موعد الحفل',
      dash_days: 'يوم',
      dash_hours: 'ساعة',
      dash_minutes: 'دقيقة',
      dash_seconds: 'ثانية',
      dash_quick_actions: 'إجراءات سريعة',
      dash_action_add_guest: 'إضافة ضيف جديد',
      dash_action_send_invites: 'إرسال الدعوات',
      dash_action_design_invite: 'تخصيص تصميم الدعوة',
      dash_action_open_scanner: 'فتح ماسح الدخول',
      dash_action_export_csv: 'تصدير القوائم (Excel)',
      dash_action_copy_link: 'نسخ رابط الدعوة العام',

      // KPI Metric Cards
      stat_total_guests: 'إجمالي المدعوين',
      stat_total_sub: 'يشمل العائلات والمرافقين',
      stat_confirmed: 'المؤكد حضورهم',
      stat_confirmed_sub: 'تأكيد رسمي مؤكد',
      stat_declined: 'المعتذرون',
      stat_declined_sub: 'مع تمنيات مباركة',
      stat_awaiting: 'بانتظار الرد',
      stat_awaiting_sub: 'لم يتم الرد بعد',
      stat_checked_in: 'الحاضرون في القاعة',
      stat_checked_in_sub: 'تم مسح بطاقاتهم بالبوابة',
      stat_response_rate: 'نسبة التجاوب',

      // RSVP Progress Breakdown
      rsvp_progress_title: 'توزيع استجابات الحضور',
      rsvp_attending_label: 'مؤكد',
      rsvp_declined_label: 'معتذر',
      rsvp_pending_label: 'معلق',
      rsvp_expected_attendees: 'إجمالي الحضور المتوقع (مع المرافقين)',

      // Activity Feed
      recent_activity: 'آخر التحديثات والتأكيدات',
      activity_rsvp_confirmed: 'أكد الحضور مع مرافق (+1)',
      activity_rsvp_declined: 'اعتذر عن الحضور وأرسل تهنئة',
      activity_checked_in: 'تم تسجيل الدخول عند البوابة',
      activity_invite_sent: 'تم إرسال بطاقة الدعوة عبر واتساب',
      activity_just_now: 'الآن',
      activity_mins_ago: 'منذ دقائق',
      activity_hours_ago: 'منذ ساعات',

      // Guest Management (CRM)
      guests_title: 'إدارة وتنسيق قائمة الضيوف',
      guests_subtitle: 'متابعة بطاقات الدعوة، التأكيدات الفردية والعائلية، خيارات الوجبات، وتسكين الطاولات',
      guest_search_placeholder: 'ابحث بالاسم، رقم الجوال، اسم العائلة، أو رقم الطاولة...',
      filter_all: 'الكل',
      filter_awaiting: 'بانتظار الرد',
      filter_attending: 'مؤكد الحضور',
      filter_declined: 'معتذر',
      filter_not_invited: 'لم تُرسل بعد',
      filter_invited: 'تم الإرسال',
      filter_checked_in: 'سجل الحضور',
      filter_families: 'عائلات ومجموعات',
      add_guest_btn: 'إضافة ضيف',
      import_guests_btn: 'استيراد قائمة',
      export_dropdown: 'تصدير البيانات',
      export_all_guests: 'قائمة الضيوف الكاملة (CSV)',
      export_catering: 'بيانات وجبات المطعم والضيافة (CSV)',
      export_checkin: 'كشف حضور البوابة (CSV)',

      // Table & Card Columns
      col_guest_name: 'اسم الضيف / العائلة',
      col_contact: 'رقم الجوال',
      col_group: 'المجموعة / العائلة',
      col_seats: 'المقاعد المتاحة',
      col_status: 'حالة التأكيد',
      col_meals: 'الوجبات والطلبات',
      col_table: 'الطاولة',
      col_actions: 'خيارات',

      // Guest Status Badges
      badge_attending: 'حاضر',
      badge_declined: 'معتذر',
      badge_awaiting: 'بانتظار الرد',
      badge_not_sent: 'غير مرسلة',
      badge_sent: 'تم الإرسال',
      badge_checked_in: 'تم التحقق بالبوابة',
      badge_family: 'دعوة عائلية',

      // Guest Modal Form
      modal_add_guest_title: 'إضافة ضيف أو عائلة جديدة',
      modal_edit_guest_title: 'تعديل بيانات الضيف',
      field_primary_name: 'الاسم الكامل للضيف الأساسي',
      field_phone: 'رقم الجوال (مع الرمز الدولي)',
      field_family_group: 'اسم العائلة / التصنيف (اختياري)',
      field_allowed_seats: 'عدد المقاعد المخصصة في الدعوة',
      field_table_no: 'رقم أو اسم الطاولة',
      field_private_note: 'ملاحظة خاصة للمنظمين (سرية لا تظهر للضيف)',
      btn_save_guest: 'حفظ بيانات الضيف',
      btn_cancel: 'إلغاء',

      // Import Modal
      modal_import_title: 'استيراد قائمة الضيوف من ملف أو نص',
      import_tab_csv: 'ملف Excel / CSV',
      import_tab_paste: 'نسخ ولصق جماعي',
      import_drag_drop_csv: 'اسحب ملف CSV هنا، أو انقر للاختيار من جهازك',
      import_csv_tip: 'يجب أن يحتوي الملف على الأعمدة: Name, Phone, Seats, Table, Group',
      import_paste_ph: 'الصق الأسماء هنا بمعدل سطر لكل ضيف:\nمحمد العبدالله, 0501234567, 2, طاولة 5\nسارة الأحمد, 0559876543, 1, طاولة 2',
      import_download_sample: 'تحميل نموذج CSV تجريبي',
      btn_process_import: 'استيراد البيانات المحددة',

      // Messages Center
      messages_title: 'مركز مراسلات الواتساب والدعوات',
      messages_subtitle: 'قوالب رسائل زفاف احترافية جاهزة للإرسال مع روابط شخصية مشفرة لكل ضيف',
      template_initial_invite: 'بطاقة الدعوة الرسمية الأولى',
      template_reminder: 'تذكير لطيف بقرب موعد التأكيد',
      template_location_update: 'موقع القاعة وإرشادات الوصول',
      template_countdown_24h: 'متبقي 24 ساعة على الحفل',
      template_thank_you: 'رسالة شكر وامتنان بعد الحفل',
      btn_copy_template: 'نسخ نص الرسالة',
      btn_send_via_wa: 'إرسال مباشر عبر واتساب',
      wa_preview_title: 'معاينة نص الرسالة الشخصية:',

      // Invitation Builder
      builder_title: 'محرر ومصمم بطاقة الزفاف',
      builder_subtitle: 'تخصيص كامل للأقسام، الألوان، الخطوط، والوسائط المتعددة',
      builder_tab_sections: 'الأقسام والمحتوى',
      builder_tab_theme: 'الثيم والألوان',
      btn_add_section: 'إضافة قسم جديد',
      btn_move_up: 'تحريك لأعلى',
      btn_move_down: 'تحريك لأسفل',
      btn_hide_section: 'إخفاء القسم',
      btn_show_section: 'إظهار القسم',
      btn_delete: 'حذف',
      btn_delete_section: 'حذف القسم',
      btn_more_options: 'المزيد من الخيارات',
      btn_duplicate_section: 'تكرار القسم',
      btn_undo: 'تراجع',
      btn_redo: 'إعادة',
      viewport_mobile: 'شاشة الجوال (390px)',
      viewport_tablet: 'جهاز لوحي (768px)',
      viewport_desktop: 'سطح المكتب (1024px)',
      inspector_title: 'تعديل محتوى القسم',
      inspector_empty: 'اختر أي قسم من المعاينة الحية لتعديل نصوصه وتفاصيله',

      // Video & Opening Experiences
      opening_experience_title: 'نوع تجربة وافتتاحية الدعوة',
      opening_experience_sub: 'اختر الطريقة التي ستظهر بها الدعوة لضيوفك عند فتح الرابط الشخصي',
      opening_style_hanging_card: 'بطاقة دعوة معلّقة (التوقيع الملكي)',
      opening_style_hanging_card_desc: 'بطاقة معلقة بشريط حريري تتأرجح بنعومة وتتحول بسحبها للدعوة',
      opening_style_video_hanging: 'فيديو + بطاقة معلّقة',
      opening_style_video_hanging_desc: 'يبدأ بفيديو سينمائي ثم يتحول لبطاقة معلقة يسحبها الضيف',
      opening_style_video: 'فيديو سينمائي مخصص',
      opening_style_video_desc: 'فيديو فاخر يتضمن أسماء الضيوف المتغيرة تلقائياً',
      opening_style_card: 'بطاقة دعوة تفاعلية',
      opening_style_card_desc: 'بطاقة زفاف رقمية مع سحب تفاعلي سلس للأعلى',
      opening_style_couple: 'مشهد العروسين الفني',
      opening_style_couple_desc: 'لوحة فنية ناعمة لظلال العروسين تكشف تفاصيل الحفل',
      opening_style_video_card: 'فيديو + بطاقة تفاعلية',
      opening_style_video_card_desc: 'يبدأ بفيديو مخصص ثم يتحول لبطاقة تفاعلية يفتحها الضيف',
      opening_style_none: 'دخول مباشر',
      opening_style_none_desc: 'عرض معلومات الدعوة فوراً بدون أي شاشات افتتاحية',
      
      // Hanging Card Settings
      hanging_swipe_instruction: 'اسحب البطاقة للأعلى لفتح الدعوة',
      hanging_intensity_title: 'شدة وتأثير حركة التعليق',
      hanging_intensity_cinematic: 'سينمائي (موصى به)',
      hanging_intensity_calm: 'هادئ وناعم',
      hanging_intensity_static: 'بدون حركة (ثابت)',
      
      // Video Controls & Overlay Timeline
      video_source_title: 'مصدر ومحتوى الفيديو السينمائي',
      video_source_template: 'قوالب QuickRSVP الجاهزة',
      video_source_upload: 'رفع فيديو خاص من جهازي',
      video_btn_preview: 'معاينة الافتتاحية الحية',
      video_skip_intro: 'تخطي الافتتاحية',
      video_play_sound: 'تشغيل الصوت',
      video_mute_sound: 'كتم الصوت',
      video_swipe_instruction: 'اسحب للأعلى لفتح تفاصيل الدعوة',
      video_overlay_timeline: 'شريط النصوص والأسماء المخصصة (Timeline)',
      video_add_overlay: 'إضافة نص جديد',
      video_var_guest_name: 'اسم الضيف {guest_name}',
      video_var_family: 'اسم العائلة {family_name}',
      video_var_couple: 'أسماء العروسين {couple_names}',
      video_var_date: 'تاريخ الحفل {event_date}',
      video_var_venue: 'مكان الحفل {venue}',
      video_var_seats: 'عدد المقاعد {seats}',
      video_preset_1: 'دعوة خاصة إلى {guest_name}',
      video_preset_2: 'يتشرف {couple_names} بدعوة {guest_name}',
      video_preset_3: 'بكل الحب ندعو {guest_name} وعائلته',

      // Themes
      theme_picker_title: 'اختر الثيم الملكي للدعوة',
      theme_royal_arabic: 'الملكي العربي (Royal Arabic)',
      theme_modern_minimal: 'المودرن العصري (Modern Minimal)',
      theme_romantic_garden: 'الحديقة الرومانسية (Romantic Garden)',
      theme_editorial_luxury: 'الفخامة التحريرية (Editorial Luxury)',
      theme_saudi_luxury: 'الفخامة السعودية (Saudi Luxury)',
      theme_night_wedding: 'الليلة الساهرة (Night Wedding)',
      theme_customize_colors: 'تخصيص درجات الألوان',
      theme_primary_color: 'اللون الأساسي',
      theme_accent_color: 'لون اللمسات الذهبية',
      theme_bg_color: 'لون الخلفية العامة',

      // Modular Sections Names
      sec_hero: 'واجهة الدعوة الرئيسية (Hero)',
      sec_welcome: 'الترحيب المخصص بالضيف',
      sec_blessing: 'الآية الكريمة ودعاء الزواج',
      sec_countdown: 'العداد التنازلي للحفل',
      sec_timeline: 'جدول وفقرات الحفل (Itinerary)',
      sec_venue: 'موقع القاعة والخرائط',
      sec_calendar: 'إضافة إلى التقويم',
      sec_dresscode: 'قواعد وألوان الزي (Dress Code)',
      sec_rsvp: 'نموذج تأكيد الحضور (RSVP)',
      sec_catering: 'قائمة الطعام والضيافة',
      sec_song: 'اقتراح أغاني للحفل (DJ)',
      sec_gallery: 'معرض الصور التذكارية',
      sec_travel: 'الإقامة والمواصلات',
      sec_qr_pass: 'بطاقة الدخول الرقمية (QR Pass)',

      // Public Guest Invitation View & RSVP Flow
      guest_welcome_badge: 'دعوة شخصية خاصة',
      guest_greeting_prefix: 'أهلاً بك،',
      guest_couple_invite_text: 'يتشرفان بدعوتكم لمشاركتهما فرحة العمر في هذه الليلة المباركة',
      guest_wedding_date: 'التاريخ والموعد',
      guest_venue_title: 'مكان الحفل',
      btn_google_maps: 'فتح في Google Maps',
      btn_apple_maps: 'فتح في Apple Maps',
      btn_add_google_cal: 'إضافة إلى تقويم Google',
      btn_download_ics: 'تحميل للتقويم (Apple / Outlook)',
      
      // RSVP Module in Invitation
      rsvp_question: 'هل يسعدنا حضورك ومشاركتنا الفرحة؟',
      rsvp_btn_attending: 'بكل سرور سأحضر 🤍',
      rsvp_btn_declined: 'للأسف أعتذر عن الحضور',
      rsvp_attending_count_label: 'عدد الحاضرين المؤكدين:',
      rsvp_companion_names_label: 'أسماء المرافقين:',
      rsvp_meal_choice_label: 'اختيار الوجبة الرئيسية:',
      rsvp_allergies_label: 'هل توجد أي حساسية أو قيود غذائية؟',
      rsvp_allergies_ph: 'مثال: حساسية المكسرات، وجبة نباتية، خالية من الجلوتين...',
      rsvp_notes_label: 'رسالة تهنئة للعروسين (اختياري):',
      rsvp_notes_ph: 'اكتب كلمة مباركة ومشاعر دافئة للعروسين...',
      rsvp_submit_btn: 'تأكيد الحضور واستلام بطاقة الدخول',
      rsvp_decline_submit_btn: 'إرسال الاعتذار مع التهاني',

      // RSVP Success & Confirmation Card
      rsvp_success_title: 'تم تأكيد حضوركم بكل سرور 🤍',
      rsvp_success_subtitle: 'يسعدنا جداً حضورك، ننتظر بشوق رؤيتكم في هذه الليلة الاستثنائية!',
      rsvp_decline_success_title: 'وصلتنا أمنياتكم الطيبة 🤍',
      rsvp_decline_success_subtitle: 'نأسف لعدم تمكنكم من الحضور، ومشاعركم النبيلة وصلتنا بحب وامتنان.',
      rsvp_pass_title: 'بطاقة الدخول الرقمية الرسمية (VIP Pass)',
      rsvp_pass_subtitle: 'يرجى إبراز هذا الرمز عند البوابة لتسجيل الدخول السريع',
      btn_save_pass_image: 'حفظ البطاقة في هاتفي',

      // Check-In Scanner
      checkin_portal_title: 'بوابة تسجيل الحضور الفاخرة',
      checkin_portal_subtitle: 'التحقق السريع من بطاقات الدخول الرقمية عبر الكاميرا والباركود',
      scanner_camera_title: 'ماسح الرمز الرقمي (QR Camera Scanner)',
      scanner_align_hint: 'وجّه الكاميرا نحو رمز بطاقة الضيف',
      scanner_status_active: 'الكاميرا جاهزة ونشطة',
      scanner_status_permission: 'يرجى السماح بالوصول إلى الكاميرا لمسح البطاقات',
      scanner_sim_btn: '⚡ محاكاة مسح بطاقة تجريبية (هاشم النماري)',
      scanner_manual_search_title: 'بحث سريع بالاسم في حال تعذر المسح:',
      scanner_manual_search_ph: 'اكتب اسم الضيف أو رقم الطاولة للتحقق السريع...',
      scanner_verified_title: 'تم تسجيل الدخول بنجاح ✓',
      scanner_verified_sub: 'مرحباً بضيفنا الكريم • دخول مأذون',
      scanner_duplicate_warning: '⚠️ تنبيه: تم استخدام هذه البطاقة مسبقاً!',
      scanner_duplicate_time: 'وقت الدخول الأول:',
      scanner_btn_override: 'السماح بالدخول الإضافي (Override)',
      door_stats_title: 'إحصائيات الدخول المباشرة',
      door_arrived_now: 'الحاضرون حالياً:',
      door_remaining: 'المتبقي وصولهم:',
      door_rate: 'نسبة الإنجاز:',

      // Analytics View
      analytics_title: 'لوحة التقارير والتحليلات المتكاملة',
      analytics_subtitle: 'نظرة معمقة وشاملة على استجابات المدعوين والخيارات اللوجستية',
      chart_response_velocity: 'معدل التجاوب مع الدعوة',
      chart_dietary_needs: 'توزيع تفضيلات الوجبات',
      chart_attendance_distribution: 'توزيع فئات الحضور',
      dietary_beef: 'لحم العجل بالكمأة',
      dietary_salmon: 'السلمون الأطلسي',
      dietary_vegetarian: 'أطباق نباتية صحية',
      dietary_allergies_count: 'حالات حساسية غذائية مسجلة',

      // Settings View
      settings_title: 'إعدادات الحفل والمنصة',
      settings_subtitle: 'تعديل البيانات الأساسية، سياسات التأكيد، والنسخ الاحتياطي',
      settings_sec_event: 'بيانات الحفل الأساسية',
      settings_event_name: 'عنوان الحفل / أسماء العروسين',
      settings_event_date: 'تاريخ وتوقيت الحفل',
      settings_venue_name: 'اسم القاعة والمدينة',
      settings_sec_rsvp: 'قواعد تأكيد الحضور (RSVP)',
      settings_rsvp_deadline: 'الموعد النهائي لقبول الردود',
      settings_allow_plus_one: 'تفعيل إمكانية دعوة مرافقين (+1)',
      settings_enable_meals: 'تفعيل اختيار الوجبات الفردية',
      settings_enable_songs: 'تفعيل طلبات الأغاني (DJ)',
      settings_enable_gallery: 'تفعيل معرض الصور التفاعلي',
      settings_sec_data: 'إدارة البيانات والنسخ الاحتياطي',
      settings_backup_export: 'تصدير نسخة احتياطية كاملة (JSON)',
      settings_backup_import: 'استيراد نسخة احتياطية',
      settings_reset_demo: 'استعادة البيانات التجريبية الافتراضية',
      btn_save_settings: 'حفظ كافة الإعدادات',

      // Feedback Toasts
      toast_guest_added: 'تمت إضافة الضيف إلى القائمة بنجاح',
      toast_guest_updated: 'تم تحديث بيانات الضيف بنجاح',
      toast_guest_deleted: 'تم حذف الضيف من السجل',
      toast_rsvp_success: 'تم تسجيل تأكيد الحضور بنجاح!',
      toast_link_copied: 'تم نسخ الرابط الشخصي إلى الحافظة',
      toast_msg_copied: 'تم نسخ نص الرسالة إلى الحافظة',
      toast_export_success: 'تم تصدير ملف Excel بنجاح',
      toast_checkin_success: 'تم تسجيل حضور الضيف عند البوابة بنجاح',
      toast_settings_saved: 'تم حفظ كافة الإعدادات بنجاح'
    },

    en: {
      // Brand & Header
      brand_name: 'QuickRSVP',
      brand_tagline: 'Premium Wedding & Event Management Platform',
      switch_lang: 'العربية',
      switch_lang_flag: '🇸🇦',
      preview_as_guest: 'Preview as Guest',
      save_changes: 'Save Changes',
      saving: 'Saving...',
      saved: 'Saved successfully ✓',
      unsaved_changes: 'Unsaved changes',

      // Primary Navigation
      nav_overview: 'Overview',
      nav_invitation: 'Design Invitation',
      nav_guests: 'Guests',
      nav_rsvp: 'RSVP & Meals',
      nav_messages: 'Messages',
      nav_checkin: 'Check-In',
      nav_analytics: 'Analytics',
      nav_settings: 'Settings',
      nav_more: 'More',

      // Overview Dashboard
      dash_greeting_afternoon: 'Good afternoon 👋',
      dash_greeting_morning: 'Good morning 👋',
      dash_event_countdown: 'Time remaining until the big day',
      dash_days: 'Days',
      dash_hours: 'Hours',
      dash_minutes: 'Mins',
      dash_seconds: 'Secs',
      dash_quick_actions: 'Quick Actions',
      dash_action_add_guest: 'Add Guest',
      dash_action_send_invites: 'Send Invitations',
      dash_action_design_invite: 'Design Invitation',
      dash_action_open_scanner: 'Open Check-In',
      dash_action_export_csv: 'Export Excel (CSV)',
      dash_action_copy_link: 'Copy Invitation Link',

      // KPI Metric Cards
      stat_total_guests: 'Total Invited',
      stat_total_sub: 'Includes families & plus-ones',
      stat_confirmed: 'Confirmed Attending',
      stat_confirmed_sub: 'Official confirmations',
      stat_declined: 'Declined',
      stat_declined_sub: 'With warm wishes',
      stat_awaiting: 'Awaiting Response',
      stat_awaiting_sub: 'Pending reply',
      stat_checked_in: 'Checked In',
      stat_checked_in_sub: 'Scanned at the door',
      stat_response_rate: 'Response Rate',

      // RSVP Progress Breakdown
      rsvp_progress_title: 'RSVP Response Breakdown',
      rsvp_attending_label: 'Attending',
      rsvp_declined_label: 'Declined',
      rsvp_pending_label: 'Pending',
      rsvp_expected_attendees: 'Total Expected Attendees (with plus-ones)',

      // Activity Feed
      recent_activity: 'Recent Activity & RSVPs',
      activity_rsvp_confirmed: 'confirmed attendance (+1 companion)',
      activity_rsvp_declined: 'warmly declined with blessings',
      activity_checked_in: 'checked in at the main gate',
      activity_invite_sent: 'invitation dispatched via WhatsApp',
      activity_just_now: 'Just now',
      activity_mins_ago: 'mins ago',
      activity_hours_ago: 'hours ago',

      // Guest Management (CRM)
      guests_title: 'Guest List & CRM Directory',
      guests_subtitle: 'Manage digital invitations, RSVP statuses, catering selections, and seating assignments',
      guest_search_placeholder: 'Search by guest name, phone, family group, or table...',
      filter_all: 'All',
      filter_awaiting: 'Awaiting Response',
      filter_attending: 'Attending',
      filter_declined: 'Declined',
      filter_not_invited: 'Not Sent Yet',
      filter_invited: 'Invite Sent',
      filter_checked_in: 'Checked In',
      filter_families: 'Families & Groups',
      add_guest_btn: 'Add Guest',
      import_guests_btn: 'Import Guests',
      export_dropdown: 'Export Lists',
      export_all_guests: 'Complete Guest List (CSV)',
      export_catering: 'Catering & Meal Breakdown (CSV)',
      export_checkin: 'Door Check-In Sheet (CSV)',

      // Table & Card Columns
      col_guest_name: 'Guest / Family Name',
      col_contact: 'Phone Number',
      col_group: 'Group / Family',
      col_seats: 'Seats Allowed',
      col_status: 'RSVP Status',
      col_meals: 'Meals & Notes',
      col_table: 'Table',
      col_actions: 'Actions',

      // Guest Status Badges
      badge_attending: 'Attending',
      badge_declined: 'Declined',
      badge_awaiting: 'Awaiting',
      badge_not_sent: 'Not Sent',
      badge_sent: 'Sent',
      badge_checked_in: 'Checked In',
      badge_family: 'Family Group',

      // Guest Modal Form
      modal_add_guest_title: 'Add New Guest / Family',
      modal_edit_guest_title: 'Edit Guest Details',
      field_primary_name: 'Primary Guest Full Name',
      field_phone: 'Phone Number (with country code)',
      field_family_group: 'Family / Group Name (Optional)',
      field_allowed_seats: 'Number of Seats Allowed',
      field_table_no: 'Assigned Table',
      field_private_note: 'Private Host Note (Hidden from guest)',
      btn_save_guest: 'Save Guest Details',
      btn_cancel: 'Cancel',

      // Import Modal
      modal_import_title: 'Import Guests from File or Text',
      import_tab_csv: 'Excel / CSV File',
      import_tab_paste: 'Bulk Text Paste',
      import_drag_drop_csv: 'Drop CSV file here or click to browse',
      import_csv_tip: 'File should have headers: Name, Phone, Seats, Table, Group',
      import_paste_ph: 'Paste guest list with one per line:\nMohammed Al-Abdullah, +966501234567, 2, Table 5\nSarah Al-Ahmad, +966559876543, 1, Table 2',
      import_download_sample: 'Download Sample CSV',
      btn_process_import: 'Import Selected Guests',

      // Messages Center
      messages_title: 'WhatsApp Invitations & Messaging',
      messages_subtitle: 'Ready-to-send luxury wedding message templates with personalized secure links',
      template_initial_invite: 'Official Wedding Invitation',
      template_reminder: 'Gentle RSVP Reminder',
      template_location_update: 'Venue & Driving Directions',
      template_countdown_24h: '24-Hour Countdown Message',
      template_thank_you: 'Post-Event Thank You Note',
      btn_copy_template: 'Copy Message',
      btn_send_via_wa: 'Send via WhatsApp',
      wa_preview_title: 'Personalized Message Preview:',

      // Invitation Builder
      builder_title: 'Wedding Invitation Designer',
      builder_subtitle: 'Full visual control over blocks, themes, typography, colors, and media',
      builder_tab_sections: 'Sections & Content',
      builder_tab_theme: 'Themes & Colors',
      builder_tab_settings: 'General Settings',
      btn_add_section: 'Add Section',
      btn_move_up: 'Move Up',
      btn_move_down: 'Move Down',
      btn_hide_section: 'Hide Section',
      btn_show_section: 'Show Section',
      // Video & Opening Experiences
      opening_experience_title: 'Invitation Opening Experience',
      opening_experience_sub: 'Choose how your guests will be welcomed when opening their personalized link',
      opening_style_hanging_card: 'Hanging Invitation Card (Royal Signature)',
      opening_style_hanging_card_desc: 'Suspended card with silk ribbon, gentle micro-sway and tactile pull-up',
      opening_style_video_hanging: 'Video + Hanging Card',
      opening_style_video_hanging_desc: 'Starts with personalized video then resolves into a suspended physical card',
      opening_style_video: 'Cinematic Video Invitation',
      opening_style_video_desc: 'Luxury video featuring real-time personalized guest names',
      opening_style_card: 'Interactive Invitation Card',
      opening_style_card_desc: 'Digital tactile card with smooth upward swipe reveal',
      opening_style_couple: 'Couple Reveal',
      opening_style_couple_desc: 'Artistic couple silhouette artwork uncovering wedding details',
      opening_style_video_card: 'Video + Interactive Card',
      opening_style_video_card_desc: 'Starts with personalized video then resolves into a swipeable card',
      opening_style_none: 'Direct Invitation',
      opening_style_none_desc: 'Displays wedding invitation directly without intro screens',
      
      // Hanging Card Settings
      hanging_swipe_instruction: 'Pull up the card to open invitation',
      hanging_intensity_title: 'Suspension Motion Intensity',
      hanging_intensity_cinematic: 'Cinematic (Recommended)',
      hanging_intensity_calm: 'Calm & Subtle',
      hanging_intensity_static: 'Static (Accessibility)',
      
      // Video Controls & Overlay Timeline
      video_source_title: 'Cinematic Video Asset & Source',
      video_source_template: 'QuickRSVP Luxury Video Presets',
      video_source_upload: 'Upload Custom Wedding Video',
      video_btn_preview: 'Preview Live Opening',
      video_skip_intro: 'Skip Intro',
      video_play_sound: 'Play Audio',
      video_mute_sound: 'Mute Audio',
      video_swipe_instruction: 'Swipe up to open invitation details',
      video_overlay_timeline: 'Dynamic Personalization Timeline',
      video_add_overlay: 'Add Text Overlay',
      video_var_guest_name: 'Guest Name {guest_name}',
      video_var_family: 'Family Name {family_name}',
      video_var_couple: 'Couple Names {couple_names}',
      video_var_date: 'Event Date {event_date}',
      video_var_venue: 'Venue {venue}',
      video_var_seats: 'Seats {seats}',
      video_preset_1: 'Special invitation to {guest_name}',
      video_preset_2: '{couple_names} cordially invite {guest_name}',
      video_preset_3: 'With love, we invite {guest_name} & family',

      // Themes
      theme_picker_title: 'Select Wedding Theme',
      theme_royal_arabic: 'Royal Arabic',
      theme_modern_minimal: 'Modern Minimal',
      theme_romantic_garden: 'Romantic Garden',
      theme_editorial_luxury: 'Editorial Luxury',
      theme_saudi_luxury: 'Saudi Luxury',
      theme_night_wedding: 'Night Wedding',
      theme_customize_colors: 'Customize Color Palette',
      theme_primary_color: 'Primary Brand Color',
      theme_accent_color: 'Metallic Accent Color',
      theme_bg_color: 'Page Background',

      // Modular Sections Names
      sec_hero: 'Hero RSVP Entrance',
      sec_welcome: 'Personalized Greeting',
      sec_blessing: 'Wedding Blessing & Story',
      sec_countdown: 'Live Countdown Clock',
      sec_timeline: 'Event Schedule & Itinerary',
      sec_venue: 'Venue & Interactive Maps',
      sec_calendar: 'Add to Calendar',
      sec_dresscode: 'Dress Code & Palette',
      sec_rsvp: 'Interactive RSVP Module',
      sec_catering: 'Fine Catering & Dining',
      sec_song: 'Song Request (DJ)',
      sec_gallery: 'Shared Photo Gallery',
      sec_travel: 'Accommodation & Valet',
      sec_qr_pass: 'VIP Digital Entry Pass',

      // Public Guest Invitation View & RSVP Flow
      guest_welcome_badge: 'Exclusive Personal Invitation',
      guest_greeting_prefix: 'Welcome,',
      guest_couple_invite_text: 'Joyfully request the pleasure of your company to celebrate our wedding day',
      guest_wedding_date: 'Date & Time',
      guest_venue_title: 'Wedding Venue',
      btn_google_maps: 'Open in Google Maps',
      btn_apple_maps: 'Open in Apple Maps',
      btn_add_google_cal: 'Add to Google Calendar',
      btn_download_ics: 'Download Calendar File (.ics)',

      // RSVP Module in Invitation
      rsvp_question: 'Will you be celebrating with us?',
      rsvp_btn_attending: "Yes, I'll Be There 🤍",
      rsvp_btn_declined: "Regretfully Decline",
      rsvp_attending_count_label: 'Number of Attending Guests:',
      rsvp_companion_names_label: 'Companion Names:',
      rsvp_meal_choice_label: 'Main Entrée Selection:',
      rsvp_allergies_label: 'Any dietary requirements or allergies?',
      rsvp_allergies_ph: 'e.g., Nut allergy, Vegetarian, Gluten-free...',
      rsvp_notes_label: 'Warm Message to the Couple (Optional):',
      rsvp_notes_ph: 'Share your warm wishes and congratulations...',
      rsvp_submit_btn: 'Confirm RSVP & Get Entry Pass',
      rsvp_decline_submit_btn: 'Send Warm Regards & Decline',

      // RSVP Success & Confirmation Card
      rsvp_success_title: 'Attendance Confirmed 🤍',
      rsvp_success_subtitle: "We are thrilled to celebrate with you. Can't wait to see you on our special day!",
      rsvp_decline_success_title: 'Warm Wishes Received 🤍',
      rsvp_decline_success_subtitle: 'We will miss your presence, but deeply appreciate your warm blessings and love.',
      rsvp_pass_title: 'Official VIP Digital Entry Pass',
      rsvp_pass_subtitle: 'Please present this digital pass at the entrance for express check-in',
      btn_save_pass_image: 'Save Pass to Phone',

      // Check-In Scanner
      checkin_portal_title: 'VIP Gate & Check-In Portal',
      checkin_portal_subtitle: 'Rapid QR code verification and live door management',
      scanner_camera_title: 'QR Code Camera Scanner',
      scanner_align_hint: 'Align camera over guest digital QR pass',
      scanner_status_active: 'Camera Active & Scanning',
      scanner_status_permission: 'Camera permission required to scan guest passes',
      scanner_sim_btn: '⚡ Simulate Pass Scan (Hashim Al-Nimari)',
      scanner_manual_search_title: 'Manual guest lookup if camera unavailable:',
      scanner_manual_search_ph: 'Type guest name or table number to check in...',
      scanner_verified_title: 'Entry Verified & Access Granted ✓',
      scanner_verified_sub: 'Welcome honored guest • Full Access',
      scanner_duplicate_warning: '⚠️ Warning: This pass was already checked in!',
      scanner_duplicate_time: 'Initial Entry Time:',
      scanner_btn_override: 'Allow Additional Entry (Override)',
      door_stats_title: 'Live Arrival Statistics',
      door_arrived_now: 'Checked In Now:',
      door_remaining: 'Awaiting Arrival:',
      door_rate: 'Door Velocity:',

      // Analytics View
      analytics_title: 'Event Analytics & Insights',
      analytics_subtitle: 'Real-time response breakdown, catering totals, and door attendance metrics',
      chart_response_velocity: 'RSVP Response Velocity',
      chart_dietary_needs: 'Meal Selection Breakdown',
      chart_attendance_distribution: 'Attendance Distribution',
      dietary_beef: 'Truffle-Crusted Beef Filet',
      dietary_salmon: 'Atlantic Grilled Salmon',
      dietary_vegetarian: 'Artisanal Vegetarian',
      dietary_allergies_count: 'Special Allergies Noted',

      // Settings View
      settings_title: 'Event & Platform Settings',
      settings_subtitle: 'Manage core wedding details, RSVP rules, and data backups',
      settings_sec_event: 'Core Event Information',
      settings_event_name: 'Event Title / Couple Names',
      settings_event_date: 'Event Date & Time',
      settings_venue_name: 'Venue Hall & City',
      settings_sec_rsvp: 'RSVP & Guest Policies',
      settings_rsvp_deadline: 'RSVP Deadline Date',
      settings_allow_plus_one: 'Allow Guests to bring Plus-Ones (+1)',
      settings_enable_meals: 'Enable Individual Meal Selection',
      settings_enable_songs: 'Enable Song Requests (DJ)',
      settings_enable_gallery: 'Enable Shared Photo Gallery',
      settings_sec_data: 'Data Management & Backup',
      settings_backup_export: 'Export Full Backup (JSON)',
      settings_backup_import: 'Restore from Backup',
      settings_reset_demo: 'Restore Default Demo Data',
      btn_save_settings: 'Save All Settings',

      // Feedback Toasts
      toast_guest_added: 'Guest added successfully',
      toast_guest_updated: 'Guest details updated',
      toast_guest_deleted: 'Guest removed from directory',
      toast_rsvp_success: 'RSVP submitted successfully!',
      toast_link_copied: 'Personal invite link copied to clipboard',
      toast_msg_copied: 'Message template copied to clipboard',
      toast_export_success: 'Excel CSV file exported successfully',
      toast_checkin_success: 'Guest checked in at the door',
      toast_settings_saved: 'Settings saved successfully'
    }
  },

  t(key, fallback = '') {
    if (!key) return fallback;
    const currentDict = this.translations[this.currentLang];
    if (currentDict && currentDict[key] !== undefined && currentDict[key] !== null) {
      return currentDict[key];
    }
    const arDict = this.translations.ar || {};
    if (arDict[key] !== undefined && arDict[key] !== null) {
      return arDict[key];
    }
    const enDict = this.translations.en || {};
    if (enDict[key] !== undefined && enDict[key] !== null) {
      return enDict[key];
    }
    return fallback || key || '';
  },

  setLanguage(lang) {
    if (lang !== 'ar' && lang !== 'en') return;
    this.currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update body font class for typography excellence
    if (lang === 'ar') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans-en');
    } else {
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-sans-en');
    }

    // Refresh UI elements with data-i18n
    this.updateDom();
  },

  updateDom() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        // Only update placeholder if not specified explicitly
      } else {
        el.innerText = val;
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', this.t(key));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', this.t(key));
    });
  }
};

if (typeof window !== 'undefined') {
  window.I18n = I18n;
}
