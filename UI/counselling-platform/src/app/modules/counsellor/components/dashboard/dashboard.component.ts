import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counsellor-dashboard',
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
    .brand span { color: #0f766e; }
    .user-area { display: flex; align-items: center; gap: 12px; }
    .role-badge {
      background: #f0fdfa;
      color: #0f766e;
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
    .btn-logout:hover { border-color: #0f766e; color: #0f766e; }

    .page { padding: 40px 32px; max-width: 1100px; margin: 0 auto; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 6px; }
    .page-sub { color: #64748b; font-size: 0.9375rem; margin: 0 0 36px; }

    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    @media(max-width: 800px) { .cards { grid-template-columns: 1fr 1fr; } }
    @media(max-width: 500px) { .cards { grid-template-columns: 1fr; } .page { padding: 24px 16px; } }

    .card {
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 4px rgba(15,23,42,0.06);
    }
    .card-icon { font-size: 1.75rem; margin-bottom: 12px; }
    .card-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 6px; }
    .card-body { font-size: 0.875rem; color: #64748b; line-height: 1.6; margin: 0; }

    .approval-banner {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 16px 20px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin-bottom: 32px;
      font-size: 0.9rem;
      color: #92400e;
      line-height: 1.5;
    }
  `],
  template: `
    <nav class="topbar">
      <div class="brand">Velmora <span>Counsellor</span></div>
      <div class="user-area">
        <span class="role-badge">Counsellor</span>
        <button class="btn-logout" (click)="logout()">Sign out</button>
      </div>
    </nav>

    <section class="page">
      <h1 class="page-title">Counsellor Dashboard</h1>
      <p class="page-sub">Manage your sessions, profile, and availability</p>

      <div class="approval-banner">
        <span>⏳</span>
        <span>Your account is under review. An admin will approve your profile before you can accept client sessions. You'll be notified by email once approved.</span>
      </div>

      <div class="cards">
        <div class="card">
          <div class="card-icon">📋</div>
          <p class="card-title">My Profile</p>
          <p class="card-body">Set your bio, specialisations, qualifications, and consultation fee.</p>
        </div>
        <div class="card">
          <div class="card-icon">🗓️</div>
          <p class="card-title">Availability</p>
          <p class="card-body">Define your weekly schedule and block off unavailable times.</p>
        </div>
        <div class="card">
          <div class="card-icon">💬</div>
          <p class="card-title">Client Chats</p>
          <p class="card-body">Respond to messages from your clients between sessions.</p>
        </div>
      </div>
    </section>
  `
})
export class CounsellorDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
