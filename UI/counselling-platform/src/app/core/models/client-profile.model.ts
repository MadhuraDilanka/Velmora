export interface ClientProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  occupation?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  preferredLanguage?: string;
  profileImageUrl?: string;
  notes?: string;
}

export interface UpdateClientProfileRequest {
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  occupation?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  preferredLanguage?: string;
  notes?: string;
}
