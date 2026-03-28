export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'User' | 'Admin';
  phone_number?: string;
  address?: string;
  profile_picture?: string;
}

export interface Pet {
  id: number;
  name: string;
  pet_type: string;
  breed: string;
  color: string;
  status: string;
  image?: string;
  created_at: string;
  created_by: number;
}

export interface PetReportPetData {
  name: string;
  pet_type: string;
  breed: string;
  color: string;
  status: string;
  image?: string | null;
}

export interface PetReport {
  id: number;
  pet_data: PetReportPetData;
  // Keep flat versions for backward compatibility
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  pet_color: string;
  pet_status: 'Lost' | 'Found';
  pet_image?: string;
  location: string;
  description: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  admin_comment?: string;
  user: number;
  user_detail?: string;
  created_at: string;
  reviewed_at?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at: string;
  pet?: number;
  report?: number;
}
