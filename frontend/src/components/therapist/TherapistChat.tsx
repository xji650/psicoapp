import { Send, Search, AlertTriangle, Bot, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Usamos la misma conexión de socket
const socket = io('http://localhost:3001');

export function TherapistChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected); // Estado de conexión
  
  // Dummy patients para la lista lateral (En una app real, esto vendría del backend)
  const [patients] = useState([
    { id: 1, name: 'María García', initials: 'MG', priority: 'normal', aiActive: true },
    { id: 2, name: 'Carlos Ruiz', initials: 'CR', priority: 'high', aiActive: false },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 0. Listeners de conexión para saber si estamos online
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // 1. Pedir historial
    socket.emit('get_history');

    // 2. Recibir historial
    socket.on('history_update', (serverMessages) => {
      setMessages(serverMessages);
    });

    // 3. Recibir mensajes nuevos en vivo
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('history_update');
      socket.off('receive_message');
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // El terapeuta envía mensaje
    socket.emit('send_message', {
      text: message,
      sender: 'therapist',
      mode: 'therapist' // El terapeuta siempre responde en modo humano
    });

    setMessage('');
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Panel de Mensajería</h1>
          <p className="text-sm opacity-90">Vista del Terapeuta</p>
        </div>
        {/* Indicador de Estado de Conexión */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {isConnected ? (
                <>
                    <Wifi className="w-4 h-4 text-green-300" />
                    <span className="text-xs font-medium text-green-100">Online</span>
                </>
            ) : (
                <>
                    <WifiOff className="w-4 h-4 text-red-300" />
                    <span className="text-xs font-medium text-red-100">Desconectado</span>
                </>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Lista de Pacientes (Izquierda) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-4 shadow-lg flex-1">
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm">
                                {patient.initials}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{patient.name}</h3>
                                {patient.priority === 'high' && <span className="text-xs text-orange-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Atención requerida</span>}
                            </div>
                        </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Área de Chat (Derecha) */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="bg-white rounded-3xl p-6 shadow-lg flex-1 flex flex-col">
            
            {/* Cabecera del chat individual */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {selectedPatient.initials}
                </div>
                <div>
                  <h2 className="text-gray-900 font-bold">{selectedPatient.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Chat Activo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {/* Aquí renderizamos TODOS los mensajes (paciente, IA y terapeuta) para que el doctor tenga contexto */}
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        {/* Mensaje de la IA (Contexto para el doctor) */}
                        {msg.sender === 'ai' && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-2xl mx-10 text-sm">
                                <div className="flex items-center gap-2 mb-1 text-blue-600 font-semibold text-xs">
                                    <Bot className="w-3 h-3" />
                                    <span>Intervención automática de IA</span>
                                </div>
                                <p className="text-gray-700 italic">"{msg.text}"</p>
                            </div>
                        )}

                        {/* Mensaje del Paciente */}
                        {msg.sender === 'patient' && (
                             <div className="flex justify-start">
                                <div className="max-w-[75%] bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                                    <p className="text-sm text-gray-900">{msg.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                                </div>
                             </div>
                        )}

                        {/* Mensaje del propio Terapeuta */}
                        {msg.sender === 'therapist' && (
                            <div className="flex justify-end">
                                <div className="max-w-[75%] bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl rounded-br-sm px-4 py-3">
                                    <p className="text-sm">{msg.text}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        <p className="text-xs opacity-80">{msg.time}</p>
                                        <CheckCircle className="w-3 h-3 opacity-80" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input del Terapeuta */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu respuesta profesional..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}