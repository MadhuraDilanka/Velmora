import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CounsellorProfile, UpdateCounsellorProfileRequest } from '../models/counsellor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {
  private readonly apiUrl = `${environment.apiBaseUrl}/counsellors`;

  constructor(private http: HttpClient) {}

  // ── Public ────────────────────────────────────────────────────────────────

  getApprovedCounsellors(): Observable<CounsellorProfile[]> {
    return this.http.get<CounsellorProfile[]>(this.apiUrl);
  }

  getCounsellorById(id: string): Observable<CounsellorProfile> {
    return this.http.get<CounsellorProfile>(`${this.apiUrl}/${id}`);
  }

  // ── Counsellor (own profile) ──────────────────────────────────────────────

  getMyProfile(): Observable<CounsellorProfile> {
    return this.http.get<CounsellorProfile>(`${this.apiUrl}/me`);
  }

  upsertMyProfile(data: UpdateCounsellorProfileRequest): Observable<CounsellorProfile> {
    return this.http.put<CounsellorProfile>(`${this.apiUrl}/me`, data);
  }

  // ── Admin ─────────────────────────────────────────────────────────────────

  getPendingCounsellors(): Observable<CounsellorProfile[]> {
    return this.http.get<CounsellorProfile[]>(`${this.apiUrl}/pending`);
  }

  approveCounsellor(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectCounsellor(id: string, reason?: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/reject`, { reason });
  }
}
