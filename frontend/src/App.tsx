import { useState } from 'react';
import { UserRole } from './components/UserRole';
import { PatientView } from './components/PatientView';
import { TherapistView } from './components/TherapistView';
import { CaregiverView } from './components/CaregiverView';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'patient' | 'therapist' | 'caregiver'>('patient');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Role Selector */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 justify-center flex-wrap">
            <UserRole
              role="patient"
              label="Paciente"
              icon="user"
              active={currentRole === 'patient'}
              onClick={() => setCurrentRole('patient')}
            />
            <UserRole
              role="therapist"
              label="Terapeuta"
              icon="briefcase"
              active={currentRole === 'therapist'}
              onClick={() => setCurrentRole('therapist')}
            />
            <UserRole
              role="caregiver"
              label="Cuidador"
              icon="heart"
              active={currentRole === 'caregiver'}
              onClick={() => setCurrentRole('caregiver')}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {currentRole === 'patient' && <PatientView />}
        {currentRole === 'therapist' && <TherapistView />}
        {currentRole === 'caregiver' && <CaregiverView />}
      </div>
    </div>
  );
}
