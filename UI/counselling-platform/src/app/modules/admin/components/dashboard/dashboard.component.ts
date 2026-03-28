import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [`
    :host { display: block; min-height: 100vh; background: #f1f5f9; }

    .topbar {
      background: #fff;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 32px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand { font-size: 1.25rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .brand span { color: #dc2626; }
    .user-area { display: flex; align-items: center; gap: 12px; }
    .role-badge {
      background: #fef2f2;
      color: #dc2626;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .btn-logout {
      background: none;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      padding: 7px 16px;
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.15s, color 0.15s;
    }
    .btn-logout:hover { border-color: #dc2626; color: #dc2626; }

    .page { padding: 40px 32px; max-width: 1200px; margin: 0 auto; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 6px; }
    .page-sub { color: #64748b; font-size: 0.9375rem; margin: 0 0 36px; }

    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 36px; }
    @media(max-width: 900px) { .stats { grid-template-columns: 1fr 1fr; } }
    @media(max-width: 500px) { .stats { grid-template-columns: 1fr; } .page { padding: 24px 16px; } }

    .stat-card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 4px rgba(15,23,42,0.06);
    }
    .stat-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem;
      margin-bottom: 14px;
    }
    .stat-value { font-size: 2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.04em; }
    .stat-label { font-size: 0.875rem; color: #64748b; margin-top: 2px; }

    .quick-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media(max-width: 600px) { .quick-actions { grid-template-columns: 1fr; } }

    .action-card {
      background: #fff;
      border-radius: 16px;
      padding: 28px 24px;
      box-shadow: 0 1px 4px rgba(15,23,42,0.06);
      text-decoration: none;
      display: flex;
      align-items: flex-start;
      gap: 16px;
      transition: box-shadow 0.15s, transform 0.1s;
      cursor: pointer;
      border: none;
      font-family: inherit;
      text-align: left;
    }
    .action-card:hover { box-shadow: 0 4px 16px rgba(15,23,42,0.1); transform: translateY(-2px); }
    .action-icon { font-size: 1.75rem; flex-shrink: 0; }
    .action-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 4px; }
    .action-desc { font-size: 0.875rem; color: #64748b; margin: 0; }

    .coming-soon {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      background: #f0fdf4;
      color: #16a34a;
      border: 1px solid #bbf7d0;
      border-radius: 20px;
      padding: 2px 8px;
      margin-left: 8px;
      vertical-align: middle;
    }
  `],
  template: `
    <nav class="topbar">
      <div class="brand">Velmora <span>Admin</span></div>
      <div class="user-area">
        <span class="role-badge">Admin</span>
        <button class="btn-logout" (click)="logout()">Sign out</button>
      </div>
    </nav>

    <section class="page">
      <h1 class="page-title">Admin Dashboard</h1>
      <p class="page-sub">Platform overview and management tools</p>

      <div class="stats">
        <div class="stat-card">
          <div class="stat-icon" style="background:#eff6ff">👥</div>
          <div class="stat-value">—</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#f0fdf4">🧑‍⚕️</div>
          <div class="stat-value">—</div>
          <div class="stat-label">Counsellors</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#fffbeb">⏳</div>
          <div class="stat-value">—</div>
          <div class="stat-label">Pending Approvals</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background:#fdf4ff">📅</div>
          <div class="stat-value">—</div>
          <div class="stat-label">Sessions Today</div>
        </div>
      </div>

      <div class="quick-actions">
        <div class="action-card">
          <span class="action-icon">✅</span>
          <div>
            <p class="action-title">Approve Counsellors <span class="coming-soon">Coming soon</span></p>
            <p class="action-desc">Review and approve pending counsellor applications.</p>
          </div>
        </div>
        <div class="action-card">
          <span class="action-icon">👤</span>
          <div>
            <p class="action-title">Manage Users <span class="coming-soon">Coming soon</span></p>
            <p class="action-desc">View, activate, or deactivate platform accounts.</p>
          </div>
        </div>
        <div class="action-card">
          <span class="action-icon">📊</span>
          <div>
            <p class="action-title">Reports &amp; Analytics <span class="coming-soon">Coming soon</span></p>
            <p class="action-desc">Session stats, revenue tracking, and engagement metrics.</p>
          </div>
        </div>
        <div class="action-card">
          <span class="action-icon">⚙️</span>
          <div>
            <p class="action-title">Platform Settings <span class="coming-soon">Coming soon</span></p>
            <p class="action-desc">Configure fees, categories, and notification templates.</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
