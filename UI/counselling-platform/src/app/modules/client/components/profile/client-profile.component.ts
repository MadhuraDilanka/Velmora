import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-header">
      <h2>My Profile</h2>
      <p>Manage your personal information and account settings.</p>
    </div>

    <div class="content-grid">
      <div class="card profile-card">
        <div class="profile-avatar">C</div>
        <h3>Client Name</h3>
        <span class="role-badge">Client</span>
        <button class="change-photo-btn">Change Photo</button>
      </div>

      <div class="card form-card">
        <h3 class="card-title">Personal Information</h3>
        <form [formGroup]="form" class="profile-form">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" formControlName="firstName" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" formControlName="lastName" />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" />
          </div>
          <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" formControlName="phone" />
          </div>
          <button type="submit" class="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 28px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .content-grid { display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start; }
    .card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 28px; }
    .profile-card { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: #4A90A4; color: #fff; font-size: 32px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .profile-card h3 { font-size: 16px; font-weight: 700; color: #1a2e3b; margin: 0; }
    .role-badge { padding: 4px 14px; border-radius: 100px; background: rgba(74,144,164,0.1); color: #4A90A4; font-size: 12px; font-weight: 600; }
    .change-photo-btn { padding: 8px 20px; border: 1.5px solid #e2e8f0; border-radius: 100px; background: none; font-size: 13px; font-weight: 500; color: #4a5568; cursor: pointer; transition: border-color 0.2s; &:hover { border-color: #4A90A4; color: #4A90A4; } }
    .card-title { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0 0 24px; }
    .profile-form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 13px; font-weight: 600; color: #1a2e3b; }
      input { padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
    }
    .save-btn { align-self: flex-start; padding: 11px 28px; border: none; border-radius: 100px; background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; &:hover { background: #357a8e; } }
    @media (max-width: 640px) { .content-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
  `]
})
export class ClientProfileComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      phone:     [''],
    });
  }
}
