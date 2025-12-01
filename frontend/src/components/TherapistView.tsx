import { useState } from 'react';
import { LayoutDashboard, Users, Calendar, FileText, MessageCircle } from 'lucide-react';
import { TherapistDashboard } from './therapist/TherapistDashboard';
import { TherapistPatients } from './therapist/TherapistPatients';
import { TherapistChat } from './therapist/TherapistChat';

type TherapistScreen = 'dashboard' | 'patients' | 'chat' | 'calendar' | 'resources';

export function TherapistView() {
  const [currentScreen, setCurrentScreen] = useState<TherapistScreen>('dashboard');

  const navItems = [
    { id: 'dashboard' as TherapistScreen, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'patients' as TherapistScreen, icon: Users, label: 'Pacientes' },
    { id: 'chat' as TherapistScreen, icon: MessageCircle, label: 'Chat' },
    { id: 'calendar' as TherapistScreen, icon: Calendar, label: 'Agenda' },
    { id: 'resources' as TherapistScreen, icon: FileText, label: 'Recursos' },
  ];

  return (
    <div className="pb-24">
      {/* Content */}
      <div className="min-h-[calc(100vh-180px)]">
        {currentScreen === 'dashboard' && <TherapistDashboard onViewPatient={() => setCurrentScreen('patients')} />}
        {currentScreen === 'patients' && <TherapistPatients />}
        {currentScreen === 'chat' && <TherapistChat />}
        {currentScreen === 'calendar' && (
          <div className="p-6">
            <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-gray-900 mb-2">Agenda</h2>
              <p className="text-gray-600">Vista de calendario con sesiones programadas</p>
            </div>
          </div>
        )}
        {currentScreen === 'resources' && (
          <div className="p-6">
            <div className="bg-white rounded-3xl p-12 shadow-lg text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-gray-900 mb-2">Recursos</h2>
              <p className="text-gray-600">Biblioteca de ejercicios y materiales</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex justify-around py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'text-purple-600'
                      : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
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