import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlockLibraryPanel } from './BlockLibraryPanel';
import { PhoneMockupCanvas } from './PhoneMockupCanvas';
import { BlockInspectorPanel } from './BlockInspectorPanel';
import { Button } from '../ui/Button';
import { Eye, Rocket } from 'lucide-react';

export const InvitationStudio: React.FC = () => {
  const { showToast, t } = useApp();
  const [selectedBlockId, setSelectedBlockId] = useState<string>('blk_hero');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  const handlePublish = () => {
    showToast('تم نشر التغييرات بنجاح إلى كافة المدعوين (v2) ✓');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-3 rounded-2xl bg-white border border-gold-champagne/25 shadow-card-luxury flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>تم النشر (v2)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="quickrsvp_invitation_mobile_fast.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>معاينة حية</span>
          </a>

          <Button
            variant="gold"
            size="sm"
            onClick={handlePublish}
            icon={<Rocket className="w-4 h-4" />}
          >
            {t('builder_btn_publish')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3">
          <BlockLibraryPanel 
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </div>

        <div className="lg:col-span-6">
          <PhoneMockupCanvas
            viewport={viewport}
            setViewport={setViewport}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
          />
        </div>

        <div className="lg:col-span-3">
          <BlockInspectorPanel selectedBlockId={selectedBlockId} />
        </div>
      </div>
    </div>
  );
};
