export interface CounsellorProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  bio?: string;
  specializations?: string;
  qualifications?: string;
  yearsOfExperience: number;
  hourlyRate: number;
  profilePictureUrl?: string;
  approvalStatus: number;
  averageRating: number;
  totalReviews: number;
  isAvailable: boolean;
}
