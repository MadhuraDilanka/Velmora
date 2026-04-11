import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../core/services/client.service';
import { ClientProfile } from '../../../../core/models/client-profile.model';
import { AvatarUploadComponent } from '../../../../shared/components/avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AvatarUploadComponent],
  template: `
    <div class="page-header">
      <h2>My Profile</h2>
      <p>Manage your personal information and account settings.</p>
    </div>

    <div *ngIf="isLoading" class="content-grid">
      <div class="card profile-card skeleton">
        <div class="sk-avatar"></div>
        <div class="sk-line w60"></div>
        <div class="sk-line w40"></div>
      </div>      <div class="card loading-card">
        <div *ngFor="let i of [1,2,3,4]" class="sk-field"></div>
      </div>
    </div>

    <div *ngIf="!isLoading" class="content-grid">
      <!-- Left: avatar card -->
      <div class="card profile-card">
        <app-avatar-upload
          [avatarUrl]="profile?.profileImageUrl"
          [displayName]="profile?.fullName ?? 'Client'"
          roleName="Client"
          (uploaded)="onAvatarUploaded($event)">
        </app-avatar-upload>
      </div>

      <!-- Right: form -->
      <div class="card form-card">
        <h3 class="card-title">Personal Information</h3>

        <div *ngIf="successMsg" class="alert alert--success">{{ successMsg }}</div>
        <div *ngIf="errorMsg"   class="alert alert--error">{{ errorMsg }}</div>

        <form [formGroup]="form" (ngSubmit)="save()" class="profile-form">
          <div class="form-row">
            <div class="form-group">
              <label>Date of Birth</label>
              <input type="date" formControlName="dateOfBirth" />
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select formControlName="gender">
                <option value="">Select…</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Nationality</label>
              <input type="text" formControlName="nationality" placeholder="e.g. Nigerian" />
            </div>
            <div class="form-group">
              <label>Occupation</label>
              <input type="text" formControlName="occupation" placeholder="e.g. Software Engineer" />
            </div>
          </div>
          <div class="form-group">
            <label>Address Line 1</label>
            <input type="text" formControlName="addressLine1" placeholder="123 Main Street" />
          </div>
          <div class="form-group">
            <label>Address Line 2</label>
            <input type="text" formControlName="addressLine2" placeholder="Apartment, suite, etc." />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>City</label>
              <input type="text" formControlName="city" />
            </div>
            <div class="form-group">
              <label>State / Region</label>
              <input type="text" formControlName="state" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Country</label>
              <input type="text" formControlName="country" />
            </div>
            <div class="form-group">
              <label>Postal Code</label>
              <input type="text" formControlName="postalCode" />
            </div>
          </div>

          <h4 class="section-heading">Emergency Contact</h4>
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <input type="text" formControlName="emergencyContactName" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" formControlName="emergencyContactPhone" />
            </div>
          </div>
          <div class="form-group">
            <label>Relationship</label>
            <input type="text" formControlName="emergencyContactRelationship" placeholder="e.g. Spouse, Parent" />
          </div>

          <div class="form-group">
            <label>Preferred Language</label>
            <input type="text" formControlName="preferredLanguage" placeholder="English" />
          </div>

          <button type="submit" class="save-btn" [disabled]="isSaving">
            {{ isSaving ? 'Saving…' : 'Save Changes' }}
          </button>
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
    .profile-avatar { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: #fff; }
    .profile-card h3 { font-size: 16px; font-weight: 700; color: #1a2e3b; margin: 0; text-align: center; }
    .role-badge { padding: 4px 14px; border-radius: 100px; background: rgba(74,144,164,0.1); color: #4A90A4; font-size: 12px; font-weight: 600; }
    .card-title { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0 0 24px; }
    .section-heading { font-size: 14px; font-weight: 700; color: #4a5568; margin: 8px 0 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    .profile-form { display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 13px; font-weight: 600; color: #1a2e3b; }
      input, select { padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; background: #fff;
        &:focus { border-color: #4A90A4; }
      }
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
    .sk-avatar { width: 80px; height: 80px; border-radius: 50%; background: #e2e8f0; animation: shimmer 1.5s infinite; }
    .sk-line { height: 14px; background: #e2e8f0; border-radius: 6px; margin-bottom: 8px; animation: shimmer 1.5s infinite; &.w60 { width: 60%; } &.w40 { width: 40%; } }
    .loading-card { display: flex; flex-direction: column; gap: 16px; }
    .sk-field { height: 48px; background: #e2e8f0; border-radius: 10px; animation: shimmer 1.5s infinite; }
    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @media (max-width: 700px) { .content-grid { grid-template-columns: 1fr; } .form-row { grid-template-columns: 1fr; } }
  `]
})
export class ClientProfileComponent implements OnInit {
  form: FormGroup;
  isLoading = true;
  isSaving = false;
  successMsg = '';
  errorMsg = '';
  profile: ClientProfile | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
  ) {
    this.form = this.fb.group({
      dateOfBirth:                    [''],
      gender:                         [''],
      nationality:                    [''],
      occupation:                     [''],
      addressLine1:                   [''],
      addressLine2:                   [''],
      city:                           [''],
      state:                          [''],
      country:                        [''],
      postalCode:                     [''],
      emergencyContactName:           [''],
      emergencyContactPhone:          [''],
      emergencyContactRelationship:   [''],
      preferredLanguage:              [''],
    });
  }

  ngOnInit(): void {
    this.clientService.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.form.patchValue({
          dateOfBirth:                  data.dateOfBirth ?? '',
          gender:                       data.gender ?? '',
          nationality:                  data.nationality ?? '',
          occupation:                   data.occupation ?? '',
          addressLine1:                 data.addressLine1 ?? '',
          addressLine2:                 data.addressLine2 ?? '',
          city:                         data.city ?? '',
          state:                        data.state ?? '',
          country:                      data.country ?? '',
          postalCode:                   data.postalCode ?? '',
          emergencyContactName:         data.emergencyContactName ?? '',
          emergencyContactPhone:        data.emergencyContactPhone ?? '',
          emergencyContactRelationship: data.emergencyContactRelationship ?? '',
          preferredLanguage:            data.preferredLanguage ?? '',
        });
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  save(): void {
    this.isSaving = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.clientService.updateMyProfile(this.form.value).subscribe({
      next: (data) => {
        this.profile = data;
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

  initials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  avatarColor(name: string): string {
    const colors = ['#4A90A4', '#38a169', '#805ad5', '#dd6b20', '#e53e3e', '#d69e2e'];
    let h = 0;
    for (let i = 0; i < name.length; i++) { h = name.charCodeAt(i) + ((h << 5) - h); }
    return colors[Math.abs(h) % colors.length];
  }
}
