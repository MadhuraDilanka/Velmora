export interface CounsellorProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  bio?: string;
  specializations?: string;
  qualifications?: string;
  languages?: string;
  yearsOfExperience: number;
  professionalTitle?: string;
  sessionFee: number;
  isVerified: boolean;
  sessionDurationMinutes: number;
  profileImageUrl?: string;
  isAvailableOnline: boolean;
  isAvailableInPerson: boolean;
  approvalStatus: number;  // 1=Pending, 2=Approved, 3=Rejected, 4=Suspended
  averageRating: number;
  totalReviews: number;
  isAvailable: boolean;
  linkedInUrl?: string;
}

export interface UpdateCounsellorProfileRequest {
  professionalTitle?: string;
  bio?: string;
  specializations?: string;
  qualifications?: string;
  languages?: string;
  yearsOfExperience: number;
  sessionFee: number;
  sessionDurationMinutes: number;
  isAvailableOnline: boolean;
  isAvailableInPerson: boolean;
  isAvailable: boolean;
  linkedInUrl?: string;
}
