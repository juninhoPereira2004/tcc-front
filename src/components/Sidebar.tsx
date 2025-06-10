
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Stethoscope,
  BarChart3,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Alunos', path: '/students' },
  { icon: GraduationCap, label: 'Professores', path: '/teachers' },
  { icon: BookOpen, label: 'Matérias', path: '/subjects' },
  { icon: Calendar, label: 'Aulas', path: '/classes' },
  { icon: Stethoscope, label: 'Médicos', path: '/doctors' },
  { icon: Clock, label: 'Agendamentos', path: '/appointments' },
  { icon: Settings, label: 'Configurações', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">APAE</h1>
            <p className="text-blue-200 text-sm">Sistema de Gestão</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-600 shadow-lg" 
                    : "hover:bg-blue-700/50 hover:translate-x-1"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-white" : "text-blue-200 group-hover:text-white"
                )} />
                <span className={cn(
                  "font-medium transition-colors",
                  isActive ? "text-white" : "text-blue-100 group-hover:text-white"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
