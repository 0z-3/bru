
export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION'
}

export interface UserProfile {
  id: string;
  type: AccountType;
  email: string;
  // Individual fields
  fullName?: string;
  contactNumber?: string;
  // Organization fields
  orgName?: string;
  contactPerson?: string;
  mobileNumber?: string;
  orgWebsite?: string;
  orgAddress?: string;
}

export interface VolunteerSession {
  id: string;
  date: string;
  time: string;
  current: number;
  total: number;
}

export interface MapLocation {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  sessions: VolunteerSession[];
}

export interface RegistrationRecord {
  id: string;
  userId: string;
  location: string;
  slot: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  submittedAt: any;
}
