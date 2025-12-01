import { AlertTriangle, TrendingUp, Clock, Users, MessageCircle, Activity } from 'lucide-react';

interface TherapistDashboardProps {
  onViewPatient: () => void;
}

const alerts = [
  {
    patient: 'María G.',
    level: 'high',
    message: 'Estado de ánimo bajo durante 3 días consecutivos',
    time: 'Hace 2 horas',
    emoji: '😟',
  },
  {
    patient: 'Carlos M.',
    level: 'medium',
    message: 'Activó botón de emergencia esta mañana',
    time: 'Hace 5 horas',
    emoji: '😰',
  },
  {
    patient: 'Ana P.',
    level: 'low',
    message: 'Tendencia positiva en última semana',
    time: 'Ayer',
    emoji: '😊',
  },
];

const todayStats = [
  { label: 'Sesiones Hoy', value: '5', icon: Clock, color: 'from-blue-400 to-cyan-500' },
  { label: 'Pacientes Activos', value: '24', icon: Users, color: 'from-purple-400 to-pink-500' },
  { label: 'Mensajes Nuevos', value: '8', icon: MessageCircle, color: 'from-green-400 to-emerald-500' },
  { label: 'Alertas Activas', value: '2', icon: AlertTriangle, color: 'from-orange-400 to-rose-500' },
];

const recentActivity = [
  { patient: 'María G.', action: 'Registro emocional', value: 'Bajo (2/5)', time: '10:30' },
  { patient: 'Laura S.', action: 'Completó ejercicio', value: 'Respiración 4-7-8', time: '11:15' },
  { patient: 'Carlos M.', action: 'Mensaje enviado', value: 'Ver conversación', time: '12:45' },
  { patient: 'Ana P.', action: 'Registro emocional', value: 'Bien (4/5)', time: '14:20' },
];

export function TherapistDashboard({ onViewPatient }: TherapistDashboardProps) {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-lg text-white">
        <h1 className="mb-2">Bienvenida, Dra. López</h1>
        <p className="text-sm opacity-90">Lunes, 17 de Noviembre 2025</p>
      </div>

      {/* Priority Alerts */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900">Alertas Prioritarias</h2>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            2 Requieren atención
          </span>
        </div>
        
        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const bgColor = {
              high: 'from-red-50 to-rose-100 border-red-200',
              medium: 'from-orange-50 to-amber-100 border-orange-200',
              low: 'from-green-50 to-emerald-100 border-green-200',
            }[alert.level];

            return (
              <button
                key={index}
                onClick={onViewPatient}
                className={`w-full text-left p-4 bg-gradient-to-br ${bgColor} border rounded-2xl hover:shadow-md transition-all`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{alert.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-gray-900">{alert.patient}</span>
                      {alert.level === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{alert.message}</p>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                  <div className="text-sm text-purple-600">Ver</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {todayStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-4 shadow-lg`}
            >
              <Icon className="w-6 h-6 mb-2 opacity-90" />
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Actividad Reciente</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
            >
              <Activity className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-gray-900 text-sm mb-0.5">
                  <span>{activity.patient}</span> • {activity.action}
                </div>
                <div className="text-sm text-gray-600">{activity.value}</div>
              </div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Note */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-4 shadow-md">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
            AI
          </div>
          <div className="text-sm text-gray-700">
            <p className="mb-1">
              <span>Sugerencia del asistente:</span> María G. muestra patrones de ansiedad los lunes. 
              Considera programar sesiones preventivas o ejercicios para domingos.
            </p>
            <button className="text-purple-600 underline text-xs">
              Revisar análisis completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
