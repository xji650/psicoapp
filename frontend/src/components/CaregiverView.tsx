import { Heart, BookOpen, MessageSquare, Lightbulb, Shield, Users } from 'lucide-react';

const guides = [
  {
    title: 'Trastorno de Ansiedad',
    icon: Shield,
    color: 'from-blue-400 to-cyan-500',
    topics: ['Síntomas comunes', 'Qué decir y qué evitar', 'Crisis de pánico'],
  },
  {
    title: 'Depresión',
    icon: Heart,
    color: 'from-purple-400 to-pink-500',
    topics: ['Signos de alerta', 'Apoyo emocional', 'Cuándo buscar ayuda'],
  },
  {
    title: 'Trastorno Bipolar',
    icon: Users,
    color: 'from-green-400 to-emerald-500',
    topics: ['Fases y ciclos', 'Estabilidad', 'Rutinas importantes'],
  },
];

const dailyTips = [
  {
    emoji: '💬',
    title: 'Comunicación sin presión',
    tip: 'En lugar de "¿Estás bien?", prueba "Estoy aquí si quieres hablar"',
  },
  {
    emoji: '🚶',
    title: 'Actividad conjunta',
    tip: 'Invita a una caminata corta. El ejercicio leve ayuda sin exigir conversación',
  },
  {
    emoji: '⏰',
    title: 'Respeta los ritmos',
    tip: 'Algunos días serán mejores que otros. La paciencia es clave',
  },
  {
    emoji: '🎯',
    title: 'Celebra lo pequeño',
    tip: 'Levantarse, ducharse, comer... todo cuenta como victoria',
  },
];

const testimonials = [
  {
    name: 'Carmen M.',
    relation: 'Madre de paciente con ansiedad',
    text: 'Aprendí que mi hijo necesitaba espacio, no soluciones. Esta app me ayudó a entender cómo estar presente sin agobiar.',
    color: 'from-blue-100 to-cyan-100',
  },
  {
    name: 'Roberto L.',
    relation: 'Pareja de persona con depresión',
    text: 'Los consejos sobre autocuidado me salvaron. No puedo ayudar si yo estoy agotado. Ahora entiendo que cuidarme a mí también es cuidarla a ella.',
    color: 'from-purple-100 to-pink-100',
  },
];

export function CaregiverView() {
  return (
    <div className="p-6 space-y-6 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 shadow-lg text-white">
        <h1 className="mb-2">Guía para Cuidadores</h1>
        <p className="text-sm opacity-90">
          Herramientas y apoyo para acompañar a quien más quieres
        </p>
      </div>

      {/* Specific Guides */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Guías por Trastorno</h2>
        <div className="space-y-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <button
                key={guide.title}
                className={`w-full bg-gradient-to-r ${guide.color} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-2">{guide.title}</h3>
                    <ul className="space-y-1 text-sm opacity-90">
                      {guide.topics.map((topic) => (
                        <li key={topic}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Tips */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h2 className="text-gray-900">Qué hacer hoy</h2>
        </div>
        <div className="space-y-3">
          {dailyTips.map((tip) => (
            <div
              key={tip.title}
              className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl"
            >
              <div className="flex gap-3">
                <div className="text-2xl flex-shrink-0">{tip.emoji}</div>
                <div>
                  <h3 className="text-gray-900 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-700">{tip.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h2 className="text-gray-900">Testimonios Reales</h2>
        </div>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className={`p-5 bg-gradient-to-br ${testimonial.color} rounded-2xl`}
            >
              <p className="text-gray-700 mb-3 italic">"{testimonial.text}"</p>
              <div>
                <div className="text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.relation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Self-Care Section */}
      <div className="bg-gradient-to-br from-rose-100 to-pink-200 rounded-3xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <Heart className="w-8 h-8 text-rose-600 flex-shrink-0" />
          <div>
            <h2 className="text-gray-900 mb-3">Tu Bienestar También Importa</h2>
            <p className="text-gray-700 text-sm mb-4">
              Cuidar a alguien con un trastorno mental puede ser agotador. No puedes dar lo que no tienes. 
              Estas son señales de que necesitas hacer una pausa:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 mb-4">
              <li>✓ Te sientes constantemente cansado o irritable</li>
              <li>✓ Descuidas tu propia salud o relaciones</li>
              <li>✓ Sientes resentimiento hacia la persona que cuidas</li>
              <li>✓ Te aíslas o pierdes interés en lo que antes disfrutabas</li>
            </ul>
            <button className="w-full bg-white text-rose-600 py-3 rounded-xl hover:shadow-lg transition-all">
              Ver recursos de autocuidado
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Resources */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Recursos de Emergencia</h2>
        <div className="space-y-3">
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <h3 className="text-gray-900 mb-1">Riesgo de Suicidio</h3>
            <p className="text-sm text-gray-700 mb-2">
              Si crees que la persona está en peligro inmediato
            </p>
            <div className="flex gap-2">
              <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all">
                Llamar 112
              </button>
              <button className="flex-1 bg-white text-red-600 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition-all">
                Teléfono de Esperanza
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-gray-900 mb-1">Apoyo para Familiares</h3>
            <p className="text-sm text-gray-700 mb-2">
              Grupos de apoyo y orientación profesional
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
              Buscar grupos cerca de ti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
