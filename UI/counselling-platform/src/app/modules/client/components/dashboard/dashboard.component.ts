import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
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
    .brand span { color: #1d4ed8; }
    .user-area { display: flex; align-items: center; gap: 12px; }
    .role-badge {
      background: #eff6ff;
      color: #1d4ed8;
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
    .btn-logout:hover { border-color: #1d4ed8; color: #1d4ed8; }

    .page { padding: 40px 32px; max-width: 1100px; margin: 0 auto; }
    .page-title { font-size: 1.75rem; font-weight: 800; color: #0f172a; letter-spacing: -0.03em; margin: 0 0 6px; }
    .page-sub { color: #64748b; font-size: 0.9375rem; margin: 0 0 36px; }

    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
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

    .btn-primary {
      display: inline-block;
      margin-top: 36px;
      padding: 12px 28px;
      background: linear-gradient(135deg, #1d4ed8, #4338ca);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      text-decoration: none;
      transition: opacity 0.15s;
    }
    .btn-primary:hover { opacity: 0.9; }
  `],
  template: `
    <nav class="topbar">
      <div class="brand">Velmora <span>Client</span></div>
      <div class="user-area">
        <span class="role-badge">Client</span>
        <button class="btn-logout" (click)="logout()">Sign out</button>
      </div>
    </nav>

    <section class="page">
      <h1 class="page-title">Welcome back 👋</h1>
      <p class="page-sub">Here's what you can do on your dashboard</p>

      <div class="cards">
        <div class="card">
          <div class="card-icon">🔍</div>
          <p class="card-title">Find a Counsellor</p>
          <p class="card-body">Browse our verified counsellors by specialisation, availability, and language.</p>
        </div>
        <div class="card">
          <div class="card-icon">📅</div>
          <p class="card-title">My Sessions</p>
          <p class="card-body">View upcoming and past sessions. Join video calls or reschedule easily.</p>
        </div>
        <div class="card">
          <div class="card-icon">💬</div>
          <p class="card-title">Secure Chat</p>
          <p class="card-body">Message your counsellor between sessions in a private, encrypted chat.</p>
        </div>
      </div>

      <a class="btn-primary" routerLink="/counsellors">Find a Counsellor</a>
    </section>
  `
})
export class ClientDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
