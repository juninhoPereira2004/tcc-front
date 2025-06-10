
import React from 'react';
import { Users, GraduationCap, BookOpen, Stethoscope, Calendar, Clock } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { useStore } from '@/store/useStore';

const Dashboard = () => {
  const { students, teachers, subjects, doctors, appointments, classes } = useStore();

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const activeStudents = students.filter(s => s.status === 'active');
  const activeTeachers = teachers.filter(t => t.status === 'active');
  const activeDoctors = doctors.filter(d => d.status === 'active');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Visão geral do sistema APAE</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Hoje</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Alunos Ativos"
          value={activeStudents.length}
          icon={Users}
          color="bg-blue-500"
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatsCard
          title="Professores"
          value={activeTeachers.length}
          icon={GraduationCap}
          color="bg-green-500"
          trend={{ value: 2, isPositive: true }}
        />
        
        <StatsCard
          title="Matérias"
          value={subjects.length}
          icon={BookOpen}
          color="bg-purple-500"
        />
        
        <StatsCard
          title="Médicos"
          value={activeDoctors.length}
          icon={Stethoscope}
          color="bg-red-500"
        />
        
        <StatsCard
          title="Aulas Hoje"
          value={classes.length}
          icon={Calendar}
          color="bg-orange-500"
        />
        
        <StatsCard
          title="Consultas Hoje"
          value={todayAppointments.length}
          icon={Clock}
          color="bg-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Consultas</h3>
          <div className="space-y-3">
            {todayAppointments.slice(0, 5).map((appointment) => {
              const doctor = doctors.find(d => d.id === appointment.doctorId);
              const student = students.find(s => s.id === appointment.studentId);
              
              return (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student?.name}</p>
                    <p className="text-sm text-gray-500">Dr. {doctor?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.status}</p>
                  </div>
                </div>
              );
            })}
            {todayAppointments.length === 0 && (
              <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada para hoje</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Semanal</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de Aulas</span>
              <span className="font-semibold text-gray-900">{classes.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consultas Agendadas</span>
              <span className="font-semibold text-gray-900">{appointments.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxa de Frequência</span>
              <span className="font-semibold text-green-600">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Novos Alunos</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
