import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UploadAvatarResponse {
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly apiUrl = `${environment.apiBaseUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadAvatar(file: File): Observable<UploadAvatarResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadAvatarResponse>(`${this.apiUrl}/avatar`, formData);
  }
}
