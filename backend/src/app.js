import { useState } from 'react';
import PatientChat from './PatientChat'; // Asegúrate de exportarlo como default en su archivo
import { TherapistChat } from './TherapistChat';

function App() {
  const [role, setRole] = useState(null);

  if (role === 'patient') return <PatientChat />;
  if (role === 'therapist') return <TherapistChat />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">PsicoApp Demo</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <button 
          onClick={() => setRole('patient')}
          className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-left group"
        >
          <h2 className="text-xl font-bold text-blue-600 mb-2 group-hover:text-blue-700">Soy Paciente</h2>
          <p className="text-gray-500">Acceder al chat de soporte y ejercicios.</p>
        </button>

        <button 
          onClick={() => setRole('therapist')}
          className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-left group"
        >
          <h2 className="text-xl font-bold text-purple-600 mb-2 group-hover:text-purple-700">Soy Terapeuta</h2>
          <p className="text-gray-500">Gestionar pacientes y responder mensajes.</p>
        </button>
      </div>
    </div>
  );
}

export default App;