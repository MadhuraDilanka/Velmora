import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CounsellorService } from '../../../../core/services/counsellor.service';
import { CounsellorProfile } from '../../../../core/models/counsellor.model';
import { AvatarUrlPipe } from '../../../../shared/pipes/avatar-url.pipe';

const SPECIALTIES = ['Anxiety', 'Depression', 'Relationships', 'Trauma', 'Career', 'Grief', 'Stress', 'Addiction'];

@Component({
  selector: 'app-counsellors-page',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarUrlPipe],
  template: `
    <section class="page-hero">
      <div class="container">
        <h1>Browse Our Counsellors</h1>
        <p>Find a qualified counsellor who matches your needs and schedule your first session today.</p>
      </div>
    </section>

    <section class="page-content">
      <div class="container">
        <div class="filter-bar">
          <span class="filter-label">Filter by specialty:</span>
          <button class="filter-chip" [class.active]="activeFilter === ''" (click)="setFilter('')">All</button>
          <button *ngFor="let s of specialties" class="filter-chip" [class.active]="activeFilter === s" (click)="setFilter(s)">{{ s }}</button>
        </div>

        <!-- Loading skeleton -->
        <div *ngIf="isLoading" class="counsellors-grid">
          <div *ngFor="let i of [1,2,3,4,5,6]" class="placeholder-card">
            <div class="placeholder-card__avatar"></div>
            <div class="placeholder-card__body">
              <div class="placeholder-card__name"></div>
              <div class="placeholder-card__specialty"></div>
              <div class="placeholder-card__meta"></div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div *ngIf="!isLoading && filtered.length === 0" class="empty-state">
          <p class="empty-icon">🔍</p>
          <p>No counsellors found{{ activeFilter ? ' for "' + activeFilter + '"' : '' }}.</p>
        </div>

        <!-- Real counsellor cards -->
        <div *ngIf="!isLoading && filtered.length > 0" class="counsellors-grid">
          <div *ngFor="let c of filtered" class="counsellor-card">
            <div class="counsellor-card__top">
              <div class="counsellor-card__avatar" [style.background]="avatarColor(c.fullName)">
                <img *ngIf="c.profileImageUrl" [src]="c.profileImageUrl | avatarUrl" [alt]="c.fullName" class="avatar-img" />
                <span *ngIf="!c.profileImageUrl">{{ initials(c.fullName) }}</span>
              </div>
              <div *ngIf="c.isVerified" class="verified-badge" title="Verified Counsellor">✓</div>
            </div>
            <div class="counsellor-card__body">
              <h3 class="counsellor-card__name">{{ c.fullName }}</h3>
              <p class="counsellor-card__title">{{ c.professionalTitle ?? 'Counsellor' }}</p>
              <p *ngIf="c.specializations" class="counsellor-card__specialty">{{ c.specializations }}</p>
              <div class="counsellor-card__meta">
                <span *ngIf="c.yearsOfExperience" class="meta-chip">{{ c.yearsOfExperience }}y exp</span>
                <span *ngIf="c.sessionFee" class="meta-chip">\${{ c.sessionFee }}</span>
                <span *ngIf="c.averageRating > 0" class="meta-chip rating">★ {{ c.averageRating | number:'1.1-1' }} ({{ c.totalReviews }})</span>
              </div>
              <div class="counsellor-card__modes">
                <span *ngIf="c.isAvailableOnline" class="mode-tag online">Online</span>
                <span *ngIf="c.isAvailableInPerson" class="mode-tag inperson">In-Person</span>
              </div>
            </div>
            <a [routerLink]="['/counsellors', c.id]" class="counsellor-card__btn">View Profile</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      background: linear-gradient(135deg, #f0f9ff 0%, #e6f4f7 100%);
      padding: 72px 24px 48px;
      text-align: center;
      h1 { font-size: 40px; font-weight: 800; color: #1a2e3b; margin: 0 0 16px; }
      p  { font-size: 18px; color: #4a5568; max-width: 560px; margin: 0 auto; }
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    .page-content { padding: 48px 24px; }

    .filter-bar { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
    .filter-label { font-size: 14px; font-weight: 600; color: #4a5568; }
    .filter-chip {
      padding: 7px 18px; border-radius: 100px; border: 1.5px solid #e2e8f0;
      background: #fff; font-size: 13px; font-weight: 500; color: #4a5568; cursor: pointer; transition: all 0.2s;
      &.active, &:hover { border-color: #4A90A4; background: rgba(74,144,164,0.08); color: #4A90A4; }
    }

    .counsellors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }

    /* Real cards */
    .counsellor-card {
      background: #fff; border-radius: 16px; border: 1px solid #e2e8f0;
      padding: 24px; display: flex; flex-direction: column; gap: 12px;
      transition: box-shadow 0.2s;
      &:hover { box-shadow: 0 4px 20px rgba(74,144,164,0.12); }
    }
    .counsellor-card__top { position: relative; display: flex; align-items: flex-start; }
    .counsellor-card__avatar {
      width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 22px; font-weight: 700; color: #fff; overflow: hidden;
    }
    .avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
    .verified-badge {
      position: absolute; top: 0; left: 48px; width: 20px; height: 20px; border-radius: 50%;
      background: #38a169; color: #fff; font-size: 11px; font-weight: 700;
      display: flex; align-items: center; justify-content: center; border: 2px solid #fff;
    }
    .counsellor-card__body { flex: 1; display: flex; flex-direction: column; gap: 6px; }
    .counsellor-card__name { font-size: 17px; font-weight: 700; color: #1a2e3b; margin: 0; }
    .counsellor-card__title { font-size: 13px; color: #4A90A4; font-weight: 500; margin: 0; }
    .counsellor-card__specialty { font-size: 12px; color: #718096; margin: 0; }
    .counsellor-card__meta { display: flex; flex-wrap: wrap; gap: 6px; }
    .meta-chip {
      font-size: 12px; color: #4a5568; background: #f1f5f9;
      padding: 3px 10px; border-radius: 100px; font-weight: 500;
      &.rating { color: #d69e2e; background: rgba(214,158,46,0.1); }
    }
    .counsellor-card__modes { display: flex; gap: 6px; flex-wrap: wrap; }
    .mode-tag {
      font-size: 11px; padding: 3px 10px; border-radius: 100px; font-weight: 600;
      &.online   { background: rgba(56,161,105,0.1); color: #38a169; }
      &.inperson { background: rgba(74,144,164,0.1); color: #4A90A4; }
    }
    .counsellor-card__btn {
      display: block; text-align: center; padding: 10px; border-radius: 10px;
      background: rgba(74,144,164,0.08); color: #4A90A4; font-size: 14px; font-weight: 600;
      text-decoration: none; transition: background 0.2s;
      &:hover { background: rgba(74,144,164,0.16); }
    }

    /* Skeleton cards */
    .placeholder-card {
      background: #fff; border-radius: 16px; border: 1px solid #e2e8f0;
      padding: 24px; display: flex; flex-direction: column; gap: 16px;
      animation: shimmer 1.5s infinite;
    }
    .placeholder-card__avatar { width: 64px; height: 64px; border-radius: 50%; background: #e2e8f0; }
    .placeholder-card__body   { display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .placeholder-card__name    { height: 18px; width: 70%; background: #e2e8f0; border-radius: 6px; }
    .placeholder-card__specialty { height: 14px; width: 50%; background: #e2e8f0; border-radius: 6px; }
    .placeholder-card__meta    { height: 12px; width: 40%; background: #e2e8f0; border-radius: 6px; }

    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 48px 24px; text-align: center; color: #718096; }
    .empty-icon  { font-size: 40px; }

    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  `]
})
export class CounsellorsBrowseComponent implements OnInit {
  isLoading = true;
  counsellors: CounsellorProfile[] = [];
  activeFilter = '';
  readonly specialties = SPECIALTIES;

  constructor(private counsellorService: CounsellorService) {}

  ngOnInit(): void {
    this.counsellorService.getApprovedCounsellors().subscribe({
      next: (data) => { this.counsellors = data; this.isLoading = false; },
      error: ()     => { this.isLoading = false; },
    });
  }

  get filtered(): CounsellorProfile[] {
    if (!this.activeFilter) return this.counsellors;
    const f = this.activeFilter.toLowerCase();
    return this.counsellors.filter(c =>
      c.specializations?.toLowerCase().includes(f) ||
      c.professionalTitle?.toLowerCase().includes(f)
    );
  }

  setFilter(s: string): void { this.activeFilter = s; }

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
