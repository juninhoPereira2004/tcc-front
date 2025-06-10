
import { create } from 'zustand';
import { Student, Teacher, Subject, Class, Doctor, Appointment } from '@/types';

interface Store {
  students: Student[];
  teachers: Teacher[];
  subjects: Subject[];
  classes: Class[];
  doctors: Doctor[];
  appointments: Appointment[];
  
  // Student actions
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  // Teacher actions
  addTeacher: (teacher: Teacher) => void;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  
  // Subject actions
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  // Class actions
  addClass: (classItem: Class) => void;
  updateClass: (id: string, classItem: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  
  // Doctor actions
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (id: string, doctor: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  
  // Appointment actions
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  students: [],
  teachers: [],
  subjects: [],
  classes: [],
  doctors: [],
  appointments: [],
  
  // Student actions
  addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
  updateStudent: (id, updatedStudent) => set((state) => ({
    students: state.students.map(s => s.id === id ? { ...s, ...updatedStudent } : s)
  })),
  deleteStudent: (id) => set((state) => ({
    students: state.students.filter(s => s.id !== id)
  })),
  
  // Teacher actions
  addTeacher: (teacher) => set((state) => ({ teachers: [...state.teachers, teacher] })),
  updateTeacher: (id, updatedTeacher) => set((state) => ({
    teachers: state.teachers.map(t => t.id === id ? { ...t, ...updatedTeacher } : t)
  })),
  deleteTeacher: (id) => set((state) => ({
    teachers: state.teachers.filter(t => t.id !== id)
  })),
  
  // Subject actions
  addSubject: (subject) => set((state) => ({ subjects: [...state.subjects, subject] })),
  updateSubject: (id, updatedSubject) => set((state) => ({
    subjects: state.subjects.map(s => s.id === id ? { ...s, ...updatedSubject } : s)
  })),
  deleteSubject: (id) => set((state) => ({
    subjects: state.subjects.filter(s => s.id !== id)
  })),
  
  // Class actions
  addClass: (classItem) => set((state) => ({ classes: [...state.classes, classItem] })),
  updateClass: (id, updatedClass) => set((state) => ({
    classes: state.classes.map(c => c.id === id ? { ...c, ...updatedClass } : c)
  })),
  deleteClass: (id) => set((state) => ({
    classes: state.classes.filter(c => c.id !== id)
  })),
  
  // Doctor actions
  addDoctor: (doctor) => set((state) => ({ doctors: [...state.doctors, doctor] })),
  updateDoctor: (id, updatedDoctor) => set((state) => ({
    doctors: state.doctors.map(d => d.id === id ? { ...d, ...updatedDoctor } : d)
  })),
  deleteDoctor: (id) => set((state) => ({
    doctors: state.doctors.filter(d => d.id !== id)
  })),
  
  // Appointment actions
  addAppointment: (appointment) => set((state) => ({ appointments: [...state.appointments, appointment] })),
  updateAppointment: (id, updatedAppointment) => set((state) => ({
    appointments: state.appointments.map(a => a.id === id ? { ...a, ...updatedAppointment } : a)
  })),
  deleteAppointment: (id) => set((state) => ({
    appointments: state.appointments.filter(a => a.id !== id)
  })),
}));
