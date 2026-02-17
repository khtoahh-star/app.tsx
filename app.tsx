import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Planner } from './components/Planner';
import { TripDetails } from './components/TripDetails';
import { Budget } from './components/Budget';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider, useLanguage } from './utils/LanguageContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const { t, isRTL } = useLanguage();

  const handlePlanGenerated = (plan: any) => {
    setGeneratedPlan(plan);
    setActiveTab('trips');
  };

  const handleBackToPlanner = () => {
    setGeneratedPlan(null);
    setActiveTab('planner');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'planner':
        return <Planner onPlanGenerated={handlePlanGenerated} />;
      case 'trips':
        if (generatedPlan) {
          return <TripDetails plan={generatedPlan} onBack={handleBackToPlanner} />;
        }
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center gap-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
              <span className="text-4xl">🏜️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('noActiveTrips')}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('noActiveTripsDesc')}
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('planner')}
              className="px-8 py-3.5 bg-[#006C35] text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95"
            >
              {t('planFirst')}
            </button>
          </div>
        );
      case 'profile':
        return <Budget />;
      case 'destinations':
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-8 text-center gap-6">
             <div className="w-24 h-24 bg-[#006C35]/5 rounded-full flex items-center justify-center border border-[#006C35]/10">
              <span className="text-4xl">🏛️</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('exploreDest')}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('exploreDestDesc')}
              </p>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              {['Riyadh', 'Jeddah', 'AlUla', 'NEOM', 'Taif', 'Abha'].map(city => (
                <div key={city} className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-center font-bold text-gray-800">
                  {city}
                </div>
              ))}
            </div>
        </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FDFCF9] selection:bg-[#006C35]/30"
      style={{ fontFamily: isRTL ? '"Cairo", sans-serif' : '"Inter", sans-serif' }}
    >
      <Header />
      
      <main className="max-w-md mx-auto min-h-screen overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
