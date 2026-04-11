import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-counsellor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="detail-page">
      <div class="container">
        <a routerLink="/counsellors" class="back-link">← Back to Counsellors</a>

        <div class="profile-card">
          <div class="profile-card__avatar"></div>
          <div class="profile-card__info">
            <div class="profile-card__name"></div>
            <div class="profile-card__title"></div>
            <div class="profile-card__rating">
              <span class="stars">★★★★★</span>
              <span class="rating-text">4.9 · 120 sessions</span>
            </div>
            <div class="profile-card__tags">
              <span class="tag">Anxiety</span>
              <span class="tag">Depression</span>
              <span class="tag">Trauma</span>
            </div>
          </div>
          <a routerLink="/auth/register" class="book-btn">Book a Session</a>
        </div>

        <div class="detail-grid">
          <div class="detail-section">
            <h3>About</h3>
            <div class="skeleton-lines">
              <div class="line"></div><div class="line"></div>
              <div class="line short"></div>
            </div>
          </div>
          <div class="detail-section">
            <h3>Availability</h3>
            <div class="availability-placeholder">
              <div class="slot" *ngFor="let s of [1,2,3,4]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .detail-page { padding: 100px 24px 60px; }

    .container { max-width: 900px; margin: 0 auto; }

    .back-link {
      display: inline-block;
      margin-bottom: 24px;
      color: #4A90A4;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    .profile-card {
      background: #fff;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      padding: 32px;
      display: flex;
      align-items: flex-start;
      gap: 28px;
      margin-bottom: 32px;
      flex-wrap: wrap;

      &__avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #e2e8f0;
        flex-shrink: 0;
      }

      &__info { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 200px; }
      &__name { height: 24px; width: 60%; background: #e2e8f0; border-radius: 8px; }
      &__title { height: 16px; width: 45%; background: #e2e8f0; border-radius: 6px; }

      &__rating {
        display: flex;
        align-items: center;
        gap: 8px;
        .stars { color: #f6ad55; font-size: 16px; }
        .rating-text { font-size: 14px; color: #718096; }
      }

      &__tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
    }

    .tag {
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(74, 144, 164, 0.1);
      color: #4A90A4;
      font-size: 12px;
      font-weight: 600;
    }

    .book-btn {
      align-self: center;
      padding: 12px 28px;
      border-radius: 100px;
      background: #4A90A4;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s, transform 0.2s;
      white-space: nowrap;

      &:hover { background: #357a8e; transform: translateY(-1px); }
    }

    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .detail-section {
      background: #fff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      padding: 24px;

      h3 {
        font-size: 16px;
        font-weight: 700;
        color: #1a2e3b;
        margin: 0 0 16px;
      }
    }

    .skeleton-lines {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .line {
        height: 14px;
        background: #e2e8f0;
        border-radius: 6px;
        &.short { width: 60%; }
      }
    }

    .availability-placeholder {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;

      .slot {
        height: 40px;
        background: #e2e8f0;
        border-radius: 10px;
      }
    }

    @media (max-width: 640px) {
      .detail-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CounsellorDetailComponent {}
