import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-counsellors-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
          <button class="filter-chip active">All</button>
          <button class="filter-chip">Anxiety</button>
          <button class="filter-chip">Depression</button>
          <button class="filter-chip">Relationships</button>
          <button class="filter-chip">Trauma</button>
          <button class="filter-chip">Career</button>
        </div>

        <div class="placeholder-grid">
          <div class="placeholder-card" *ngFor="let i of [1,2,3,4,5,6]">
            <div class="placeholder-card__avatar"></div>
            <div class="placeholder-card__body">
              <div class="placeholder-card__name"></div>
              <div class="placeholder-card__specialty"></div>
              <div class="placeholder-card__meta"></div>
            </div>
            <a routerLink="/counsellors/1" class="placeholder-card__btn">View Profile</a>
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

      h1 {
        font-size: 40px;
        font-weight: 800;
        color: #1a2e3b;
        margin: 0 0 16px;
      }

      p {
        font-size: 18px;
        color: #4a5568;
        max-width: 560px;
        margin: 0 auto;
      }
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    .page-content { padding: 48px 24px; }

    .filter-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 32px;
    }

    .filter-label {
      font-size: 14px;
      font-weight: 600;
      color: #4a5568;
    }

    .filter-chip {
      padding: 7px 18px;
      border-radius: 100px;
      border: 1.5px solid #e2e8f0;
      background: #fff;
      font-size: 13px;
      font-weight: 500;
      color: #4a5568;
      cursor: pointer;
      transition: all 0.2s;

      &.active, &:hover {
        border-color: #4A90A4;
        background: rgba(74,144,164,0.08);
        color: #4A90A4;
      }
    }

    .placeholder-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .placeholder-card {
      background: #fff;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      animation: shimmer 1.5s infinite;

      &__avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #e2e8f0;
      }

      &__body { display: flex; flex-direction: column; gap: 8px; flex: 1; }
      &__name { height: 18px; width: 70%; background: #e2e8f0; border-radius: 6px; }
      &__specialty { height: 14px; width: 50%; background: #e2e8f0; border-radius: 6px; }
      &__meta { height: 12px; width: 40%; background: #e2e8f0; border-radius: 6px; }

      &__btn {
        display: block;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
        background: rgba(74, 144, 164, 0.08);
        color: #4A90A4;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;

        &:hover { background: rgba(74, 144, 164, 0.16); }
      }
    }

    @keyframes shimmer {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `]
})
export class CounsellorsBrowseComponent {}
