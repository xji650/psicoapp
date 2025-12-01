import { User, Briefcase, Heart } from 'lucide-react';

interface UserRoleProps {
  role: 'patient' | 'therapist' | 'caregiver';
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}

export function UserRole({ role, label, icon, active, onClick }: UserRoleProps) {
  const icons = {
    user: User,
    briefcase: Briefcase,
    heart: Heart,
  };

  const Icon = icons[icon as keyof typeof icons];

  const colorClasses = {
    patient: active 
      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
      : 'bg-white text-gray-700 hover:bg-blue-50',
    therapist: active 
      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
      : 'bg-white text-gray-700 hover:bg-purple-50',
    caregiver: active 
      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
      : 'bg-white text-gray-700 hover:bg-pink-50',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg ${colorClasses[role]}`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
