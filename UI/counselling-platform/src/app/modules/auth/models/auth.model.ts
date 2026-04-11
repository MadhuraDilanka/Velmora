export enum UserRole {
  Client = 1,
  Counsellor = 2,
  Admin = 3
}

export interface UserDto {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  profilePictureUrl?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  role: UserRole;
}
