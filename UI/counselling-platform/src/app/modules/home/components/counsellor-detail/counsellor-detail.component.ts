import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CounsellorService } from '../../../../core/services/counsellor.service';
import { CounsellorProfile } from '../../../../core/models/counsellor.model';

@Component({
  selector: 'app-counsellor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="detail-page">
      <div class="container">
        <a routerLink="/counsellors" class="back-link">← Back to Counsellors</a>

        <!-- Loading -->
        <div *ngIf="isLoading" class="profile-card skeleton">
          <div class="profile-card__avatar skeleton-box"></div>
          <div class="profile-card__info">
            <div class="skeleton-line w60"></div>
            <div class="skeleton-line w40"></div>
            <div class="skeleton-line w30"></div>
          </div>
        </div>

        <!-- Error -->
        <div *ngIf="!isLoading && !counsellor" class="error-state">
          <p class="error-icon">❌</p>
          <h3>Counsellor not found</h3>
          <a routerLink="/counsellors" class="back-link-btn">Browse All Counsellors</a>
        </div>

        <!-- Real profile -->
        <ng-container *ngIf="!isLoading && counsellor">
          <div class="profile-card">
            <div class="profile-card__avatar-wrap">
              <div class="profile-card__avatar" [style.background]="avatarColor(counsellor.fullName)">
                <img *ngIf="counsellor.profileImageUrl" [src]="counsellor.profileImageUrl" [alt]="counsellor.fullName" class="avatar-img" />
                <span *ngIf="!counsellor.profileImageUrl">{{ initials(counsellor.fullName) }}</span>
              </div>
              <div *ngIf="counsellor.isVerified" class="verified-badge" title="Verified">✓ Verified</div>
            </div>
            <div class="profile-card__info">
              <h1 class="profile-card__name">{{ counsellor.fullName }}</h1>
              <p class="profile-card__title">{{ counsellor.professionalTitle ?? 'Counsellor' }}</p>
              <div class="profile-card__rating" *ngIf="counsellor.averageRating > 0">
                <span class="stars">{{ starsFor(counsellor.averageRating) }}</span>
                <span class="rating-text">{{ counsellor.averageRating | number:'1.1-1' }} · {{ counsellor.totalReviews }} reviews</span>
              </div>
              <div *ngIf="counsellor.specializations" class="profile-card__tags">
                <span *ngFor="let tag of tagList(counsellor.specializations)" class="tag">{{ tag }}</span>
              </div>
              <div class="profile-card__modes">
                <span *ngIf="counsellor.isAvailableOnline" class="mode-tag online">Online</span>
                <span *ngIf="counsellor.isAvailableInPerson" class="mode-tag inperson">In-Person</span>
              </div>
            </div>
            <div class="profile-card__cta">
              <div class="fee-display">\${{ counsellor.sessionFee }} / session</div>
              <a routerLink="/auth/register" class="book-btn">Book a Session</a>
            </div>
          </div>

          <div class="detail-grid">
            <div class="detail-section">
              <h3>About</h3>
              <p *ngIf="counsellor.bio; else noBio" class="bio-text">{{ counsellor.bio }}</p>
              <ng-template #noBio><p class="placeholder-text">No bio provided.</p></ng-template>

              <div class="info-list" *ngIf="counsellor.yearsOfExperience || counsellor.languages || counsellor.qualifications">
                <div *ngIf="counsellor.yearsOfExperience" class="info-item">
                  <span class="info-label">Experience</span>
                  <span class="info-value">{{ counsellor.yearsOfExperience }} year{{ counsellor.yearsOfExperience !== 1 ? 's' : '' }}</span>
                </div>
                <div *ngIf="counsellor.languages" class="info-item">
                  <span class="info-label">Languages</span>
                  <span class="info-value">{{ counsellor.languages }}</span>
                </div>
                <div *ngIf="counsellor.qualifications" class="info-item">
                  <span class="info-label">Qualifications</span>
                  <span class="info-value">{{ counsellor.qualifications }}</span>
                </div>
                <div *ngIf="counsellor.sessionDurationMinutes" class="info-item">
                  <span class="info-label">Session Duration</span>
                  <span class="info-value">{{ counsellor.sessionDurationMinutes }} minutes</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3>Session Info</h3>
              <div class="session-info">
                <div class="session-stat">
                  <span class="stat-val">\${{ counsellor.sessionFee }}</span>
                  <span class="stat-label">Per Session</span>
                </div>
                <div class="session-stat">
                  <span class="stat-val">{{ counsellor.sessionDurationMinutes }}m</span>
                  <span class="stat-label">Duration</span>
                </div>
                <div *ngIf="counsellor.averageRating" class="session-stat">
                  <span class="stat-val">{{ counsellor.averageRating | number:'1.1-1' }}</span>
                  <span class="stat-label">Avg Rating</span>
                </div>
              </div>
              <a *ngIf="counsellor.linkedInUrl" [href]="counsellor.linkedInUrl" target="_blank" rel="noopener noreferrer" class="linkedin-link">View LinkedIn Profile →</a>
            </div>
          </div>
        </ng-container>
      </div>
    </section>
  `,
  styles: [`
    .detail-page { padding: 100px 24px 60px; }
    .container { max-width: 900px; margin: 0 auto; }

    .back-link {
      display: inline-block; margin-bottom: 24px; color: #4A90A4; font-size: 14px; font-weight: 500;
      text-decoration: none; &:hover { text-decoration: underline; }
    }

    .profile-card {
      background: #fff; border-radius: 20px; border: 1px solid #e2e8f0;
      padding: 32px; display: flex; align-items: flex-start; gap: 28px;
      margin-bottom: 32px; flex-wrap: wrap;
    }
    .profile-card__avatar-wrap { position: relative; flex-shrink: 0; }
    .profile-card__avatar {
      width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 36px; font-weight: 700; color: #fff; overflow: hidden;
    }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
    .verified-badge {
      margin-top: 8px; text-align: center; background: #38a169; color: #fff;
      font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 100px;
    }
    .profile-card__info { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 200px; }
    .profile-card__name { font-size: 24px; font-weight: 800; color: #1a2e3b; margin: 0; }
    .profile-card__title { font-size: 15px; color: #4A90A4; font-weight: 500; margin: 0; }
    .profile-card__rating { display: flex; align-items: center; gap: 8px; }
    .stars { color: #f6ad55; font-size: 16px; }
    .rating-text { font-size: 14px; color: #718096; }
    .profile-card__tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .tag { padding: 4px 12px; border-radius: 100px; background: rgba(74,144,164,0.1); color: #4A90A4; font-size: 12px; font-weight: 600; }
    .profile-card__modes { display: flex; gap: 6px; }
    .mode-tag { font-size: 12px; padding: 3px 10px; border-radius: 100px; font-weight: 600; }
    .mode-tag.online   { background: rgba(56,161,105,0.1); color: #38a169; }
    .mode-tag.inperson { background: rgba(74,144,164,0.1); color: #4A90A4; }
    .profile-card__cta { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
    .fee-display { font-size: 18px; font-weight: 700; color: #1a2e3b; }
    .book-btn {
      padding: 12px 28px; border-radius: 100px; background: #4A90A4; color: #fff;
      font-size: 15px; font-weight: 600; text-decoration: none; transition: background 0.2s;
      &:hover { background: #357a8e; }
    }

    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .detail-section { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; }
    .detail-section h3 { font-size: 16px; font-weight: 700; color: #1a2e3b; margin: 0 0 16px; }
    .bio-text { font-size: 14px; color: #4a5568; line-height: 1.7; margin: 0; }
    .placeholder-text { font-size: 14px; color: #a0aec0; font-style: italic; margin: 0; }

    .info-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
    .info-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
    .info-label { font-size: 13px; font-weight: 600; color: #718096; }
    .info-value { font-size: 13px; color: #1a2e3b; font-weight: 500; }

    .session-info { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .session-stat { text-align: center; padding: 16px; background: #f8fafc; border-radius: 12px; }
    .stat-val   { display: block; font-size: 22px; font-weight: 800; color: #1a2e3b; }
    .stat-label { display: block; font-size: 12px; color: #718096; margin-top: 4px; }
    .linkedin-link { display: inline-block; margin-top: 16px; color: #4A90A4; font-size: 14px; font-weight: 500; text-decoration: none; &:hover { text-decoration: underline; } }

    /* Skeletons */
    .skeleton-box { width: 100px; height: 100px; border-radius: 50%; background: #e2e8f0; }
    .skeleton-line { height: 16px; background: #e2e8f0; border-radius: 6px; margin-bottom: 10px; &.w60 { width: 60%; } &.w40 { width: 40%; } &.w30 { width: 30%; } }

    /* Error state */
    .error-state { text-align: center; padding: 60px 24px; }
    .error-icon { font-size: 48px; margin-bottom: 12px; }
    .error-state h3 { font-size: 20px; color: #1a2e3b; font-weight: 700; }
    .back-link-btn {
      display: inline-block; margin-top: 16px; padding: 10px 24px; border-radius: 100px;
      background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none;
    }

    @media (max-width: 640px) { .detail-grid { grid-template-columns: 1fr; } .session-info { grid-template-columns: 1fr 1fr; } }
  `]
})
export class CounsellorDetailComponent implements OnInit {
  isLoading = true;
  counsellor: CounsellorProfile | null = null;

  constructor(
    private route: ActivatedRoute,
    private counsellorService: CounsellorService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.isLoading = false; return; }
    this.counsellorService.getCounsellorById(id).subscribe({
      next: (data) => { this.counsellor = data; this.isLoading = false; },
      error: ()     => { this.counsellor = null; this.isLoading = false; },
    });
  }

  tagList(specializations: string): string[] {
    return specializations.split(',').map(s => s.trim()).filter(Boolean);
  }

  starsFor(rating: number): string {
    const full = Math.round(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
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
