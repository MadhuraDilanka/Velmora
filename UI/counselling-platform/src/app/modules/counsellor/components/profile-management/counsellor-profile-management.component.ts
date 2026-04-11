import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CounsellorService } from '../../../../core/services/counsellor.service';
import { AvatarUploadComponent } from '../../../../shared/components/avatar-upload/avatar-upload.component';
import { CounsellorProfile } from '../../../../core/models/counsellor.model';

@Component({
  selector: 'app-counsellor-profile-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarUploadComponent],
  template: `
    <div class="page-header">
      <h2>Profile Management</h2>
      <p>Update your professional profile visible to clients.</p>
    </div>

    <div *ngIf="isLoading" class="content-grid">
      <div class="card profile-card skeleton">
        <div class="sk-avatar"></div>
        <div class="sk-line w60"></div>
        <div class="sk-line w40"></div>
      </div>
      <div class="card loading-card">
        <div *ngFor="let i of [1,2,3,4]" class="sk-field"></div>
      </div>
    </div>

    <div *ngIf="!isLoading" class="content-grid">
      <!-- Left: avatar card -->
      <div class="card profile-card">
        <app-avatar-upload
          [avatarUrl]="profile?.profileImageUrl"
          [displayName]="profile?.fullName ?? 'Counsellor'"
          roleName="Counsellor"
          (uploaded)="onAvatarUploaded($event)">
        </app-avatar-upload>
      </div>

      <!-- Right: form -->
      <div class="card form-card">
        <h3 class="card-title">Professional Information</h3>

      <div *ngIf="successMsg" class="alert alert--success">{{ successMsg }}</div>
      <div *ngIf="errorMsg"   class="alert alert--error">{{ errorMsg }}</div>

      <form [formGroup]="form" (ngSubmit)="save()" class="profile-form">
        <div class="form-group">
          <label>Professional Title</label>
          <input type="text" formControlName="professionalTitle" placeholder="Licensed Clinical Psychologist" />
        </div>
        <div class="form-group">
          <label>Specializations <span class="hint">(comma-separated)</span></label>
          <input type="text" formControlName="specializations" placeholder="Anxiety, Depression, Trauma" />
        </div>
        <div class="form-group">
          <label>Bio</label>
          <textarea formControlName="bio" rows="5" placeholder="Tell clients about your background and approach..."></textarea>
        </div>
        <div class="form-group">
          <label>Qualifications <span class="hint">(comma-separated)</span></label>
          <input type="text" formControlName="qualifications" placeholder="MSc Psychology, CBT Certified" />
        </div>
        <div class="form-group">
          <label>Languages Spoken <span class="hint">(comma-separated)</span></label>
          <input type="text" formControlName="languages" placeholder="English, French" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Years of Experience</label>
            <input type="number" formControlName="yearsOfExperience" placeholder="5" min="0" />
          </div>
          <div class="form-group">
            <label>Session Fee (USD)</label>
            <input type="number" formControlName="sessionFee" placeholder="80" min="0" />
          </div>
          <div class="form-group">
            <label>Session Duration (min)</label>
            <input type="number" formControlName="sessionDurationMinutes" placeholder="50" min="15" />
          </div>
        </div>
        <div class="form-row">
          <label class="checkbox-label">
            <input type="checkbox" formControlName="isAvailableOnline" />
            Available Online
          </label>
          <label class="checkbox-label">
            <input type="checkbox" formControlName="isAvailableInPerson" />
            Available In-Person
          </label>
          <label class="checkbox-label">
            <input type="checkbox" formControlName="isAvailable" />
            Currently Accepting Clients
          </label>
        </div>
        <div class="form-group">
          <label>LinkedIn URL</label>
          <input type="url" formControlName="linkedInUrl" placeholder="https://linkedin.com/in/your-profile" />
        </div>
        <button type="submit" class="save-btn" [disabled]="isSaving">
          {{ isSaving ? 'Saving…' : 'Save Profile' }}
        </button>
      </form>
    </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .content-grid { display: grid; grid-template-columns: 240px 1fr; gap: 24px; align-items: start; }
    .profile-card { display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; }
    .form-card { }
    .card-title { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0 0 24px; }
    .hint { font-size: 12px; font-weight: 400; color: #718096; margin-left: 4px; }
    .profile-form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; align-items: end; }
    .form-group { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 13px; font-weight: 600; color: #1a2e3b; }
      input, textarea { padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; resize: vertical; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
    }
    .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 500; color: #2d3748; cursor: pointer;
      input[type="checkbox"] { width: 16px; height: 16px; accent-color: #4A90A4; cursor: pointer; }
    }
    .save-btn { align-self: flex-start; padding: 11px 28px; border: none; border-radius: 100px; background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;
      &:hover:not(:disabled) { background: #357a8e; }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }
    .alert { padding: 12px 16px; border-radius: 10px; font-size: 14px; font-weight: 500; margin-bottom: 4px;
      &--success { background: rgba(56,161,105,0.1); color: #276749; }
      &--error   { background: rgba(229,62,62,0.1); color: #c53030; }
    }
    /* Loading skeleton */
    .loading-card { padding: 28px; display: flex; flex-direction: column; gap: 18px; }
    .sk-avatar { width: 80px; height: 80px; border-radius: 50%; background: #e2e8f0; animation: shimmer 1.5s infinite; }
    .sk-line { height: 14px; background: #e2e8f0; border-radius: 6px; margin-bottom: 8px; animation: shimmer 1.5s infinite; &.w60 { width: 60%; } &.w40 { width: 40%; } }
    .sk-field { height: 48px; background: #e2e8f0; border-radius: 10px; animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @media (max-width: 700px) { .content-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
  `]
})
export class CounsellorProfileManagementComponent implements OnInit {
  form: FormGroup;
  isLoading = true;
  isSaving = false;
  successMsg = '';
  errorMsg = '';
  profile: CounsellorProfile | null = null;

