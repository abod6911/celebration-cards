import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { WeddingShowcaseLanding } from './components/showcase/WeddingShowcaseLanding';
import { DashboardView } from './components/dashboard/DashboardView';
import { InvitationStudio } from './components/builder/InvitationStudio';
import { GuestCRM } from './components/crm/GuestCRM';
import { SeatingPlanner } from './components/seating/SeatingPlanner';
import { WhatsAppHub } from './components/messaging/WhatsAppHub';
import { VIPScannerPortal } from './components/checkin/VIPScannerPortal';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';

const MainViewRouter: React.FC = () => {
  const { view } = useApp();

  if (view === 'showcase') {
    return <WeddingShowcaseLanding />;
  }

  return (
    <Layout>
      {view === 'overview' && <DashboardView />}
      {view === 'builder' && <InvitationStudio />}
      {view === 'guests' && <GuestCRM />}
      {view === 'seating' && <SeatingPlanner />}
      {view === 'messages' && <WhatsAppHub />}
      {view === 'checkin' && <VIPScannerPortal />}
      {view === 'analytics' && <AnalyticsView />}
      {view === 'settings' && <SettingsView />}
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainViewRouter />
    </AppProvider>
  );
};

export default App;
