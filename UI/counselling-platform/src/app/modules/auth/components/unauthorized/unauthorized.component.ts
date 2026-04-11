import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="unauth-page">
      <div class="unauth-card">
        <div class="unauth-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page. Please log in with an account that has the required permissions.</p>
        <div class="unauth-actions">
          <a routerLink="/" class="btn btn--outline">Go Home</a>
          <a routerLink="/auth/login" class="btn btn--primary">Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      padding: 24px;
    }
    .unauth-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 48px 40px;
      text-align: center;
      max-width: 440px;
      width: 100%;
    }
    .unauth-icon { font-size: 56px; margin-bottom: 16px; }
    h1 { font-size: 28px; font-weight: 800; color: #1a2e3b; margin: 0 0 12px; }
    p  { font-size: 15px; color: #718096; line-height: 1.6; margin: 0 0 32px; }
    .unauth-actions { display: flex; justify-content: center; gap: 12px; }
    .btn { padding: 11px 28px; border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s;
      &--outline { color: #4A90A4; border: 1.5px solid #4A90A4; background: transparent; &:hover { background: rgba(74,144,164,0.08); } }
      &--primary { color: #fff; background: #4A90A4; &:hover { background: #357a8e; } }
    }
  `]
})
export class UnauthorizedComponent {}