  constructor(
    private fb: FormBuilder,
    private counsellorService: CounsellorService,
  ) {
    this.form = this.fb.group({
      professionalTitle:      [''],
      specializations:        [''],
      bio:                    [''],
      qualifications:         [''],
      languages:              [''],
      yearsOfExperience:      [0, [Validators.min(0)]],
      sessionFee:             [0, [Validators.required, Validators.min(0)]],
      sessionDurationMinutes: [50, [Validators.required, Validators.min(15)]],
      isAvailableOnline:      [false],
      isAvailableInPerson:    [false],
      isAvailable:            [true],
      linkedInUrl:            [''],
    });
  }

  ngOnInit(): void {
    this.counsellorService.getMyProfile().subscribe({
      next: (p) => {
        this.profile = p;
        this.form.patchValue({
          professionalTitle:      p.professionalTitle ?? '',
          specializations:        p.specializations ?? '',
          bio:                    p.bio ?? '',
          qualifications:         p.qualifications ?? '',
          languages:              p.languages ?? '',
          yearsOfExperience:      p.yearsOfExperience,
          sessionFee:             p.sessionFee,
          sessionDurationMinutes: p.sessionDurationMinutes,
          isAvailableOnline:      p.isAvailableOnline,
          isAvailableInPerson:    p.isAvailableInPerson,
          isAvailable:            p.isAvailable,
          linkedInUrl:            p.linkedInUrl ?? '',
        });
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.isSaving = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.counsellorService.upsertMyProfile(this.form.value).subscribe({
      next: () => {
        this.successMsg = 'Profile saved successfully.';
        this.isSaving = false;
      },
      error: () => {
        this.errorMsg = 'Failed to save profile. Please try again.';
        this.isSaving = false;
      },
    });
  }

  onAvatarUploaded(url: string): void {
    if (this.profile) this.profile = { ...this.profile, profileImageUrl: url };
  }
}
