import { BookOpen, Target, Clock, CheckCircle, Calendar, Video, FileText, Download, Play } from 'lucide-react';

const therapeuticGoals = [
  {
    title: 'Reducir ansiedad matutina',
    progress: 65,
    status: 'En progreso',
    color: 'blue',
  },
  {
    title: 'Mejorar calidad del sueño',
    progress: 40,
    status: 'Iniciado',
    color: 'purple',
  },
  {
    title: 'Técnicas de respiración',
    progress: 85,
    status: 'Casi completado',
    color: 'green',
  },
];

const exercises = [
  {
    title: 'Respiración 4-7-8',
    type: 'Ejercicio práctico',
    duration: '5 min',
    from: 'Dra. López',
    date: 'Hace 2 días',
    completed: true,
    icon: Play,
  },
  {
    title: 'Diario de pensamientos',
    type: 'Tarea semanal',
    duration: '10 min/día',
    from: 'Dra. López',
    date: 'Hace 1 semana',
    completed: false,
    icon: FileText,
  },
  {
    title: 'Meditación guiada',
    type: 'Audio',
    duration: '15 min',
    from: 'Dra. López',
    date: 'Hace 3 días',
    completed: true,
    icon: Play,
  },
];

const learningMaterials = [
  {
    title: 'Entendiendo la ansiedad',
    type: 'Artículo',
    readTime: '8 min',
    icon: BookOpen,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Técnicas de grounding',
    type: 'Video tutorial',
    readTime: '12 min',
    icon: Video,
    color: 'from-purple-400 to-pink-500',
  },
  {
    title: 'Guía de respiración profunda',
    type: 'PDF descargable',
    readTime: '5 min',
    icon: Download,
    color: 'from-green-400 to-emerald-500',
  },
];

const sessionHistory = [
  {
    date: '15 Nov 2024',
    time: '10:00 - 11:00',
    type: 'Sesión individual',
    notes: 'Trabajamos técnicas de respiración para momentos de ansiedad',
  },
  {
    date: '8 Nov 2024',
    time: '10:00 - 11:00',
    type: 'Sesión individual',
    notes: 'Revisamos progreso del diario emocional. Identificamos patrones.',
  },
  {
    date: '1 Nov 2024',
    time: '10:00 - 11:00',
    type: 'Sesión individual',
    notes: 'Primera sesión del mes. Establecimos objetivos mensuales.',
  },
];

export function PatientResources() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white">
        <h1 className="mb-2">Recursos y Objetivos</h1>
        <p className="text-sm opacity-90">
          Tu camino hacia el bienestar
        </p>
      </div>

      {/* Therapeutic Goals */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-gray-900">Objetivos Terapéuticos</h2>
        </div>
        <div className="space-y-4">
          {therapeuticGoals.map((goal) => (
            <div key={goal.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">{goal.title}</h3>
                <span className="text-sm text-gray-600">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r from-${goal.color}-400 to-${goal.color}-600 h-2 rounded-full transition-all`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{goal.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exercises from Therapist */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Ejercicios Asignados</h2>
        <div className="space-y-3">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <div
                key={exercise.title}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  exercise.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200 hover:shadow-md cursor-pointer'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      exercise.completed ? 'bg-green-200' : 'bg-blue-200'
                    }`}
                  >
                    {exercise.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-700" />
                    ) : (
                      <Icon className="w-5 h-5 text-blue-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{exercise.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{exercise.type}</span>
                      <span>•</span>
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      De {exercise.from} - {exercise.date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Materials */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h2 className="text-gray-900">Materiales de Autoaprendizaje</h2>
        </div>
        <div className="space-y-3">
          {learningMaterials.map((material) => {
            const Icon = material.icon;
            return (
              <button
                key={material.title}
                className={`w-full bg-gradient-to-r ${material.color} text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="mb-1">{material.title}</h3>
                    <div className="text-sm opacity-90 flex items-center gap-2">
                      <span>{material.type}</span>
                      <span>•</span>
                      <span>{material.readTime}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-purple-600" />
          <h2 className="text-gray-900">Historial de Sesiones</h2>
        </div>
        <div className="space-y-3">
          {sessionHistory.map((session, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-xl">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-gray-900">{session.date}</h3>
                    <span className="text-sm text-gray-600">{session.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{session.type}</p>
                  <p className="text-sm text-gray-700">{session.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
          Ver historial completo
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
          <h2 className="text-gray-900">Próximas Citas</h2>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-white rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-900">22 Nov 2024</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Confirmada
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">10:00 - 11:00 • Sesión individual</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition-all">
                Unirme por video
              </button>
              <button className="py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-all">
                Reprogramar
              </button>
            </div>
          </div>
        </div>
        <button className="w-full mt-3 py-3 border-2 border-blue-300 text-blue-600 rounded-xl hover:bg-blue-50 transition-all">
          Reservar nueva cita
        </button>
      </div>
    </div>
  );
}
