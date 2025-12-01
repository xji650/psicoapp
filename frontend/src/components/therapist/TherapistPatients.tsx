import { Search, TrendingUp, TrendingDown, Minus, MessageCircle, Calendar, FileText, Lock, Download, Send, Bell, Bot } from 'lucide-react';
import { useState } from 'react';

const patients = [
  {
    name: 'María García',
    initials: 'MG',
    status: 'needs-attention',
    mood: 'down',
    lastMood: 2,
    lastEntry: 'Hace 2 horas',
    nextSession: 'Mañana 10:00',
    messages: 3,
  },
  {
    name: 'Carlos Martínez',
    initials: 'CM',
    status: 'stable',
    mood: 'stable',
    lastMood: 3,
    lastEntry: 'Hace 5 horas',
    nextSession: 'Jueves 15:00',
    messages: 1,
  },
  {
    name: 'Ana Pérez',
    initials: 'AP',
    status: 'improving',
    mood: 'up',
    lastMood: 4,
    lastEntry: 'Hace 1 hora',
    nextSession: 'Viernes 11:00',
    messages: 0,
  },
  {
    name: 'Laura Sánchez',
    initials: 'LS',
    status: 'stable',
    mood: 'stable',
    lastMood: 3,
    lastEntry: 'Hace 3 horas',
    nextSession: 'Miércoles 16:00',
    messages: 2,
  },
];

export function TherapistPatients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const getMoodIcon = (mood: string) => {
    if (mood === 'up') return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (mood === 'down') return <TrendingDown className="w-5 h-5 text-red-600" />;
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getMoodEmoji = (value: number) => {
    const emojis = ['😢', '😟', '😐', '🙂', '😊'];
    return emojis[value - 1] || '😐';
  };

  const getStatusColor = (status: string) => {
    if (status === 'needs-attention') return 'from-red-400 to-rose-500';
    if (status === 'improving') return 'from-green-400 to-emerald-500';
    return 'from-blue-400 to-cyan-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h1 className="text-gray-900 mb-4">Mis Pacientes</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar paciente..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {patients.map((patient) => (
          <div key={patient.name}>
            <button
              onClick={() => setSelectedPatient(selectedPatient === patient.name ? null : patient.name)}
              className="w-full bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getStatusColor(patient.status)} flex items-center justify-center text-white flex-shrink-0`}>
                  {patient.initials}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{patient.name}</h3>
                    {getMoodIcon(patient.mood)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="text-2xl">{getMoodEmoji(patient.lastMood)}</span>
                    <span>Último registro: {patient.lastEntry}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{patient.nextSession}</span>
                    </div>
                    {patient.messages > 0 && (
                      <div className="flex items-center gap-1 text-purple-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>{patient.messages} nuevos</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>

            {/* Patient Details (Expanded) */}
            {selectedPatient === patient.name && (
              <div className="mt-3 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-5 shadow-md space-y-3">
                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-white text-purple-600 py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Mensaje</span>
                  </button>
                  <button className="bg-white text-purple-600 py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Citas</span>
                  </button>
                  <button className="bg-white text-purple-600 py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Informe</span>
                  </button>
                </div>

                {/* Evolution Report */}
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-900 text-sm">Informe de Evolución</h4>
                    <button className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700">
                      <Download className="w-3 h-3" />
                      <span>Exportar PDF</span>
                    </button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Progreso general:</span>
                      <span className="text-green-600">+15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ejercicios completados:</span>
                      <span>12/15 (80%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Días activos:</span>
                      <span>28/30</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estado emocional promedio:</span>
                      <span className="text-blue-600">3.8/5</span>
                    </div>
                  </div>
                </div>

                {/* Emotional Data Chart */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-gray-900 text-sm mb-2">Datos Emocionales (Última Semana)</h4>
                  <div className="flex items-end justify-between h-20 gap-1">
                    {[3, 4, 2, 3, 4, 5, 4].map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
                        style={{ height: `${value * 20}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                  </div>
                </div>

                {/* Documents Access */}
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-900 text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-600" />
                      Documentos Seguros
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Historia clínica</span>
                      </div>
                      <Download className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Notas de sesiones</span>
                      </div>
                      <Download className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">Consentimientos</span>
                      </div>
                      <Download className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Automation & Tasks */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-gray-900 text-sm mb-3 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    Automatización de Tareas
                  </h4>
                  <div className="space-y-3">
                    {/* Reminders */}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Recordatorios automáticos</label>
                      <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-gray-700">Recordar ejercicios diarios</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-9 h-5 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer transition-all"></div>
                        </label>
                      </div>
                    </div>

                    {/* Follow-up */}
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">Seguimiento automático</label>
                      <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Send className="w-4 h-4 text-purple-600" />
                          <span className="text-sm text-gray-700">Enviar check-in semanal</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-9 h-5 bg-gray-300 peer-checked:bg-purple-600 rounded-full peer transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assign Exercise */}
                <div className="bg-white rounded-xl p-4">
                  <h4 className="text-gray-900 text-sm mb-2">Asignar Ejercicio</h4>
                  <select className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2">
                    <option>Respiración 4-7-8</option>
                    <option>Grounding 5-4-3-2-1</option>
                    <option>Meditación guiada</option>
                    <option>Diario de gratitud</option>
                  </select>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:shadow-md transition-all text-sm flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Asignar y Notificar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}