import { ArrowLeft, Wind, Anchor, Phone, MessageCircle, Volume2, Heart, Activity, ChevronRight } from 'lucide-react';

interface PatientEmergencyProps {
  onBack: () => void;
}

export function PatientEmergency({ onBack }: PatientEmergencyProps) {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-b from-red-50 to-pink-50 p-6">
      {/* Header with Heart Icon */}
      <div className="text-center mb-8 mt-4">
        <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
          <Heart className="w-12 h-12 text-red-400" />
        </div>
        <h1 className="text-gray-800 mb-2">Estoy aquí contigo</h1>
        <p className="text-gray-600">Vamos a calmarnos juntos, paso a paso</p>
      </div>

      {/* Immediate Options */}
      <div className="space-y-4 mb-8">
        <button className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800">Respiración guiada</p>
                <p className="text-sm text-gray-500">3 minutos • Muy efectivo para ti</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </button>

        <button className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl flex-shrink-0">
                <Volume2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-800">Ejercicio de grounding</p>
                <p className="text-sm text-gray-500">5 minutos • Voz guiada</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </button>

        <button className="w-full bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-800">Contactar a mi terapeuta</p>
                <p className="text-sm text-gray-500">Mensaje prioritario</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </div>
        </button>
      </div>

      {/* Crisis Line */}
      <div className="bg-red-500 text-white p-5 rounded-2xl text-center shadow-lg">
        <p className="mb-2">Si estás en peligro inmediato</p>
        <button className="bg-white text-red-500 px-8 py-3 rounded-xl hover:bg-red-50 transition-all inline-flex items-center gap-2">
          <Phone className="w-5 h-5" />
          <span>Llamar al 112</span>
        </button>
      </div>
    </div>
  );
}