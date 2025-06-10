
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { Class } from '@/types';

const Classes = () => {
  const { classes, subjects, teachers, students, addClass, updateClass, deleteClass } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = classes.filter(classItem => {
    const subject = subjects.find(s => s.id === classItem.subjectId);
    const teacher = teachers.find(t => t.id === classItem.teacherId);
    return subject?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           teacher?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           classItem.classroom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const studentIds = Array.from(formData.getAll('studentIds') as string[]);
    
    const classData = {
      id: editingClass?.id || Date.now().toString(),
      subjectId: formData.get('subjectId') as string,
      teacherId: formData.get('teacherId') as string,
      studentIds: studentIds,
      dayOfWeek: formData.get('dayOfWeek') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      classroom: formData.get('classroom') as string,
    };

    if (editingClass) {
      updateClass(editingClass.id, classData);
    } else {
      addClass(classData);
    }

    setShowForm(false);
    setEditingClass(null);
  };

  const handleEdit = (classItem: Class) => {
    setEditingClass(classItem);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta aula?')) {
      deleteClass(id);
    }
  };

  const daysOfWeek = [
    'Segunda-feira',
    'Terça-feira', 
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Distribuição de Aulas</h1>
          <p className="text-gray-500 mt-1">Gerencie a grade de aulas da APAE</p>
        </div>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Aula
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por matéria, professor ou sala..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingClass ? 'Editar Aula' : 'Nova Aula'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Matéria</label>
                  <select 
                    name="subjectId" 
                    defaultValue={editingClass?.subjectId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione uma matéria</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professor</label>
                  <select 
                    name="teacherId" 
                    defaultValue={editingClass?.teacherId}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione um professor</option>
                    {teachers.filter(t => t.status === 'active').map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dia da Semana</label>
                  <select 
                    name="dayOfWeek" 
                    defaultValue={editingClass?.dayOfWeek}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione o dia</option>
                    {daysOfWeek.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário Início</label>
                  <Input 
                    name="startTime" 
                    type="time" 
                    defaultValue={editingClass?.startTime} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário Fim</label>
                  <Input 
                    name="endTime" 
                    type="time" 
                    defaultValue={editingClass?.endTime} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sala de Aula</label>
                <Input name="classroom" defaultValue={editingClass?.classroom} required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alunos</label>
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2">
                  {students.filter(s => s.status === 'active').map(student => (
                    <label key={student.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="studentIds"
                        value={student.id}
                        defaultChecked={editingClass?.studentIds.includes(student.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{student.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingClass(null);
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingClass ? 'Atualizar' : 'Criar Aula'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClasses.map((classItem) => {
          const subject = subjects.find(s => s.id === classItem.subjectId);
          const teacher = teachers.find(t => t.id === classItem.teacherId);
          const classStudents = students.filter(s => classItem.studentIds.includes(s.id));
          
          return (
            <div key={classItem.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{subject?.name}</h3>
                  <p className="text-sm text-gray-500">Prof. {teacher?.name}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(classItem)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(classItem.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{classItem.dayOfWeek}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{classItem.startTime} - {classItem.endTime}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 mr-2 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs text-blue-600 font-medium">S</span>
                  </div>
                  <span>Sala {classItem.classroom}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{classStudents.length} alunos</span>
                </div>
              </div>
              
              {classStudents.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Alunos:</h4>
                  <div className="flex flex-wrap gap-1">
                    {classStudents.slice(0, 5).map(student => (
                      <span key={student.id} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {student.name}
                      </span>
                    ))}
                    {classStudents.length > 5 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{classStudents.length - 5} mais
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma aula encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece criando uma nova aula para a grade horária.
          </p>
        </div>
      )}
    </div>
  );
};

export default Classes;
