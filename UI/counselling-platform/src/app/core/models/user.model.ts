export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  role: number;  // 1=Client, 2=Counsellor, 3=Admin
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  phoneNumber?: string;
}
