import { AlertCircle, Wind, BookOpen, Activity, Lock, Mic, Calendar, Video, Sparkles } from 'lucide-react';

interface PatientHomeProps {
  onEmergency: () => void;
  onNavigate: (screen: string) => void;
}

const moods = [
  { emoji: '😊', label: 'Genial', value: 5, color: 'from-green-400 to-emerald-500' },
  { emoji: '🙂', label: 'Bien', value: 4, color: 'from-blue-400 to-cyan-500' },
  { emoji: '😐', label: 'Normal', value: 3, color: 'from-yellow-400 to-amber-500' },
  { emoji: '😟', label: 'Bajo', value: 2, color: 'from-orange-400 to-orange-500' },
  { emoji: '😢', label: 'Mal', value: 1, color: 'from-red-400 to-rose-500' },
];

const quickAccess = [
  { icon: Wind, label: 'Respiración', color: 'bg-blue-100 text-blue-600' },
  { icon: BookOpen, label: 'Ejercicios', color: 'bg-purple-100 text-purple-600', screen: 'resources' },
  { icon: Activity, label: 'Meditación', color: 'bg-green-100 text-green-600' },
];

const motivationalQuotes = [
  "Cada pequeño paso cuenta. Estás avanzando, aunque no lo sientas así hoy. 💙",
  "No tienes que ser perfecto/a, solo tienes que ser tú. Eso es suficiente. 🌟",
  "Los días difíciles no duran para siempre. Has superado el 100% de tus peores días. 🌈",
  "Recuerda: sentir ansiedad no significa que algo malo vaya a pasar. Son solo sensaciones. 🦋",
];

export function PatientHome({ onEmergency, onNavigate }: PatientHomeProps) {
  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];

  return (
    <div className="p-6 space-y-6">
      {/* Greeting */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-gray-900 mb-2">¡Hola, María! 👋</h1>
            <p className="text-gray-600">¿Cómo te sientes hoy?</p>
          </div>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0 hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span className="text-xl">M</span>
          </button>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-3xl p-6 shadow-lg">
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-gray-900 mb-2">Frase del día</h3>
            <p className="text-gray-700">{todayQuote}</p>
          </div>
        </div>
      </div>

      {/* Emergency Button */}
      <button
        onClick={onEmergency}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="flex items-center justify-center gap-3">
          <AlertCircle className="w-8 h-8 flex-shrink-0" />
          <div className="text-left flex-1">
            <div className="text-lg">Necesito ayuda ahora</div>
            <div className="text-sm opacity-90">Toca para acceder a apoyo inmediato</div>
          </div>
        </div>
      </button>

      {/* Next Appointment */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-900">Próxima sesión</p>
              <p className="text-sm text-gray-600">Mañana, 10:00 - Dra. López</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-blue-600 rounded-xl text-sm hover:shadow-md transition-all">
            Ver
          </button>
        </div>
        <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 bg-white/60 rounded-xl text-sm text-gray-700 hover:bg-white transition-all">
          <Video className="w-4 h-4" />
          <span>Preparar videollamada</span>
        </button>
      </div>

      {/* Mood Tracking */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Registro Emocional</h2>
        <div className="flex justify-between gap-2 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
            >
              <div className="text-3xl">{mood.emoji}</div>
              <span className="text-xs text-gray-600">{mood.label}</span>
            </button>
          ))}
        </div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:shadow-lg transition-all">
          Registrar
        </button>
        <div className="flex items-center justify-center gap-2 mt-3 text-gray-500">
          <Mic className="w-4 h-4" />
          <span className="text-sm">También puedes usar comando de voz</span>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`${item.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all hover:scale-105 active:scale-95`}
                onClick={() => item.screen && onNavigate(item.screen)}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs text-center">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Therapist Message */}
      <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 shadow-lg">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
            DL
          </div>
          <div>
            <div className="text-gray-900 mb-1">Mensaje de tu terapeuta</div>
            <p className="text-gray-700 text-sm">
              "María, estás haciendo un trabajo excelente. Recuerda practicar los ejercicios de respiración que vimos. Estoy aquí para ti. 💙"
            </p>
            <div className="text-xs text-gray-500 mt-2">Dra. López - Hace 2 horas</div>
          </div>
        </div>
      </div>

      {/* Privacy Indicator */}
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <Lock className="w-4 h-4" />
        <span>Todos tus datos están cifrados y protegidos</span>
      </div>
    </div>
  );
}