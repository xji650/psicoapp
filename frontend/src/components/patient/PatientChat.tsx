import { Send, Lock, AlertCircle, Clock, Bot, User as UserIcon, Info } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Conexión al backend
const socket = io('http://localhost:3001');

export function PatientChat() {
  const [message, setMessage] = useState('');
  const [chatMode, setChatMode] = useState('therapist'); // 'ai' | 'therapist'
  const [messages, setMessages] = useState([]);
  const [showExplanation, setShowExplanation] = useState(null);
  const [therapistAvailable, setTherapistAvailable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  
  // Referencias para el scroll
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // 1. Cargar historial al iniciar
    socket.emit('get_history');

    // 2. Escuchar historial recibido
    socket.on('history_update', (serverMessages) => {
      setMessages(serverMessages);
    });

    // 3. Escuchar nuevos mensajes en tiempo real
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('history_update');
      socket.off('receive_message');
    };
  }, []);

  // Scroll al fondo cuando llega un mensaje y el usuario ya está abajo
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Detectar si el usuario está scrolleando
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px de margen
      setIsAtBottom(isBottom);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Enviar evento al backend
    socket.emit('send_message', {
      text: message,
      sender: 'patient',
      mode: chatMode
    });

    setMessage('');
    setIsAtBottom(true); // Al enviar mensaje, forzar scroll al fondo
  };

  // Filtrar mensajes según el modo
  const filteredMessages = messages.filter(msg => {
    if (msg.sender === 'patient') return true;
    if (chatMode === 'ai' && msg.sender === 'ai') return true;
    if (chatMode === 'therapist' && msg.sender === 'therapist') return true;
    return false;
  });

  return (
    <div className="p-6 space-y-4 max-w-2xl mx-auto">
      {/* Chat Mode Selector */}
      <div className="bg-white rounded-3xl p-4 shadow-lg">
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setChatMode('therapist')}
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
            onClick={() => setChatMode('ai')}
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

      {/* Header Dinámico */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        {chatMode === 'therapist' ? (
          <>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                DL
              </div>
              <div>
                <h2 className="text-gray-900 font-bold">Dra. Laura López</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                   <Clock className="w-3 h-3" />
                   <span>Responde generalmente en 24h</span>
                </div>
              </div>
            </div>
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
                <h2 className="text-gray-900 font-bold">Asistente de IA</h2>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <span>Respuestas inmediatas • Supervisado</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>Esta es una IA de apoyo. No sustituye terapia profesional.</span>
            </div>
          </>
        )}
      </div>

      {/* Messages Area - Mejorada */}
      <div className="bg-white rounded-3xl shadow-lg flex flex-col" style={{ height: '500px' }}>
        {/* Contenedor de mensajes con scroll */}
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6"
          style={{ 
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 transparent'
          }}
        >
          <div className="space-y-4">
            {filteredMessages.length === 0 && (
              <div className="text-center text-gray-400 mt-10">
                <p className="mb-2">Comienza la conversación con {chatMode === 'ai' ? 'la IA' : 'la Dra. López'}...</p>
                <p className="text-sm">Tus mensajes aparecerán aquí</p>
              </div>
            )}
            
            {filteredMessages.map((msg, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.sender === 'patient'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-sm'
                        : msg.sender === 'ai'
                        ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-gray-900 rounded-bl-sm'
                        : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm mb-1">{msg.text}</p>
                    <div className={`text-xs ${msg.sender === 'patient' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
                
                {/* Bloque explicativo exclusivo de la IA */}
                {msg.sender === 'ai' && msg.explanation && (
                  <div className="ml-4 mt-2">
                    <button
                      onClick={() => setShowExplanation(showExplanation === msg.id ? null : msg.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Info className="w-3 h-3" />
                      <span>¿Por qué la IA sugiere esto?</span>
                    </button>
                    {showExplanation === msg.id && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-xl text-sm text-gray-700 animate-in fade-in slide-in-from-top-2">
                        <p>{msg.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Botón para scroll al fondo (solo aparece cuando no está abajo) */}
        {!isAtBottom && (
          <button
            onClick={scrollToBottom}
            className="absolute right-8 bottom-24 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            style={{ transform: 'translateY(-50%)' }}
          >
            <Send className="w-4 h-4 text-blue-500" />
          </button>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-100 p-6 mt-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={chatMode === 'ai' ? 'Pregunta a la IA...' : 'Escribe a tu terapeuta...'}
              className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`px-6 py-3 rounded-xl transition-all flex-shrink-0 ${
                message.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-4 shadow-md">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="text-gray-600">Para crisis inmediatas: Llama al 112</p>
          </div>
        </div>
      </div>
    </div>
  );
}