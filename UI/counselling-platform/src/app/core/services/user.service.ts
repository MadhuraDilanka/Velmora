import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserListItem } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(role?: number): Observable<UserListItem[]> {
    let params = new HttpParams();
    if (role !== undefined) {
      params = params.set('role', role);
    }
    return this.http.get<UserListItem[]>(this.apiUrl, { params });
  }

  toggleStatus(id: string): Observable<{ isActive: boolean }> {
    return this.http.patch<{ isActive: boolean }>(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}
