import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/auth.model';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const pw = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return pw && confirm && pw !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styles: [`
    :host { display: block; min-height: 100vh; }

    .auth-shell { display: flex; min-height: 100vh; }

    /* ── Brand panel ────────────────────────────────────── */
    .brand-panel {
      flex: 0 0 44%;
      background: linear-gradient(145deg, #064e3b 0%, #0f766e 50%, #0891b2 100%);
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
    .brand-name { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; }
    .brand-headline {
      font-size: 2.4rem;
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
    .brand-steps {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .brand-steps li {
      display: flex;
      align-items: center;
      gap: 14px;
      color: rgba(255,255,255,0.88);
      font-size: 0.9375rem;
    }
    .step-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8125rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .blob { position: absolute; border-radius: 50%; opacity: 0.12; }
    .blob-1 { width: 350px; height: 350px; background: #6ee7b7; top: -100px; right: -90px; }
    .blob-2 { width: 240px; height: 240px; background: #67e8f9; bottom: -80px; left: -60px; }

    /* ── Form panel ─────────────────────────────────────── */
    .form-panel {
      flex: 1;
      background: #f1f5f9;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 48px 32px;
      overflow-y: auto;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .form-card {
      width: 100%;
      max-width: 480px;
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(15,23,42,0.07), 0 1px 3px rgba(15,23,42,0.04);
      padding: 48px 40px;
    }
    .form-header { margin-bottom: 28px; }
    .form-header h2 {
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      margin: 0 0 6px;
    }
    .form-header p { font-size: 0.9375rem; color: #64748b; margin: 0; }

    /* ── Role cards ─────────────────────────────────────── */
    .role-section { margin-bottom: 24px; }
    .role-label-text {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 10px;
    }
    .role-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .role-card {
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px 14px;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
      text-align: center;
      user-select: none;
    }
    .role-card:hover { border-color: #93c5fd; background: #f8fafc; }
    .role-card.active {
      border-color: #2563eb;
      background: #eff6ff;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
    }
    .role-icon { font-size: 1.75rem; margin-bottom: 6px; }
    .role-name { font-size: 0.9375rem; font-weight: 700; color: #0f172a; }
    .role-desc { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }

    /* ── Counsellor note ────────────────────────────────── */
    .info-note {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 0.8125rem;
      color: #0369a1;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .info-note svg { width: 16px; height: 16px; flex-shrink: 0; margin-top: 1px; }

    /* ── Fields ─────────────────────────────────────────── */
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .field { margin-bottom: 18px; }
    .label {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #334155;
      margin-bottom: 7px;
    }
    .label-opt { font-weight: 400; color: #94a3b8; font-size: 0.75rem; }
    .input-wrap { position: relative; display: flex; align-items: center; }
    .input-icon {
      position: absolute;
      left: 13px;
      width: 17px;
      height: 17px;
      color: #94a3b8;
      pointer-events: none;
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
    .input-no-icon { padding-left: 14px; }
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

    /* ── Password strength ──────────────────────────────── */
    .strength-wrap { margin-top: 8px; }
    .strength-bar {
      display: flex;
      gap: 4px;
      margin-bottom: 5px;
    }
    .strength-seg {
      height: 4px;
      flex: 1;
      border-radius: 2px;
      background: #e2e8f0;
      transition: background 0.25s;
    }
    .strength-label-text { font-size: 0.75rem; font-weight: 600; }

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
      background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%);
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
      margin-top: 8px;
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
    .switch-link a { color: #0f766e; font-weight: 600; }
    .switch-link a:hover { text-decoration: underline; }

    /* ── Responsive ─────────────────────────────────────── */
    @media (max-width: 768px) {
      .brand-panel { display: none; }
      .form-panel { background: #fff; padding: 24px 16px; }
      .form-card { box-shadow: none; padding: 32px 20px; }
      .form-row { grid-template-columns: 1fr; gap: 0; }
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
              <circle cx="19.5" cy="31" r="1.75" fill="rgba(6,78,59,0.4)"/>
              <circle cx="24" cy="33.5" r="1.75" fill="rgba(6,78,59,0.4)"/>
              <circle cx="28.5" cy="31" r="1.75" fill="rgba(6,78,59,0.4)"/>
            </svg>
            <span class="brand-name">Velmora</span>
          </div>
          <h1 class="brand-headline">Begin your wellness journey today</h1>
          <p class="brand-sub">Join thousands of people who found clarity, balance, and professional support on Velmora.</p>
          <ol class="brand-steps">
            <li>
              <span class="step-num">1</span>
              Create your free account
            </li>
            <li>
              <span class="step-num">2</span>
              Browse certified counsellors
            </li>
            <li>
              <span class="step-num">3</span>
              Book your first session
            </li>
          </ol>
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
        </div>
      </aside>

      <!-- ── Form Panel ── -->
      <main class="form-panel">
        <div class="form-card">
          <div class="form-header">
            <h2>Create your account</h2>
            <p>It's free and takes less than 2 minutes</p>
          </div>

          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>

            <!-- Role selector -->
            <div class="role-section">
              <span class="role-label-text">I am joining as</span>
              <div class="role-group">
                <div class="role-card" [class.active]="f['role'].value === UserRole.Client" (click)="setRole(UserRole.Client)" role="radio" [attr.aria-checked]="f['role'].value === UserRole.Client">
                  <div class="role-icon">&#128100;</div>
                  <div class="role-name">Client</div>
                  <div class="role-desc">Seeking support</div>
                </div>
                <div class="role-card" [class.active]="f['role'].value === UserRole.Counsellor" (click)="setRole(UserRole.Counsellor)" role="radio" [attr.aria-checked]="f['role'].value === UserRole.Counsellor">
                  <div class="role-icon">&#129687;</div>
                  <div class="role-name">Counsellor</div>
                  <div class="role-desc">Providing support</div>
                </div>
              </div>
            </div>

            <!-- Counsellor approval note -->
            <div class="info-note" *ngIf="f['role'].value === UserRole.Counsellor">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Your profile will be reviewed and approved by an admin before you can accept sessions.
            </div>

            <!-- Name row -->
            <div class="form-row">
              <div class="field" [class.field--error]="f['firstName'].invalid && f['firstName'].touched">
                <label class="label" for="reg-firstname">First name</label>
                <div class="input-wrap">
                  <input id="reg-firstname" class="input input-no-icon" type="text" formControlName="firstName" placeholder="Jane" autocomplete="given-name"/>
                </div>
                <span class="field-error" *ngIf="f['firstName'].errors?.['required'] && f['firstName'].touched">Required.</span>
                <span class="field-error" *ngIf="f['firstName'].errors?.['maxlength'] && f['firstName'].touched">Max 50 chars.</span>
              </div>
              <div class="field" [class.field--error]="f['lastName'].invalid && f['lastName'].touched">
                <label class="label" for="reg-lastname">Last name</label>
                <div class="input-wrap">
                  <input id="reg-lastname" class="input input-no-icon" type="text" formControlName="lastName" placeholder="Doe" autocomplete="family-name"/>
                </div>
                <span class="field-error" *ngIf="f['lastName'].errors?.['required'] && f['lastName'].touched">Required.</span>
                <span class="field-error" *ngIf="f['lastName'].errors?.['maxlength'] && f['lastName'].touched">Max 50 chars.</span>
              </div>
            </div>

            <!-- Email -->
            <div class="field" [class.field--error]="f['email'].invalid && f['email'].touched">
              <label class="label" for="reg-email">Email address</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,7 12,14 22,7"/>
                </svg>
                <input id="reg-email" class="input" type="email" formControlName="email" placeholder="you@example.com" autocomplete="email"/>
              </div>
              <span class="field-error" *ngIf="f['email'].errors?.['required'] && f['email'].touched">Email is required.</span>
              <span class="field-error" *ngIf="f['email'].errors?.['email'] && f['email'].touched">Enter a valid email address.</span>
            </div>

            <!-- Phone (optional) -->
            <div class="field">
              <label class="label" for="reg-phone">Phone <span class="label-opt">(optional)</span></label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .92h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.74a16 16 0 006.12 6.12l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <input id="reg-phone" class="input" type="tel" formControlName="phoneNumber" placeholder="+1 555 000 0000" autocomplete="tel"/>
              </div>
            </div>

            <!-- Password -->
            <div class="field" [class.field--error]="f['password'].invalid && f['password'].touched">
              <label class="label" for="reg-password">Password</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="reg-password"
                  class="input input--pw"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="password"
                  placeholder="Min. 8 characters"
                  autocomplete="new-password"
                />
                <button type="button" class="pw-toggle" (click)="togglePassword()" [attr.aria-label]="showPassword ? 'Hide' : 'Show'">
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
              <!-- Strength bar -->
              <div class="strength-wrap" *ngIf="f['password'].value">
                <div class="strength-bar">
                  <div class="strength-seg" [style.background]="passwordStrength >= 1 ? strengthColor : '#e2e8f0'"></div>
                  <div class="strength-seg" [style.background]="passwordStrength >= 2 ? strengthColor : '#e2e8f0'"></div>
                  <div class="strength-seg" [style.background]="passwordStrength >= 3 ? strengthColor : '#e2e8f0'"></div>
                  <div class="strength-seg" [style.background]="passwordStrength >= 4 ? strengthColor : '#e2e8f0'"></div>
                </div>
                <span class="strength-label-text" [style.color]="strengthColor">{{ strengthLabel }}</span>
              </div>
              <span class="field-error" *ngIf="f['password'].errors?.['required'] && f['password'].touched">Password is required.</span>
              <span class="field-error" *ngIf="f['password'].errors?.['minlength'] && f['password'].touched">Minimum 8 characters.</span>
            </div>

            <!-- Confirm Password -->
            <div class="field" [class.field--error]="(f['confirmPassword'].invalid || registerForm.errors?.['passwordMismatch']) && f['confirmPassword'].touched">
              <label class="label" for="reg-confirm">Confirm password</label>
              <div class="input-wrap">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <input
                  id="reg-confirm"
                  class="input"
                  [type]="showPassword ? 'text' : 'password'"
                  formControlName="confirmPassword"
                  placeholder="Repeat your password"
                  autocomplete="new-password"
                />
              </div>
              <span class="field-error" *ngIf="f['confirmPassword'].errors?.['required'] && f['confirmPassword'].touched">Please confirm your password.</span>
              <span class="field-error" *ngIf="registerForm.errors?.['passwordMismatch'] && f['confirmPassword'].touched">Passwords do not match.</span>
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
              <span *ngIf="!isLoading">Create my account</span>
            </button>
          </form>

          <p class="switch-link">
            Already have an account?&nbsp;<a routerLink="/auth/login">Sign in</a>
          </p>
        </div>
      </main>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  UserRole = UserRole;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: [UserRole.Client, Validators.required]
    }, { validators: passwordMatchValidator });
  }

  get f() { return this.registerForm.controls; }

  setRole(role: UserRole): void {
    this.registerForm.patchValue({ role });
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }

  get passwordStrength(): number {
    const pw: string = this.f['password'].value ?? '';
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^a-zA-Z0-9]/.test(pw)) score++;
    return score;
  }

  get strengthLabel(): string {
    const s = this.passwordStrength;
    if (s <= 1) return 'Weak';
    if (s === 2) return 'Fair';
    if (s === 3) return 'Good';
    return 'Strong';
  }

  get strengthColor(): string {
    const s = this.passwordStrength;
    if (s <= 1) return '#ef4444';
    if (s === 2) return '#f97316';
    if (s === 3) return '#eab308';
    return '#22c55e';
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const { confirmPassword, ...payload } = this.registerForm.value;
    this.authService.register(payload).subscribe({
      next: (response) => {
        const role = response.user.role;
        if (role === UserRole.Client) this.router.navigate(['/client']);
        else if (role === UserRole.Counsellor) this.router.navigate(['/counsellor']);
      },
      error: (err) => {
        const apiError = err?.error;
        if (apiError?.errors) {
          const messages = Object.values(apiError.errors).flat();
          this.errorMessage = (messages as string[]).join(' ');
        } else {
          this.errorMessage = apiError?.message ?? 'Registration failed. Please try again.';
        }
        this.isLoading = false;
      }
    });
  }
}

