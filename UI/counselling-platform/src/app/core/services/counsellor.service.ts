import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CounsellorProfile } from '../models/counsellor.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounsellorService {
  private readonly apiUrl = `${environment.apiBaseUrl}/counsellors`;

  constructor(private http: HttpClient) {}

  getApprovedCounsellors(): Observable<CounsellorProfile[]> {
    return this.http.get<CounsellorProfile[]>(this.apiUrl);
  }

  getCounsellorById(id: string): Observable<CounsellorProfile> {
    return this.http.get<CounsellorProfile>(`${this.apiUrl}/${id}`);
  }
}
