export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Department {
  department_id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Classroom {
  classroom_id: number;     // int unsigned
  building: string;         // varchar
  room_number: string;      // varchar
  capacity?: number | null; // int, nullable
  created_at?: string | null; // timestamp, nullable
  updated_at?: string | null; // timestamp, nullable
}
export interface Subject {
  subject_id: number;
  course_id: number;
  name: string;
  code: string;
  credits?: number | null;
  description: string | null;
  created_at?: string | null;
  updated_at?: string | null

}
export interface Attendance {
  attendance_id: number;
  session_id: number;
  student_id: number;
  status: string;
  remarks?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface ClassSession {
  session_id: number;
  class_subject_id: number;
  session_date: string; // YYYY-MM-DD
  start_time: string; // HH:MM:SS
  end_time: string;   // HH:MM:SS
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface ClassSubject {
  class_subject_id: number;
  class_id: number;
  subject_id: number;
  teacher_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface SchoolClass {
  class_id: number;
  course_id: number;
  year: number;
  section: string;
  advisor_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Enrollment {
  enrollment_id: number;
  student_id: number;
  class_id: number;
  enrollment_date: string; // YYYY-MM-DD
  created_at?: string | null;
  updated_at?: string | null;
}
export interface FeeInstallment {
  student_id: number;
  installment_no: number;
  amount: string; // stored as decimal(10,2), use string for precision
  due_date: string; // YYYY-MM-DD
  payment_date?: string | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Schedule {
  schedule_id: number;
  class_subject_id: number;
  classroom_id: number;
  day_of_week: string; // e.g., "Monday"
  start_time: string;
  end_time: string;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface StudentDocument {
  student_id: number;
  document_type: string;
  file_path: string;
  issue_date?: string | null;
  submitted_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  dob?: string | null; // YYYY-MM-DD
  gender?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  department_id?: number | null;
  enrollment_year?: number | null;
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Teacher {
  teacher_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  department_id?: number | null;
  hire_date?: string | null; // YYYY-MM-DD
  status?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
export interface Course {
  course_id: number;
  name: string;
  code: string;
  department_id?: number | null;
  duration_semesters?: number | null;
  description?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
