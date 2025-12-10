import { useState } from 'react';
import { Home, Calendar, MessageCircle, Activity, User, Heart, BookOpen } from 'lucide-react';
import { PatientHome } from './patient/PatientHome';
import { PatientEmergency } from './patient/PatientEmergency';
import { PatientDiary } from './patient/PatientDiary';
import { PatientChat } from './patient/PatientChat';
import { PatientProfile } from './patient/PatientProfile';
import { PatientResources } from './patient/PatientResources';
import { PatientCalendar } from './patient/PatientCalendar';

type PatientScreen = 'home' | 'emergency' | 'diary' | 'chat' | 'resources' | 'profile';

export function PatientView() {
  const [currentScreen, setCurrentScreen] = useState<PatientScreen>('home');

  const navItems = [
    { id: 'home' as PatientScreen, icon: Home, label: 'Inicio' },
    { id: 'diary' as PatientScreen, icon: Calendar, label: 'Diario' },
    { id: 'emergency' as PatientScreen, icon: Heart, label: 'Emergencia' },
    { id: 'chat' as PatientScreen, icon: MessageCircle, label: 'Chat' },
    { id: 'resources' as PatientScreen, icon: BookOpen, label: 'Recursos' },
    { id: 'profile' as PatientScreen, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="pb-24">
      {/* Content */}
      <div className="min-h-[calc(100vh-180px)]">
        {currentScreen === 'home' && <PatientHome onEmergency={() => setCurrentScreen('emergency')} onNavigate={setCurrentScreen} />}
        {currentScreen === 'emergency' && <PatientEmergency onBack={() => setCurrentScreen('home')} />}
        {currentScreen === 'diary' && <PatientDiary />}
        {currentScreen === 'chat' && <PatientChat />}
        {currentScreen === 'resources' && <PatientResources />}
        {currentScreen === 'profile' && <PatientProfile onNavigate={setCurrentScreen} />}
        {currentScreen === 'calendar' && <PatientCalendar />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              const isEmergency = item.id === 'emergency';
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? isEmergency 
                        ? 'text-red-500' 
                        : 'text-blue-600'
                      : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}