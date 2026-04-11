import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientProfile, UpdateClientProfileRequest } from '../models/client-profile.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly apiUrl = `${environment.apiBaseUrl}/clients`;

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<ClientProfile> {
    return this.http.get<ClientProfile>(`${this.apiUrl}/me`);
  }

  updateMyProfile(data: UpdateClientProfileRequest): Observable<ClientProfile> {
    return this.http.put<ClientProfile>(`${this.apiUrl}/me`, data);
  }
}
