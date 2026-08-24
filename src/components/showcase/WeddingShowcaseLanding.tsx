import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  Smartphone, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Star, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { soundFx } from '../../lib/sound';

export const WeddingShowcaseLanding: React.FC = () => {
  const { setView } = useApp();
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'storyboard' | 'matrix'>('storyboard');
  const [guestRsvpChoice, setGuestRsvpChoice] = useState<'yes' | 'no' | null>(null);
  const [hangingPulled, setHangingPulled] = useState<boolean>(false);

  const totalSlides = 6;

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveSlide(prev => (prev >= totalSlides ? 1 : prev + 1));
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const slideNames = [
    { num: '01', id: 1, label: '01 الافتتاحية الملكية', en: '01 Royal Opening' },
    { num: '02', id: 2, label: '02 البطاقة المعلّقة', en: '02 Hanging Card' },
    { num: '03', id: 3, label: '03 تأكيد الحضور RSVP', en: '03 Smart RSVP' },
    { num: '04', id: 4, label: '04 مسح الـ QR عند البوابة', en: '04 Gate QR Pass' },
    { num: '05', id: 5, label: '05 مخطط وتوزيع الطاولات', en: '05 Seating Plan' },
    { num: '06', id: 6, label: '06 تهاني وتبريكات العرسان', en: '06 Wishes & Outro' },
  ];

  const handleSlideChange = (newSlide: number) => {
    soundFx.playTap();
    setActiveSlide(newSlide);
    setHangingPulled(false);
    setGuestRsvpChoice(null);
  };

  const handleNext = () => {
    handleSlideChange(activeSlide >= totalSlides ? 1 : activeSlide + 1);
  };

  const handlePrev = () => {
    handleSlideChange(activeSlide <= 1 ? totalSlides : activeSlide - 1);
  };

  return (
    <div className="min-h-screen bg-[#0E0B16] text-white p-3 sm:p-6 lg:p-10 flex flex-col items-center justify-center antialiased selection:bg-gold-champagne/30 selection:text-emerald-950 font-sans relative overflow-x-hidden">
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="w-full max-w-[1400px] bg-[#FAF8F5] text-[#1A2E26] rounded-[36px] sm:rounded-[48px] shadow-2xl border border-white/20 p-4 sm:p-8 lg:p-12 relative overflow-hidden flex flex-col justify-between min-h-[920px]">
        
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[700px] lg:w-[950px] h-[450px] sm:h-[700px] lg:h-[950px] pointer-events-none -z-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-purple-200/40 animate-pulse" />
          <div className="absolute w-[80%] h-[80%] rounded-full border border-purple-200/50" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-purple-200/60" />
          <div className="absolute w-[40%] h-[40%] rounded-full border border-purple-300/70" />
          <div className="absolute w-[20%] h-[20%] rounded-full border border-purple-400/80 bg-purple-100/20 blur-sm" />
        </div>

        <header className="relative z-30 max-w-5xl mx-auto w-full mb-8">
          <div className="bg-[#EAE4F2]/90 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-md border border-purple-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                ⚡
              </div>
              <span className="font-serif font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                Quick<span className="text-purple-600">RSVP</span>.me
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
              <button type="button" onClick={() => handleSlideChange(1)} className="hover:text-purple-600 transition">المميزات</button>
              <button type="button" onClick={() => handleSlideChange(2)} className="hover:text-purple-600 transition">كيف تعمل الدعوة</button>
              <button type="button" onClick={() => handleSlideChange(3)} className="hover:text-purple-600 transition">المحاكي السينمائي</button>
              <button type="button" onClick={() => handleSlideChange(6)} className="hover:text-purple-600 transition">آراء وتبريكات</button>
              <button type="button" onClick={() => handleSlideChange(4)} className="hover:text-purple-600 transition">الأمان و QR</button>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setView('overview')}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs"
              >
                <span>✨ لوحة المنظم</span>
              </button>

              <button
                type="button"
                onClick={() => setView('builder')}
                className="px-4 py-1.5 rounded-full bg-[#1A162B] hover:bg-purple-950 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <span>صمم بطاقتك ↗</span>
              </button>
            </div>
          </div>
        </header>

        <div className="relative z-20 text-center max-w-3xl mx-auto space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100/80 border border-purple-300/80 text-purple-900 text-xs font-bold shadow-2xs">
            <span>✨</span>
            <span>الجيل الجديد من بطاقات دعوات الزفاف الفاخرة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-slate-900 tracking-tight leading-tight">
            مرحباً بك في{' '}
            <span className="bg-purple-200/90 text-purple-900 px-3 py-0.5 rounded-2xl border border-purple-300/80 inline-block shadow-xs">
              QuickRSVP
            </span>
          </h1>

          <div className="space-y-1">
            <p className="text-sm sm:text-base font-bold text-slate-800">
              أرقى تجربة دعوات رقمية تفاعلية لحفلات الزفاف والمناسبات الخاصة في الخليج.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              وداعاً لبطاقات الـ PDF الثابتة وفوضى تأكيد الحضور. صمم دعوة زفاف ملكية سينمائية مع مسح QR، وتأكيد الحضور التلقائي عبر واتساب، وتسكين الطاولات.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setView('builder')}
              className="px-6 py-3.5 rounded-full bg-[#1A162B] hover:bg-purple-950 text-white text-xs sm:text-sm font-extrabold transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>احجز بطاقة زفافك @QuickRSVP</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="quickrsvp_invitation_mobile_fast.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-800 border border-slate-300/80 text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>معاينة دعوة حية (50KB سريع)</span>
              <QrCode className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 space-x-reverse">
                <div className="w-6 h-6 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">💍</div>
                <div className="w-6 h-6 rounded-full bg-emerald-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">👑</div>
                <div className="w-6 h-6 rounded-full bg-gold-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">🌸</div>
              </div>
              <span className="font-bold text-slate-900">+12,000 دعوة زفاف مرسلة</span>
            </div>

            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="text-slate-900 font-mono">4.9/5 تقييم العرسان</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>ضمان خصوصية وعدم إزعاج 100%</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto my-6 flex items-center justify-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-0 sm:left-4 lg:left-8 top-12 sm:top-20 z-30 hidden md:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
              ✓
            </div>
            <div className="text-start">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">تم تأكيد الحضور (RSVP)</div>
              <div className="text-xs font-bold text-slate-900">سعادة الأستاذ فهد السديري</div>
              <div className="text-[10px] text-emerald-700 font-semibold font-mono">طاولة كبار الشخصيات (VIP 02)</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute right-0 sm:right-4 lg:right-8 bottom-12 sm:bottom-20 z-30 hidden md:flex items-center gap-3 p-3.5 pl-4 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-2xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">بوابة الاستقبال الحية</div>
              <div className="text-xs font-bold text-slate-900">تم مسح 142+ بطاقة QR</div>
              <div className="text-[10px] text-slate-500">متزامن مع طاقم البوابة ⚡</div>
            </div>
          </motion.div>

          <div className="w-[340px] sm:w-[380px] rounded-[52px] border-[10px] border-[#1C1A27] bg-[#FAF7F2] shadow-2xl ring-4 ring-purple-300/40 relative overflow-hidden h-[540px] flex flex-col justify-between select-none">
            
            <div className="sticky top-2 inset-x-0 mx-auto w-24 h-5 rounded-full bg-black z-40 flex items-center justify-between px-2.5">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <div className="text-[9px] font-mono text-white font-bold">QuickRSVP</div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              <AnimatePresence mode="wait">
                
                {activeSlide === 1 && (
                  <motion.div
                    key="slide_1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3 text-center"
                  >
                    <div 
                      className="p-6 rounded-3xl text-white space-y-3 shadow-lg relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, rgba(14, 11, 22, 0.4) 0%, rgba(14, 11, 22, 0.9) 100%), url("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80") center/cover'
                      }}
                    >
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-[10px] font-bold">
                        <span>✨</span>
                        <span>دعوة زفاف خاصة</span>
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white">مايا & ليام</h3>
                      <div className="w-10 h-0.5 bg-amber-300 mx-auto rounded-full" />
                      <p className="text-[11px] text-white/90">الأربعاء، 14 أكتوبر 2026</p>
                      <p className="text-[10px] text-white/70">قاعة القصر الكبير للمؤتمرات • جدة</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs text-xs space-y-1">
                      <div className="text-[10px] font-bold text-purple-700">الافتتاحية السينمائية</div>
                      <p className="text-slate-600">فيديو مخصص باسم الضيف مع تدرج موسيقي ومؤثرات فاخرة</p>
                    </div>
                  </motion.div>
                )}

                {activeSlide === 2 && (
                  <motion.div
                    key="slide_2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3 text-center"
                  >
                    <div 
                      onClick={() => setHangingPulled(!hangingPulled)}
                      className={cn(
                        "p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer text-center space-y-3 relative shadow-md",
                        hangingPulled 
                          ? "bg-gradient-to-br from-amber-50 to-white border-amber-400 ring-2 ring-amber-300" 
                          : "bg-white border-purple-200 hover:border-purple-400"
                      )}
                    >
                      <div className="w-6 h-10 bg-emerald-950 mx-auto -mt-6 rounded-b-md border-x border-b border-amber-400 flex items-center justify-center text-[10px] text-amber-300">
                        🎗️
                      </div>
                      
                      <div className="text-xs font-bold text-slate-800 font-serif">البطاقة الملكية المعلّقة</div>
                      <div className="text-sm font-bold text-emerald-950">
                        {hangingPulled ? '🎉 تم فتح الدعوة بنجاح!' : '👇 اسحب البطاقة لفتح الدعوة'}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {hangingPulled ? 'أهلاً بك سعادة الأستاذ فهد السديري 🤍' : 'انقر هنا لتجربة السحب الحركي التفاعلي'}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-purple-100 text-xs text-slate-600">
                      محاكاة فيزيائية 1:1 مع ختم الشمع الملكي وتأثير الجاذبية.
                    </div>
                  </motion.div>
                )}

                {activeSlide === 3 && (
                  <motion.div
                    key="slide_3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    <div className="p-5 rounded-3xl bg-white border border-purple-200 shadow-md space-y-3 text-center">
                      <div className="text-xs font-serif font-bold text-purple-800">تأكيد الحضور (Smart RSVP)</div>
                      <div className="text-xs font-bold text-slate-800">هل يسعدنا حضوركم ومشاركتنا الفرحة؟</div>
                      
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setGuestRsvpChoice('yes')}
                          className={cn(
                            "py-2.5 px-3 rounded-xl text-xs font-bold transition",
                            guestRsvpChoice === 'yes' ? "bg-emerald-950 text-amber-200 shadow-md" : "bg-emerald-50 text-emerald-950 border border-emerald-200"
                          )}
                        >
                          يشرفني الحضور 🤍
                        </button>
                        <button
                          type="button"
                          onClick={() => setGuestRsvpChoice('no')}
                          className={cn(
                            "py-2.5 px-3 rounded-xl text-xs font-bold transition",
                            guestRsvpChoice === 'no' ? "bg-rose-950 text-white shadow-md" : "bg-rose-50 text-rose-950 border border-rose-200"
                          )}
                        >
                          أعتذر بلطف 💌
                        </button>
                      </div>

                      {guestRsvpChoice === 'yes' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 rounded-xl bg-emerald-50 text-[11px] text-emerald-900 font-bold border border-emerald-200">
                          ✓ تم تأكيد حجز مقعدين لك ولعائلتك الكريمة!
                        </motion.div>
                      )}
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 text-center">
                      تأكيد الحضور يحدّث لوحة تحكم المنظم ويرسل تنبيه واتساب فوري.
                    </div>
                  </motion.div>
                )}

                {activeSlide === 4 && (
                  <motion.div
                    key="slide_4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3 text-center"
                  >
                    <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-900 text-white border border-amber-400/40 shadow-lg space-y-3">
                      <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">VIP ENTRY PASS</div>
                      <div className="w-32 h-32 mx-auto bg-white p-2.5 rounded-2xl flex items-center justify-center shadow-inner">
                        <QrCode className="w-24 h-24 text-slate-900" />
                      </div>
                      <div className="text-xs font-bold text-amber-200">هاشم النماري • مقعدين</div>
                      <div className="text-[10px] text-white/80 font-mono">طاولة: VIP 01 • رمز: k82f9x</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600">
                      مسح ضوئي ذكي بالبوابة يمنع الدخول المكرر ويكشف المقاعد بدقة.
                    </div>
                  </motion.div>
                )}

                {activeSlide === 5 && (
                  <motion.div
                    key="slide_5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3 text-center"
                  >
                    <div className="p-4 rounded-3xl bg-white border border-purple-200 shadow-md space-y-3">
                      <div className="text-xs font-bold text-purple-900 font-serif">مخطط وتسكين الطاولات</div>
                      
                      <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-amber-400 flex flex-col items-center justify-center bg-amber-50">
                        <span className="font-serif font-bold text-sm text-emerald-950">طاولة 06</span>
                        <span className="text-[9px] text-slate-500 font-bold">4 / 8 مقاعد</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-50 text-[11px] font-bold text-slate-700">
                        عائلة المهندس ريان الغامدي (4 أفراد)
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600">
                      توزيع سلس للضيوف مع إشعارات واتساب برقم الطاولة ومكان الجلوس.
                    </div>
                  </motion.div>
                )}

                {activeSlide === 6 && (
                  <motion.div
                    key="slide_6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3 text-center"
                  >
                    <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-amber-300 shadow-md space-y-2">
                      <div className="text-xs font-bold text-amber-900 font-serif">سجل تهاني ومباركات الضيوف</div>
                      <div className="p-3 rounded-2xl bg-white border border-amber-200 text-xs text-slate-700 italic">
                        "ألف مبروك لأجمل عروسين، بارك الله لكما وعليكما وجمع بينكما في خير 🤍"
                      </div>
                      <div className="text-[10px] text-slate-400 font-bold">— هاشم النماري</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView('builder')}
                      className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition"
                    >
                      صمم بطاقة زفافك الآن ↗
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="p-2.5 bg-white/80 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono px-4">
              <span>QuickRSVP v2.4</span>
              <span className="text-emerald-700 font-bold">● متصل</span>
            </div>
          </div>
        </div>

        <div className="relative z-30 max-w-5xl mx-auto w-full mt-4">
          <div className="bg-[#1A162B]/95 backdrop-blur-md rounded-full px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 shadow-2xl border border-white/10 text-white">
            
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('storyboard')}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5",
                  viewMode === 'storyboard' ? "bg-purple-600 text-white shadow-xs" : "text-white/60 hover:text-white"
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">عرض القصة (Storyboard)</span>
              </button>

              <button
                type="button"
                onClick={() => { setViewMode('matrix'); setView('overview'); }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5",
                  viewMode === 'matrix' ? "bg-purple-600 text-white shadow-xs" : "text-white/60 hover:text-white"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لوحة التحكم (Matrix)</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto py-1">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 transition"
                title={isPlaying ? 'إيقاف مؤقت' : 'تشغيل تلقائي'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ms-0.5" />}
              </button>

              {slideNames.map(s => {
                const isActive = activeSlide === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSlideChange(s.id)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold transition whitespace-nowrap",
                      isActive 
                        ? "bg-purple-600 text-white shadow-xs" 
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="text-xs font-mono text-white/70 font-bold px-1">
                <span className="text-purple-400 font-extrabold">{slideNames[activeSlide - 1]?.num}</span> / 06
              </div>

              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center text-white transition shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
