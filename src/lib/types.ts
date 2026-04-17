export interface Owner {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  grooming_notes: string;
  created_at: string;
  updated_at: string;
}

export interface Dog {
  id: string;
  owner_id: string;
  name: string;
  breed: string;
  grooming_notes: string;
  created_at: string;
  updated_at: string;
}

export type AppointmentStatus = "scheduled" | "completed" | "canceled";

export interface Appointment {
  id: string;
  owner_id: string;
  dog_id: string;
  start_at: string;
  end_at: string;
  service: string;
  status: AppointmentStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OwnerWithDogCount extends Owner {
  dog_count: number;
}

export interface AppointmentWithDetails extends Appointment {
  owner_name: string;
  dog_name: string;
}
