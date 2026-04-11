import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarUploadComponent } from '../../../../shared/components/avatar-upload/avatar-upload.component';
import { AuthService } from '../../../auth/services/auth.service';
import { UserDto } from '../../../auth/models/auth.model';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, AvatarUploadComponent],
  template: `
    <div class="page-header">
      <h2>Account Settings</h2>
      <p>Manage your admin profile and platform preferences.</p>
    </div>

    <div class="content-grid">
      <!-- Profile picture card -->
      <div class="card profile-card">
        <app-avatar-upload
          [avatarUrl]="user?.profilePictureUrl"
          [displayName]="user?.fullName ?? 'Admin'"
          roleName="Administrator"
          (uploaded)="onAvatarUploaded($event)">
        </app-avatar-upload>
        <p class="email-text">{{ user?.email }}</p>
      </div>

      <!-- Info card (placeholder for future settings) -->
      <div class="card info-card">
        <h3 class="card-title">Profile Picture</h3>
        <p class="info-text">
          Click your avatar on the left to upload a new profile picture.
          Accepted formats: JPG, PNG, WebP &mdash; max 5 MB.
        </p>

        <div class="divider"></div>

        <h3 class="card-title">Platform Settings</h3>
        <p class="info-text coming-soon">
          Platform-wide configuration (fees, categories, notifications) is coming soon.
        </p>
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
    .profile-card { display: flex; flex-direction: column; align-items: center; gap: 10px; }
    .email-text { font-size: 13px; color: #718096; margin: 0; text-align: center; word-break: break-all; }
    .card-title { font-size: 16px; font-weight: 700; color: #1a2e3b; margin: 0 0 10px; }
    .info-text { font-size: 14px; color: #4a5568; margin: 0; line-height: 1.6; }
    .coming-soon { color: #a0aec0; font-style: italic; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
    @media (max-width: 700px) { .content-grid { grid-template-columns: 1fr; } }
  `]
})
export class AdminSettingsComponent implements OnInit {
  user: UserDto | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  onAvatarUploaded(url: string): void {
    if (this.user) this.user = { ...this.user, profilePictureUrl: url };
  }
}

