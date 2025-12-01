import { User, Bell, Lock, Settings, HelpCircle, LogOut, Shield, Eye, BookOpen, Target, Calendar } from 'lucide-react';

const quickLinks = [
  {
    icon: BookOpen,
    title: 'Recursos y Ejercicios',
    description: 'Materiales y objetivos terapéuticos',
    screen: 'resources',
    color: 'from-purple-500 to-blue-500',
  },
  {
    icon: Target,
    title: 'Mis Objetivos',
    description: 'Seguimiento de progreso',
    screen: 'resources',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Calendar,
    title: 'Agenda de Citas',
    description: 'Próximas sesiones',
    screen: 'resources',
    color: 'from-green-500 to-emerald-500',
  },
];

const settingsOptions = [
  {
    icon: Bell,
    title: 'Notificaciones',
    description: 'Recordatorios y alertas',
    action: 'Configurar',
  },
  {
    icon: Lock,
    title: 'Privacidad',
    description: 'Control de datos y seguridad',
    action: 'Ver',
  },
  {
    icon: Eye,
    title: 'Modo Oscuro',
    description: 'Para uso nocturno',
    action: 'Activar',
  },
  {
    icon: Settings,
    title: 'Accesibilidad',
    description: 'Tamaño de texto, voz, contraste',
    action: 'Ajustar',
  },
];

interface PatientProfileProps {
  onNavigate?: (screen: string) => void;
}

export function PatientProfile({ onNavigate }: PatientProfileProps = {}) {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-6 shadow-lg text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            👩‍💼
          </div>
          <div>
            <h1 className="mb-1">María García</h1>
            <p className="text-sm opacity-90">Paciente desde Marzo 2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl mb-1">32</div>
            <div className="text-xs opacity-90">Días activos</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl mb-1">89%</div>
            <div className="text-xs opacity-90">Registros</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl mb-1">15</div>
            <div className="text-xs opacity-90">Sesiones</div>
          </div>
        </div>
      </div>

      {/* Therapist Info */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Mi Terapeuta</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
            DL
          </div>
          <div>
            <h3 className="text-gray-900">Dra. Laura López</h3>
            <p className="text-sm text-gray-600">Psicóloga Clínica</p>
            <p className="text-sm text-gray-500">Col. 12345</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Enlaces Rápidos</h2>
        <div className="space-y-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.title}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                onClick={() => onNavigate?.(link.screen)}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-gray-900">{link.title}</div>
                  <div className="text-sm text-gray-600">{link.description}</div>
                </div>
                <div className="text-sm text-blue-600">Ir</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h2 className="text-gray-900 mb-4">Configuración</h2>
        <div className="space-y-3">
          {settingsOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.title}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-gray-900">{option.title}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                <div className="text-sm text-blue-600">{option.action}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy Info */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 shadow-md">
        <div className="flex gap-3 mb-4">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="text-gray-900 mb-2">Tu Privacidad Importa</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>🔒 Cifrado extremo a extremo</li>
              <li>👁️ Solo tu terapeuta puede ver tus datos</li>
              <li>🚫 No compartimos información con terceros</li>
              <li>📊 Puedes exportar o eliminar tus datos</li>
            </ul>
          </div>
        </div>
        <button className="text-sm text-green-700 underline">
          Ver Política de Privacidad completa
        </button>
      </div>

      {/* Support & Logout */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-gray-700">
          <HelpCircle className="w-5 h-5" />
          <span>Centro de Ayuda</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all text-red-600">
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}