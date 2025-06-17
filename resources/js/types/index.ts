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
