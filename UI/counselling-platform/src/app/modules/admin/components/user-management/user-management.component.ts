import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { UserListItem } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <h2>User Management</h2>
      <p>View, search and manage all registered users on the platform.</p>
    </div>

    <div class="toolbar">
      <input class="search-input" type="text" [(ngModel)]="searchQuery" placeholder="Search by name or email..." />
      <div class="filter-group">
        <button class="filter-btn" [class.active]="roleFilter === 'all'"       (click)="roleFilter = 'all'">All</button>
        <button class="filter-btn" [class.active]="roleFilter === 'client'"    (click)="roleFilter = 'client'">Clients</button>
        <button class="filter-btn" [class.active]="roleFilter === 'counsellor'" (click)="roleFilter = 'counsellor'">Counsellors</button>
      </div>
    </div>

    <!-- Loading -->
    <div *ngIf="isLoading" class="card">
      <div *ngFor="let i of [1,2,3,4,5]" class="skeleton-row">
        <div class="sk-avatar"></div>
        <div class="sk-lines">
          <div class="sk-line w50"></div>
          <div class="sk-line w30"></div>
        </div>
      </div>
    </div>

    <div *ngIf="!isLoading" class="card">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngIf="filtered.length === 0">
            <td colspan="6">
              <div class="empty-state">
                <span class="empty-icon">👥</span>
                <span>No users found{{ searchQuery ? ' matching "' + searchQuery + '"' : '' }}.</span>
              </div>
            </td>
          </tr>
          <tr *ngFor="let u of filtered">
            <td>
              <div class="user-cell">
                <div class="user-cell__avatar" [style.background]="avatarColor(u.fullName)">{{ initials(u.fullName) }}</div>
                <span class="user-cell__name">{{ u.fullName }}</span>
              </div>
            </td>
            <td class="td-email">{{ u.email }}</td>
            <td>
              <span class="role-badge" [ngClass]="roleBadgeClass(u.role)">{{ roleLabel(u.role) }}</span>
            </td>
            <td class="td-date">{{ u.createdAt | date:'MMM d, y' }}</td>
            <td>
              <span class="status-dot" [class.active]="u.isActive" [class.inactive]="!u.isActive">
                {{ u.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <button
                class="toggle-btn"
                [class.deactivate]="u.isActive"
                [class.activate]="!u.isActive"
                [disabled]="processingId === u.id"
                (click)="toggleStatus(u)">
                {{ processingId === u.id ? '…' : (u.isActive ? 'Deactivate' : 'Activate') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
    .search-input { flex: 1; min-width: 200px; padding: 10px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
    .filter-group { display: flex; gap: 4px; }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 13px; font-weight: 500; color: #4a5568; cursor: pointer; transition: all 0.2s;
      &.active { border-color: #4A90A4; background: rgba(74,144,164,0.1); color: #4A90A4; font-weight: 600; }
    }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    .table { width: 100%; border-collapse: collapse;
      th { padding: 14px 20px; font-size: 12px; font-weight: 600; color: #718096; text-transform: uppercase; letter-spacing: 0.5px; background: #f8fafc; text-align: left; border-bottom: 1px solid #e2e8f0; }
      td { padding: 14px 20px; font-size: 14px; color: #2d3748; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
      tr:last-child td { border-bottom: none; }
    }
    .td-email { color: #718096; font-size: 13px; }
    .td-date  { color: #718096; font-size: 13px; }
    .user-cell { display: flex; align-items: center; gap: 10px; }
    .user-cell__avatar { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; }
    .user-cell__name { font-weight: 600; color: #1a2e3b; }
    .role-badge { padding: 3px 12px; border-radius: 100px; font-size: 12px; font-weight: 600;
      &.role-client     { background: rgba(74,144,164,0.1);  color: #4A90A4;  }
      &.role-counsellor { background: rgba(56,161,105,0.1);  color: #38a169;  }
      &.role-admin      { background: rgba(128,90,213,0.1);  color: #805ad5;  }
    }
    .status-dot { font-size: 13px; font-weight: 600;
      &.active   { color: #38a169; }
      &.inactive { color: #a0aec0; }
    }
    .toggle-btn { padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid; transition: all 0.2s;
      &.deactivate { border-color: #e53e3e; color: #e53e3e; background: #fff; &:hover:not(:disabled) { background: #fff5f5; } }
      &.activate   { border-color: #38a169; color: #38a169; background: #fff; &:hover:not(:disabled) { background: rgba(56,161,105,0.05); } }
      &:disabled { opacity: 0.5; cursor: not-allowed; }
    }
    .empty-state { padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 14px; color: #718096; }
    .empty-icon  { font-size: 36px; }
    /* Loading skeleton */
    .skeleton-row { display: flex; gap: 16px; align-items: center; padding: 16px 20px; border-bottom: 1px solid #f1f5f9; &:last-child { border-bottom: none; } }
    .sk-avatar { width: 34px; height: 34px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; animation: shimmer 1.5s infinite; }
    .sk-lines  { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .sk-line   { height: 14px; background: #e2e8f0; border-radius: 6px; animation: shimmer 1.5s infinite; }
    .sk-line.w50 { width: 50%; } .sk-line.w30 { width: 30%; }
    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `]
})
export class UserManagementComponent implements OnInit {
  isLoading = true;
  users: UserListItem[] = [];
  searchQuery = '';
  roleFilter: 'all' | 'client' | 'counsellor' = 'all';
  processingId: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (data) => { this.users = data; this.isLoading = false; },
      error: ()     => { this.isLoading = false; },
    });
  }

  get filtered(): UserListItem[] {
    let result = this.users;
    if (this.roleFilter === 'client')     result = result.filter(u => u.role === 1);
    if (this.roleFilter === 'counsellor') result = result.filter(u => u.role === 2);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(u => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return result;
  }

  toggleStatus(u: UserListItem): void {
    this.processingId = u.id;
    this.userService.toggleStatus(u.id).subscribe({
      next: (res) => { u.isActive = res.isActive; this.processingId = null; },
      error: ()    => { this.processingId = null; },
    });
  }

  roleLabel(role: number): string {
    if (role === 1) return 'Client';
    if (role === 2) return 'Counsellor';
    if (role === 3) return 'Admin';
    return 'Unknown';
  }

  roleBadgeClass(role: number): string {
    if (role === 1) return 'role-client';
    if (role === 2) return 'role-counsellor';
    if (role === 3) return 'role-admin';
    return '';
  }

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  avatarColor(name: string): string {
    const colors = ['#4A90A4', '#38a169', '#805ad5', '#dd6b20', '#e53e3e', '#d69e2e'];
    let h = 0;
    for (let i = 0; i < name.length; i++) { h = name.charCodeAt(i) + ((h << 5) - h); }
    return colors[Math.abs(h) % colors.length];
  }
}

