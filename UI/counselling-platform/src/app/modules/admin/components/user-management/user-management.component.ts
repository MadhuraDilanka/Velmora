import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h2>User Management</h2>
      <p>View, search and manage all registered users on the platform.</p>
    </div>

    <div class="toolbar">
      <input class="search-input" type="text" placeholder="Search by name or email..." />
      <div class="filter-group">
        <button class="filter-btn" [class.active]="roleFilter === 'all'" (click)="roleFilter = 'all'">All</button>
        <button class="filter-btn" [class.active]="roleFilter === 'client'" (click)="roleFilter = 'client'">Clients</button>
        <button class="filter-btn" [class.active]="roleFilter === 'counsellor'" (click)="roleFilter = 'counsellor'">Counsellors</button>
      </div>
    </div>

    <div class="card">
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
          <tr class="empty-row">
            <td colspan="6">
              <div class="empty-state">
                <span class="empty-icon">👥</span>
                <span>No users found.</span>
              </div>
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
    }
    .empty-row td { padding: 0; }
    .empty-state { padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 14px; color: #718096; }
    .empty-icon { font-size: 36px; }
  `]
})
export class UserManagementComponent {
  roleFilter: 'all' | 'client' | 'counsellor' = 'all';
}
