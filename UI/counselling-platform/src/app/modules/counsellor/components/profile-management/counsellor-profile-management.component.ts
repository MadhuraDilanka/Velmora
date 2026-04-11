import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-counsellor-profile-management',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="page-header">
      <h2>Profile Management</h2>
      <p>Update your professional profile visible to clients.</p>
    </div>

    <div class="card">
      <h3 class="card-title">Professional Information</h3>
      <form [formGroup]="form" class="profile-form">
        <div class="form-group">
          <label>Display Name</label>
          <input type="text" formControlName="displayName" placeholder="Dr. Jane Smith" />
        </div>
        <div class="form-group">
          <label>Professional Title</label>
          <input type="text" formControlName="title" placeholder="Licensed Clinical Psychologist" />
        </div>
        <div class="form-group">
          <label>Specializations</label>
          <input type="text" formControlName="specializations" placeholder="Anxiety, Depression, Trauma..." />
        </div>
        <div class="form-group">
          <label>Bio</label>
          <textarea formControlName="bio" rows="5" placeholder="Tell clients about your background and approach..."></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Years of Experience</label>
            <input type="number" formControlName="experience" placeholder="5" />
          </div>
          <div class="form-group">
            <label>Session Rate (USD)</label>
            <input type="number" formControlName="rate" placeholder="80" />
          </div>
        </div>
        <button type="submit" class="save-btn">Save Profile</button>
      </form>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; max-width: 700px; }
    .card-title { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0 0 24px; }
    .profile-form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 13px; font-weight: 600; color: #1a2e3b; }
      input, textarea { padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; resize: vertical; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
    }
    .save-btn { align-self: flex-start; padding: 11px 28px; border: none; border-radius: 100px; background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; &:hover { background: #357a8e; } }
    @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }
  `]
})
export class CounsellorProfileManagementComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      displayName:     ['', Validators.required],
      title:           ['', Validators.required],
      specializations: [''],
      bio:             [''],
      experience:      [null],
      rate:            [null],
    });
  }
}
