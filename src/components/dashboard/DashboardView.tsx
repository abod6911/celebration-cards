import React from 'react';
import { HeroEventCard } from './HeroEventCard';
import { MetricCardsGrid } from './MetricCardsGrid';
import { RSVPConversionBar } from './RSVPConversionBar';
import { RecentActivityStream } from './RecentActivityStream';

export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <HeroEventCard />
      <MetricCardsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <RSVPConversionBar />
        </div>
        <div className="lg:col-span-7">
          <RecentActivityStream />
        </div>
      </div>
    </div>
  );
};
