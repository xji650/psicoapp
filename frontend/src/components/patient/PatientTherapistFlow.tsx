import { 
  Search, Filter, MapPin, Star, GraduationCap, 
  MessageCircle, Phone, ArrowLeft, MoreVertical, 
  Send, Paperclip, Mic, Info, Check, Clock, Shield 
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// --- DATOS DE EJEMPLO (MOCK DATA) ---
const MOCK_THERAPISTS = [
  {
    id: 1,
    name: "Dra. Laura López",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Ansiedad y Depresión",
    experience: "10 años",
    colNumber: "28394",
    motto: "Recupera el control de tu vida paso a paso.",
    description: "Especialista en terapia cognitivo-conductual. Enfoque práctico y empático.",
    price: 45,
    rating: 4.9,
    reviews: 120,
    languages: ["Español", "Inglés"],
    formats: ["Chat", "Audio"],
    bio: "Graduada por la Universidad Complutense, la Dra. López ha dedicado su carrera al tratamiento de trastornos de ansiedad. Autora de 'Mente en Calma'.",
    education: [
      "Máster en Psicología Clínica (UCM)",
      "Especialista en Mindfulness (Univ. Massachusetts)"
    ]
  },
  {
    id: 2,
    name: "Dr. Carlos Ruiz",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Terapia de Pareja",
    experience: "15 años",
    colNumber: "15233",
    motto: "Construyendo puentes donde hubo muros.",
    description: "Ayudo a parejas a reencontrarse y mejorar su comunicación.",
    price: 60,
    rating: 4.8,
    reviews: 85,
    languages: ["Español"],
    formats: ["Chat", "Video"],
    bio: "Experto en dinámicas familiares y resolución de conflictos. Enfoque sistémico.",
    education: [
      "Doctorado en Psicología (UB)",
      "Posgrado en Terapia Familiar"
    ]
  },
  {
    id: 3,
    name: "Lic. Ana Martínez",
    photo: "https://images.unsplash.com/photo-1573496359-e36b3c09a741?auto=format&fit=crop&q=80&w=300&h=300",
    specialty: "Autoestima y Duelo",
    experience: "5 años",
    colNumber: "34001",
    motto: "El amor propio es el inicio de todo romance.",
    description: "Te acompaño en procesos de pérdida y reconstrucción personal.",
    price: 35,
    rating: 5.0,
    reviews: 42,
    languages: ["Español", "Catalán"],
    formats: ["Solo Chat"],
    bio: "Enfoque humanista centrado en la persona. Espacio seguro y libre de juicios.",
    education: [
      "Grado en Psicología (UAB)",
      "Curso de Intervención en Duelo"
    ]
  }
];

// --- COMPONENTE: VISTA DE PERFIL COMPLETO ---
const TherapistProfileView = ({ therapist, onClose, onStartChat }) => {
  if (!therapist) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-bottom duration-300">
      {/* Header con imagen de fondo borrosa o color */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Contenido del Perfil */}
      <div className="px-6 -mt-16 pb-20">
        <div className="flex justify-between items-end mb-4">
          <img 
            src={therapist.photo} 
            alt={therapist.name} 
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-gray-200"
          />
          <div className="mb-2 flex gap-2">
             <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
               Colegiado: {therapist.colNumber}
             </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{therapist.name}</h1>
        <p className="text-blue-600 font-medium mb-4">{therapist.specialty}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex justify-center text-yellow-500 mb-1"><Star className="w-5 h-5 fill-current" /></div>
            <div className="font-bold text-gray-900">{therapist.rating}</div>
            <div className="text-xs text-gray-500">{therapist.reviews} reseñas</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex justify-center text-blue-500 mb-1"><Clock className="w-5 h-5" /></div>
            <div className="font-bold text-gray-900">{therapist.experience}</div>
            <div className="text-xs text-gray-500">Experiencia</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-xl text-center">
            <div className="flex justify-center text-green-500 mb-1"><Check className="w-5 h-5" /></div>
            <div className="font-bold text-gray-900">{therapist.price}€</div>
            <div className="text-xs text-gray-500">por 30min</div>
          </div>
        </div>

        {/* Secciones Informativas */}
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sobre mí</h3>
            <p className="text-gray-600 leading-relaxed">{therapist.bio}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              Formación
            </h3>
            <ul className="space-y-2">
              {therapist.education.map((edu, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 bg-purple-50 p-3 rounded-lg text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  {edu}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Idiomas</h3>
            <div className="flex gap-2">
              {therapist.languages.map(lang => (
                <span key={lang} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Botón Flotante para contactar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-8">
        <button 
          onClick={onStartChat}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Chatear con {therapist.name.split(' ')[1]}
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE: VISTA DE CHAT (Estilo WhatsApp) ---
const ChatInterface = ({ therapist, onBack, onViewProfile }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: `Hola, soy ${therapist.name}. ¿En qué puedo ayudarte hoy?`, sender: 'therapist', time: '10:00' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if(!inputValue.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: inputValue,
      sender: 'patient',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");
    
    // Simular respuesta
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Gracias por compartir eso. Cuéntame más.",
        sender: 'therapist',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] fixed inset-0 z-40">
      {/* Header estilo WhatsApp */}
      <div className="bg-white px-4 py-3 flex items-center gap-2 shadow-sm z-10">
        <button onClick={onBack} className="text-blue-600">
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div 
          className="flex items-center gap-3 flex-1 cursor-pointer hover:bg-gray-50 p-1 rounded-lg transition-colors"
          onClick={onViewProfile}
        >
          <img src={therapist.photo} alt="profile" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">{therapist.name}</h3>
            <p className="text-xs text-green-600">En línea</p>
          </div>
        </div>

        <div className="flex gap-4 text-blue-600">
          <Phone className="w-5 h-5" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Banner de Info */}
      <div className="bg-yellow-50 p-2 text-xs text-center text-yellow-800 border-b border-yellow-100 flex justify-center items-center gap-2">
         <Shield className="w-3 h-3" />
         Las mensajes están cifrados de extremo a extremo
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-10">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-3 py-2 shadow-sm text-sm relative ${
              msg.sender === 'patient' 
                ? 'bg-[#DCF8C6] text-gray-800 rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none'
            }`}>
              <p className="mb-1">{msg.text}</p>
              <div className="text-[10px] text-gray-500 text-right flex justify-end items-center gap-1">
                {msg.time}
                {msg.sender === 'patient' && <Check className="w-3 h-3 text-blue-500" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 flex items-center gap-2 pb-8">
        <button className="text-gray-500 p-2"><Paperclip className="w-5 h-5" /></button>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
          <input 
            type="text" 
            placeholder="Escribe un mensaje..."
            className="bg-transparent flex-1 focus:outline-none text-sm"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        {inputValue.trim() ? (
          <button onClick={handleSend} className="bg-blue-600 text-white p-2.5 rounded-full shadow-md">
            <Send className="w-4 h-4" />
          </button>
        ) : (
          <button className="bg-gray-200 text-gray-500 p-2.5 rounded-full">
            <Mic className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (EXPORTAR ESTE) ---
export function PatientTherapistFlow() {
  const [view, setView] = useState('directory'); // 'directory' | 'profile' | 'chat'
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handlers
  const handleProfileClick = (therapist, e) => {
    e.stopPropagation(); // Evita abrir el chat al hacer clic en la foto
    setSelectedTherapist(therapist);
    setView('profile');
  };

  const handleCardClick = (therapist) => {
    setSelectedTherapist(therapist);
    setView('chat');
  };

  const handleBackToDir = () => {
    setView('directory');
    setSelectedTherapist(null);
  };

  const handleStartChatFromProfile = () => {
    setView('chat');
    // Mantiene selectedTherapist, solo cambia la vista
  };

  const handleViewProfileFromChat = () => {
    setView('profile');
  };

  // Filtros UI
  const filters = [
    { label: "Especialidad", active: true },
    { label: "Experiencia", active: false },
    { label: "Idioma", active: false },
    { label: "Formato", active: false },
  ];

  if (view === 'chat' && selectedTherapist) {
    return (
      <ChatInterface 
        therapist={selectedTherapist} 
        onBack={handleBackToDir}
        onViewProfile={handleViewProfileFromChat}
      />
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* 1. VISTA DIRECTORIO */}
      
      {/* Top Bar Fija */}
      <div className="sticky top-0 bg-white z-10 shadow-sm pb-2">
        <div className="p-4 pb-2">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Encuentra tu terapeuta</h1>
          
          {/* Barra de Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Buscar por nombre, especialidad..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filtros Horizontales */}
        <div className="px-4 overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2">
            {filters.map((f, i) => (
              <button 
                key={i}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-all ${
                  f.active 
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {f.label}
                <Filter className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Profesionales */}
      <div className="p-4 space-y-4">
        {MOCK_THERAPISTS.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((therapist) => (
          <div 
            key={therapist.id}
            onClick={() => handleCardClick(therapist)}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer active:scale-[0.99] relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              {/* Foto (Clickable independiente) */}
              <div 
                onClick={(e) => handleProfileClick(therapist, e)}
                className="relative group z-10"
              >
                <img 
                  src={therapist.photo} 
                  alt={therapist.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:ring-2 ring-blue-500 transition-all"
                />
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                   <Info className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              {/* Info Card */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{therapist.name}</h3>
                    <p className="text-xs text-gray-500">Col. {therapist.colNumber}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-yellow-700">{therapist.rating}</span>
                  </div>
                </div>

                <p className="text-blue-600 text-sm font-medium mt-1">{therapist.specialty}</p>
                <p className="text-gray-600 text-xs mt-1 line-clamp-2 italic">"{therapist.motto}"</p>
                
                {/* Footer Card */}
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                   <div className="flex gap-1 text-xs text-gray-500">
                      {therapist.formats.includes('Chat') && <MessageCircle className="w-3 h-3" />}
                      {therapist.formats.includes('Audio') && <Mic className="w-3 h-3" />}
                   </div>
                   <div className="text-sm font-bold text-gray-900">
                     {therapist.price}€ <span className="text-xs font-normal text-gray-500">/30min</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. OVERLAY DE PERFIL (Condicional) */}
      {view === 'profile' && selectedTherapist && (
        <TherapistProfileView 
          therapist={selectedTherapist} 
          onClose={() => setView('directory')}
          onStartChat={handleStartChatFromProfile}
        />
      )}
    </div>
  );
}