
export interface Student {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  address: string;
  phone: string;
  responsible: string;
  responsiblePhone: string;
  medicalInfo: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  workload: number;
  category: string;
}

export interface Class {
  id: string;
  subjectId: string;
  teacherId: string;
  studentIds: string[];
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  classroom: string;
}

export interface Doctor {
  id: string;
  name: string;
  cpf: string;
  crm: string;
  email: string;
  phone: string;
  specialization: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  doctorId: string;
  studentId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  treatment?: string;
}
