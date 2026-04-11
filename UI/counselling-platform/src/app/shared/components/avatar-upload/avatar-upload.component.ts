import {
  Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService } from '../../../core/services/upload.service';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { AvatarUrlPipe } from '../../pipes/avatar-url.pipe';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [CommonModule, AvatarUrlPipe],
  template: `
    <div class="avatar-wrap">
      <!-- Avatar image or initials fallback -->
      <div class="avatar-ring" (click)="triggerPicker()" [class.uploading]="isUploading" title="Change profile picture">
        <img *ngIf="avatarUrl && !imgError"
             [src]="avatarUrl | avatarUrl"
             class="avatar-img"
             alt="Profile picture"
             (error)="onImgError()" />
        <div *ngIf="!avatarUrl || imgError" class="avatar-initials" [style.background]="bgColor">{{ initials }}</div>

        <!-- Hover overlay -->
        <div class="avatar-overlay">
          <span *ngIf="!isUploading" class="overlay-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </span>
          <span *ngIf="isUploading" class="spinner"></span>
        </div>
      </div>

      <!-- Hidden file input -->
      <input #fileInput
             type="file"
             accept="image/jpeg,image/png,image/webp"
             style="display:none"
             (change)="onFileSelected($event)" />

      <!-- Display name & role under avatar -->
      <h3 class="avatar-name">{{ displayName }}</h3>
      <span class="avatar-role">{{ roleName }}</span>

      <!-- Inline error -->
      <p *ngIf="errorMsg" class="avatar-error">{{ errorMsg }}</p>
    </div>
  `,
  styles: [`
    .avatar-wrap {
      display: flex; flex-direction: column; align-items: center; gap: 10px;
    }
    .avatar-ring {
      position: relative; width: 100px; height: 100px; border-radius: 50%;
      cursor: pointer; overflow: hidden;
      border: 3px solid #e2e8f0;
      transition: border-color 0.2s, transform 0.15s;
      &:hover { border-color: #4A90A4; transform: scale(1.03); }
      &.uploading { pointer-events: none; opacity: 0.7; }
    }
    .avatar-img {
      width: 100%; height: 100%; object-fit: cover; display: block;
    }
    .avatar-initials {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
      font-size: 32px; font-weight: 700; color: #fff; letter-spacing: 1px;
    }
    .avatar-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.35);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.2s;
      border-radius: 50%;
      .avatar-ring:hover & { opacity: 1; }
    }
    .overlay-icon svg {
      width: 28px; height: 28px; color: #fff; stroke: #fff;
    }
    .spinner {
      width: 26px; height: 26px; border: 3px solid rgba(255,255,255,0.3);
      border-top-color: #fff; border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .avatar-name {
      font-size: 16px; font-weight: 700; color: #1a2e3b; margin: 0; text-align: center;
    }
    .avatar-role {
      padding: 3px 14px; border-radius: 100px; background: rgba(74,144,164,0.1);
      color: #4A90A4; font-size: 12px; font-weight: 600;
    }
    .avatar-error {
      font-size: 12px; color: #e53e3e; margin: 0; text-align: center;
    }
  `]
})
export class AvatarUploadComponent implements OnChanges {
  /** Current avatar URL (relative from API or absolute). If empty, initials are shown. */
  @Input() avatarUrl: string | null | undefined = null;
  @Input() displayName  = '';
  @Input() roleName     = '';
  /** Emits the new relative URL after a successful upload. */
  @Output() uploaded = new EventEmitter<string>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isUploading = false;
  errorMsg    = '';
  imgError    = false;

  private readonly apiBase = '';

  constructor(
    private uploadService: UploadService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['avatarUrl']) this.imgError = false;
  }

  get resolvedUrl(): string | null { return null; } // kept for compat, not used in template

  get initials(): string {
    if (!this.displayName) return '?';
    return this.displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');
  }

  get bgColor(): string {
    const colors = ['#6C63FF','#4A90A4','#38A169','#D69E2E','#E53E3E','#805AD5','#DD6B20'];
    let hash = 0;
    for (const c of this.displayName) hash = c.charCodeAt(0) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  }

  triggerPicker(): void {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    // Client-side validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMsg = 'Only JPG, PNG or WebP images are allowed.';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.errorMsg = 'Image must be smaller than 5 MB.';
      return;
    }

    this.errorMsg    = '';
    this.isUploading = true;

    this.uploadService.uploadAvatar(file).subscribe({
      next: (res) => {
        this.avatarUrl   = res.avatarUrl;
        this.imgError    = false;
        this.authService.updateCurrentUserAvatar(res.avatarUrl);
        this.uploaded.emit(res.avatarUrl);
        this.isUploading = false;
      },
      error: (err) => {
        this.errorMsg    = err?.error?.message ?? 'Upload failed. Please try again.';
        this.isUploading = false;
      }
    });
  }

  onImgError(): void {
    this.imgError = true;
  }
}
