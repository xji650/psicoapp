import { Plus, Mic, Lock, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

const weekData = [
  { day: 'Lun', value: 3, label: 'Normal' },
  { day: 'Mar', value: 4, label: 'Bien' },
  { day: 'Mié', value: 2, label: 'Bajo' },
  { day: 'Jue', value: 3, label: 'Normal' },
  { day: 'Vie', value: 4, label: 'Bien' },
  { day: 'Sáb', value: 5, label: 'Genial' },
  { day: 'Dom', value: 4, label: 'Bien' },
];

const entries = [
  {
    date: 'Hoy, 10:30',
    mood: 4,
    emoji: '🙂',
    text: 'Me siento mejor hoy. Los ejercicios de respiración están ayudando.',
  },
  {
    date: 'Ayer, 15:45',
    mood: 5,
    emoji: '😊',
    text: 'Gran día. Salí a caminar y me sentí muy bien.',
  },
  {
    date: 'Hace 2 días, 09:20',
    mood: 2,
    emoji: '😟',
    text: 'Ansiedad alta esta mañana. Reunión de trabajo difícil.',
  },
];

const getColorForValue = (value: number) => {
  const colors = {
    1: '#f87171',
    2: '#fb923c',
    3: '#fbbf24',
    4: '#60a5fa',
    5: '#34d399',
  };
  return colors[value as keyof typeof colors] || '#94a3b8';
};

export function PatientDiary() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-gray-900 mb-2">Diario Emocional</h1>
        <p className="text-gray-600">Seguimiento de tu bienestar semanal</p>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Esta Semana</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#6b7280" />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {weekData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForValue(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Insights */}
        <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-gray-900 text-sm mb-1">Patrón detectado</div>
              <p className="text-gray-700 text-sm">
                Tu estado de ánimo mejora significativamente los fines de semana. 
                Considera incorporar más actividades relajantes durante la semana.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* New Entry Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-6 h-6 mx-auto mb-2" />
          <span>Nueva Entrada</span>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Mic className="w-6 h-6 mx-auto mb-2" />
          <span>Nota de Voz</span>
        </button>
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Entradas Recientes</h2>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl flex-shrink-0">{entry.emoji}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">{entry.date}</div>
                  <p className="text-gray-700">{entry.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
        <Lock className="w-4 h-4" />
        <span>Solo compartido con tu terapeuta</span>
      </div>
    </div>
  );
}
