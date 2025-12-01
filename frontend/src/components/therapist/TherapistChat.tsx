import { Send, Search, AlertTriangle, Bot, ThumbsUp, ThumbsDown, Info, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const patients = [
  {
    id: 1,
    name: 'María García',
    initials: 'MG',
    lastMessage: 'Gracias por los ejercicios, me están ayudando mucho',
    time: 'Hace 2h',
    unread: 2,
    priority: 'normal' as const,
    aiActive: true,
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    initials: 'CR',
    lastMessage: 'He tenido un día difícil hoy',
    time: 'Hace 5h',
    unread: 0,
    priority: 'high' as const,
    aiActive: false,
  },
  {
    id: 3,
    name: 'Ana Martínez',
    initials: 'AM',
    lastMessage: 'Ok, nos vemos en la próxima sesión',
    time: 'Ayer',
    unread: 0,
    priority: 'normal' as const,
    aiActive: true,
  },
];

const conversationMessages = [
  {
    id: 1,
    sender: 'patient',
    text: 'Hola Dra. López, he tenido algunos días difíciles pero los ejercicios están ayudando.',
    time: '11:15',
    read: true,
  },
  {
    id: 2,
    sender: 'ai',
    text: 'Mientras la Dra. López responde: He notado que mencionas días difíciles. ¿Te gustaría practicar algún ejercicio de respiración?',
    time: '11:20',
    aiSuggestion: true,
    corrected: false,
  },
  {
    id: 3,
    sender: 'patient',
    text: 'Sí, la respiración 4-7-8 me ayuda.',
    time: '11:25',
    read: true,
  },
  {
    id: 4,
    sender: 'therapist',
    text: 'Me alegra que los ejercicios estén funcionando. ¿Cuál te ha resultado más útil?',
    time: '14:30',
    read: true,
  },
  {
    id: 5,
    sender: 'patient',
    text: 'La respiración 4-7-8 definitivamente. La uso cuando siento que la ansiedad aumenta.',
    time: '14:45',
    read: true,
  },
];

export function TherapistChat() {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAICorrection, setShowAICorrection] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white">
        <h1 className="mb-2">Mensajería con Pacientes</h1>
        <p className="text-sm opacity-90">Comunicación segura entre sesiones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-4 shadow-lg">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Patient List */}
            <div className="space-y-2">
              {patients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full p-3 rounded-xl transition-all text-left ${
                    selectedPatient.id === patient.id
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                      {patient.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm text-gray-900 truncate">{patient.name}</h3>
                        {patient.priority === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{patient.lastMessage}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{patient.time}</span>
                        <div className="flex items-center gap-1">
                          {patient.aiActive && (
                            <div className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              <span>IA</span>
                            </div>
                          )}
                          {patient.unread > 0 && (
                            <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                              {patient.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  {selectedPatient.initials}
                </div>
                <div>
                  <h2 className="text-gray-900">{selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Activa</span>
                    {selectedPatient.aiActive && (
                      <>
                        <span>•</span>
                        <Bot className="w-3 h-3" />
                        <span>IA asistiendo</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl text-sm hover:bg-purple-200 transition-all">
                Ver perfil
              </button>
            </div>

            {/* AI Assistance Notice */}
            {selectedPatient.aiActive && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <Bot className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Asistente IA activo</strong> - Proporcionando apoyo mientras no estás disponible
                    </p>
                    <p className="text-xs text-gray-600">
                      Puedes revisar y corregir las sugerencias de la IA cuando sea necesario
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
              {conversationMessages.map((msg) => (
                <div key={msg.id}>
                  {msg.sender === 'ai' && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl rounded-bl-sm">
                      <div className="flex items-start gap-2 mb-2">
                        <Bot className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-xs text-blue-700 mb-1">Respuesta automática de IA</p>
                          <p className="text-sm text-gray-900">{msg.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                        </div>
                      </div>
                      
                      {/* AI Review Options */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs text-gray-600">¿Esta respuesta fue apropiada?</p>
                        <div className="flex gap-1 ml-auto">
                          <button className="p-1.5 bg-white rounded-lg hover:bg-green-50 transition-all">
                            <ThumbsUp className="w-3 h-3 text-green-600" />
                          </button>
                          <button 
                            className="p-1.5 bg-white rounded-lg hover:bg-orange-50 transition-all"
                            onClick={() => setShowAICorrection(showAICorrection === msg.id ? null : msg.id)}
                          >
                            <ThumbsDown className="w-3 h-3 text-orange-600" />
                          </button>
                          <button className="p-1.5 bg-white rounded-lg hover:bg-blue-50 transition-all">
                            <Info className="w-3 h-3 text-blue-600" />
                          </button>
                        </div>
                      </div>

                      {/* Correction Options */}
                      {showAICorrection === msg.id && (
                        <div className="mt-3 p-3 bg-white rounded-xl">
                          <p className="text-xs text-gray-600 mb-2">¿Cómo debería mejorar la IA?</p>
                          <div className="space-y-2">
                            <button className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs text-left transition-all">
                              Demasiado directo - Ser más empático
                            </button>
                            <button className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs text-left transition-all">
                              Sugerencia incorrecta - Proponer algo diferente
                            </button>
                            <button className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs text-left transition-all">
                              No debería haber intervenido - Esperar al terapeuta
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.sender === 'patient' && (
                    <div className="flex justify-start">
                      <div className="max-w-[75%] bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                        <p className="text-sm text-gray-900">{msg.text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">{msg.time}</p>
                          {msg.read && <CheckCircle className="w-3 h-3 text-green-600" />}
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.sender === 'therapist' && (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl rounded-br-sm px-4 py-3">
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          <p className="text-xs opacity-90">{msg.time}</p>
                          {msg.read && <CheckCircle className="w-3 h-3 opacity-90" />}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>El paciente será notificado de tu mensaje</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
