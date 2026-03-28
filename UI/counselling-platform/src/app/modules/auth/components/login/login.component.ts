import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styles: [`
    :host { display: block; min-height: 100vh; }

    .auth-shell { display: flex; min-height: 100vh; }

    /* ── Brand panel ────────────────────────────────────── */
    .brand-panel {
      flex: 0 0 44%;
      background: linear-gradient(145deg, #0f2460 0%, #1d4ed8 50%, #4338ca 100%);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .brand-inner {
      position: relative;
      z-index: 2;
      padding: 60px 48px;
      color: #fff;
      max-width: 420px;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 52px;
    }
    .brand-logo svg { width: 44px; height: 44px; }
    .brand-name {
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .brand-headline {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.18;
      letter-spacing: -0.03em;
      margin: 0 0 20px;
    }
    .brand-sub {
      font-size: 1rem;
      line-height: 1.75;
      color: rgba(255,255,255,0.72);
      margin: 0 0 40px;
    }
    .brand-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .brand-features li {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9375rem;
      color: rgba(255,255,255,0.88);
    }
    .feat-check {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: rgba(255,255,255,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .feat-check svg { width: 13px; height: 13px; stroke: #fff; }
    .blob {
      position: absolute;
      border-radius: 50%;
      opacity: 0.12;
    }
    .blob-1 { width: 380px; height: 380px; background: #a5b4fc; top: -120px; right: -100px; }
    .blob-2 { width: 260px; height: 260px; background: #818cf8; bottom: -100px; left: -80px; }

    /* ── Form panel ─────────────────────────────────────── */
    .form-panel {
      flex: 1;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 32px;
    }
    .form-card {
      width: 100%;
      max-width: 420px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.04);
      padding: 48px 40px;
    }
    .form-header { margin-bottom: 32px; }
    .form-header h2 {
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      margin: 0 0 6px;
    }
    .form-header p { font-size: 0.9375rem; color: #64748b; margin: 0; }

    /* ── Fields ─────────────────────────────────────────── */
    .field { margin-bottom: 20px; }
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 7px;
    }
    .label-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 7px;
    }
    .forgot-link {
      font-size: 0.8125rem;
      color: #2563eb;
      text-decoration: none;
      font-weight: 500;
    }
    .forgot-link:hover { text-decoration: underline; }

    .input-wrap { position: relative; display: flex; align-items: center; }
    .input-icon {
      position: absolute;
      left: 13px;
      width: 17px;
      height: 17px;
      color: #94a3b8;
      pointer-events: none;
      flex-shrink: 0;
    }
    .input {
      width: 100%;
      padding: 11px 14px 11px 42px;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      font-size: 0.9375rem;
      color: #0f172a;
      background: #fff;
      transition: border-color 0.15s, box-shadow 0.15s;
      outline: none;
      box-sizing: border-box;
    }
    .input::placeholder { color: #cbd5e1; }
    .input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
    .field--error .input { border-color: #ef4444; }
    .field--error .input:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }
    .field--error .input-icon { color: #ef4444; }
    .input--pw { padding-right: 46px; }

    .pw-toggle {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      display: flex;
      align-items: center;
      color: #94a3b8;
      transition: color 0.15s;
      border-radius: 4px;
    }
    .pw-toggle:hover { color: #475569; }
    .pw-toggle svg { width: 17px; height: 17px; }

    .field-error { display: block; font-size: 0.8125rem; color: #ef4444; margin-top: 5px; }

    /* ── Error banner ───────────────────────────────────── */
    .error-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 10px;
      padding: 12px 16px;
      font-size: 0.875rem;
      color: #b91c1c;
      margin-bottom: 20px;
    }
    .error-banner svg { width: 18px; height: 18px; flex-shrink: 0; }

    /* ── Submit ─────────────────────────────────────────── */
    .btn-primary {
      width: 100%;
      padding: 13px;
      background: linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s, transform 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 46px;
      letter-spacing: 0.01em;
      margin-bottom: 24px;
      font-family: inherit;
    }
    .btn-primary:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
    .btn-primary:active:not(:disabled) { transform: translateY(0); }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2.5px solid rgba(255,255,255,0.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .switch-link { text-align: center; font-size: 0.875rem; color: #64748b; margin: 0; }
    .switch-link a { color: #2563eb; font-weight: 600; }
    .switch-link a:hover { text-decoration: underline; }

    /* ── Responsive ─────────────────────────────────────── */
    @media (max-width: 768px) {
      .brand-panel { display: none; }
      .form-panel { background: #fff; padding: 24px 20px; }
      .form-card { box-shadow: none; padding: 36px 20px; }
    }
  `],
  template: `
    <div class="auth-shell">

      <!-- ── Brand Panel ── -->
      <aside class="brand-panel">
        <div class="brand-inner">
          <div class="brand-logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)"/>
              <path d="M24 13a5 5 0 00-5 5c0 1.4.56 2.66 1.47 3.58C16.4 22.8 13 26.9 13 31.5c0 3.59 4.25 6.5 9.5 6.5h3c5.25 0 9.5-2.91 9.5-6.5 0-4.6-3.4-8.7-7.47-9.92A4.97 4.97 0 0029 18a5 5 0 00-5-5z" fill="rgba(255,255,255,0.9)"/>
              <circle cx="19.5" cy="31" r="1.75" fill="rgba(30,64,175,0.45)"/>
              <circle cx="24" cy="33.5" r="1.75" fill="rgba(30,64,175,0.45)"/>
              <circle cx="28.5" cy="31" r="1.75" fill="rgba(30,64,175,0.45)"/>
            </svg>
            <span class="brand-name">Velmora</span>
          </div>
          <h1 class="brand-headline">Your path to<br>mental wellness</h1>
          <p class="brand-sub">Connect with certified counsellors, book sessions, and begin your healing journey at your own pace.</p>
          <ul class="brand-features">
            <li>
              <span class="feat-check">
                <svg viewBox="0 0 14 14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="2,7 5.5,10.5 12,3"/>
                </svg>
              </span>
              100+ Verified Counsellors
            </li>
            <li>
              <span class="feat-check">
                <svg viewBox="0 0 14 14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="2,7 5.5,10.5 12,3"/>
                </svg>
              </span>
              Secure &amp; Confidential Sessions
            </li>
            <li>
              <span class="feat-check">
                <svg viewBox="0 0 14 14" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="2,7 5.5,10.5 12,3"/>
                </svg>
              </span>
              Flexible Online Booking
            </li>
          </ul>
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
        </div>
      </aside>

      <!-- ── Form Panel ── -->
      <main class="form-panel">
        <div class="form-card">
          <div class="form-header">
            <h2>Welcome back</h2>
            <p>Sign in to continue your journey</p>
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>

            <!-- Email -->
            <div class="field" [class.field--error]="f['email'].invalid && f['email'].touched">
              <label class="label" for="login-email">Email address</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,7 12,14 22,7"/>
                </svg>
                <input
                  id="login-email"
                  class="input"
                  type="email"
                  formControlName="email"
                  placeholder="you@example.com"
                  autocomplete="email"
                />
              </div>
              <span class="field-error" *ngIf="f['email'].errors?.['required'] && f['email'].touched">Email is required.</span>
              <span class="field-error" *ngIf="f['email'].errors?.['email'] && f['email'].touched">Enter a valid email address.</span>
            </div>

            <!-- Password -->
            <div class="field" [class.field--error]="f['password'].invalid && f['password'].touched">
              <div class="label-row">
                <label class="label" for="login-password">Password</label>
                <a class="forgot-link" href="#" (click)="$event.preventDefault()">Forgot password?</a>
              </div>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="login-password"
                  class="input input--pw"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
                <button type="button" class="pw-toggle" (click)="togglePassword()"
                  [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                  <svg *ngIf="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg *ngIf="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <span class="field-error" *ngIf="f['password'].errors?.['required'] && f['password'].touched">Password is required.</span>
            </div>

            <!-- API error -->
            <div class="error-banner" *ngIf="errorMessage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ errorMessage }}
            </div>

            <button type="submit" class="btn-primary" [disabled]="isLoading">
              <span class="spinner" *ngIf="isLoading"></span>
              <span *ngIf="!isLoading">Sign In</span>
            </button>
          </form>

          <p class="switch-link">
            Don't have an account?&nbsp;<a routerLink="/auth/register">Create one free</a>
          </p>
        </div>
      </main>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  togglePassword(): void { this.showPassword = !this.showPassword; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const role = response.user.role;
        if (role === 1) this.router.navigate(['/client']);
        else if (role === 2) this.router.navigate(['/counsellor']);
        else this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}

