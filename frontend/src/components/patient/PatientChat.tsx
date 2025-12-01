import { Send, Lock, AlertCircle, Clock, Bot, User as UserIcon, Info, ThumbsUp, ThumbsDown, ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';

type ChatMode = 'ai' | 'therapist';

const aiMessages = [
  {
    id: 1,
    sender: 'ai',
    text: 'Hola María, soy tu asistente de IA. ¿Cómo te sientes hoy?',
    time: '09:00',
    explanation: 'Pregunta de inicio para entender tu estado emocional actual',
  },
  {
    id: 2,
    sender: 'patient',
    text: 'He tenido un día difícil, mucha ansiedad.',
    time: '09:05',
  },
  {
    id: 3,
    sender: 'ai',
    text: 'Entiendo que estás pasando por un momento difícil. Basándome en tu historial, veo que la respiración 4-7-8 te ha ayudado antes. ¿Te gustaría que te guíe en este ejercicio ahora?',
    time: '09:06',
    explanation: 'Recomiendo la respiración 4-7-8 porque has marcado este ejercicio como "muy útil" en 5 ocasiones anteriores, con una mejora promedio del 60% en tu nivel de ansiedad.',
    canCorrect: true,
  },
];

const therapistMessages = [
  {
    id: 1,
    sender: 'therapist',
    text: 'Hola María, ¿cómo has estado estos días?',
    time: '10:30',
    read: true,
  },
  {
    id: 2,
    sender: 'patient',
    text: 'Hola Dra. López, he tenido algunos días difíciles pero los ejercicios están ayudando.',
    time: '11:15',
    read: true,
  },
  {
    id: 3,
    sender: 'therapist',
    text: 'Me alegra que los ejercicios estén funcionando. ¿Cuál te ha resultado más útil?',
    time: '11:20',
    read: true,
  },
  {
    id: 4,
    sender: 'patient',
    text: 'La respiración 4-7-8 definitivamente. La uso cuando siento que la ansiedad aumenta.',
    time: '14:45',
    read: true,
  },
  {
    id: 5,
    sender: 'therapist',
    text: 'Excelente. Eso muestra que estás desarrollando buenas herramientas de autogestión. Sigue practicando y hablamos en nuestra próxima sesión. 💙',
    time: '15:10',
    read: true,
  },
];

export function PatientChat() {
  const [message, setMessage] = useState('');
  const [chatMode, setChatMode] = useState<ChatMode>('therapist');
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [messages, setMessages] = useState(therapistMessages);
  const [therapistAvailable, setTherapistAvailable] = useState(false); // Simulating unavailability
  const [showRedirectOptions, setShowRedirectOptions] = useState<number | null>(null);

  const handleModeSwitch = (mode: ChatMode) => {
    setChatMode(mode);
    setMessages(mode === 'ai' ? aiMessages : therapistMessages);
  };

  const handleCorrectAI = (messageId: number) => {
    setShowRedirectOptions(showRedirectOptions === messageId ? null : messageId);
  };

  return (
    <div className="p-6 space-y-4">
      {/* Chat Mode Selector */}
      <div className="bg-white rounded-3xl p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => handleModeSwitch('therapist')}
            className={`py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              chatMode === 'therapist'
                ? 'bg-white text-purple-600 shadow-md'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span>Dra. López (Humano)</span>
          </button>
          <button
            onClick={() => handleModeSwitch('ai')}
            className={`py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              chatMode === 'ai'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span>Asistente IA</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        {chatMode === 'therapist' ? (
          <>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                DL
              </div>
              <div>
                <h2 className="text-gray-900">Dra. Laura López</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  {therapistAvailable ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Disponible ahora</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      <span>Responde generalmente en 24h</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Therapist Unavailable - AI Suggestion */}
            {!therapistAvailable && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2 mb-2">
                  <Bot className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">
                      La Dra. López no está disponible en este momento. Mientras esperas su respuesta, puedes:
                    </p>
                    <button
                      onClick={() => handleModeSwitch('ai')}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Bot className="w-4 h-4" />
                      <span>Hablar con el Asistente de IA</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-xl text-sm">
              <Lock className="w-4 h-4" />
              <span>Conversación cifrada de extremo a extremo</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-gray-900">Asistente de IA</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span>Respuestas inmediatas • Supervisado por profesionales</span>
                </div>
              </div>
            </div>
            {/* AI Notice */}
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>Esta es una IA de apoyo. Para emergencias, contacta a tu terapeuta o llama al 112.</span>
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="space-y-4 mb-4">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div
                className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'patient'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm'
                      : chatMode === 'ai'
                      ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-gray-900 rounded-bl-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm mb-1">{msg.text}</p>
                  <div
                    className={`text-xs ${
                      msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.time}
                    {msg.sender === 'patient' && 'read' in msg && msg.read && ' • Leído'}
                  </div>
                </div>
              </div>
              
              {/* AI Explanation */}
              {chatMode === 'ai' && msg.sender === 'ai' && 'explanation' in msg && (
                <div className="ml-4 mt-2">
                  <button
                    onClick={() => setShowExplanation(showExplanation === msg.id ? null : msg.id)}
                    className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    <span>¿Por qué la IA sugiere esto?</span>
                  </button>
                  
                  {showExplanation === msg.id && (
                    <div className="mt-2 p-3 bg-blue-50 rounded-xl text-sm text-gray-700">
                      <p className="mb-2">{msg.explanation}</p>
                      
                      {msg.canCorrect && (
                        <div className="space-y-2 mt-3">
                          <p className="text-xs text-gray-600">¿Esta sugerencia te parece útil?</p>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg text-green-600 hover:bg-green-50 transition-all">
                              <ThumbsUp className="w-3 h-3" />
                              <span className="text-xs">Sí, útil</span>
                            </button>
                            <button
                              className="flex items-center gap-1 px-3 py-1 bg-white rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                              onClick={() => handleCorrectAI(msg.id)}
                            >
                              <ThumbsDown className="w-3 h-3" />
                              <span className="text-xs">Prefiero otra cosa</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Switch to Therapist from AI */}
        {chatMode === 'ai' && (
          <button
            onClick={() => handleModeSwitch('therapist')}
            className="w-full mb-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            <span>Hablar con mi terapeuta (humano)</span>
          </button>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={chatMode === 'ai' ? 'Pregunta a la IA...' : 'Escribe tu mensaje...'}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-4 shadow-md">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="mb-1">
              <span>Si necesitas ayuda inmediata, usa el botón de emergencia en la pantalla de inicio.</span>
            </p>
            <p className="text-gray-600">Para crisis: Llama al 112</p>
          </div>
        </div>
      </div>
    </div>
  );
}