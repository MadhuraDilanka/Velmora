import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h2>Reviews</h2>
      <p>Monitor client reviews and flag inappropriate content.</p>
    </div>

    <div class="toolbar">
      <input class="search-input" type="text" placeholder="Search reviews..." />
      <div class="filter-group">
        <button class="filter-btn" [class.active]="filter === 'all'" (click)="filter = 'all'">All</button>
        <button class="filter-btn" [class.active]="filter === 'flagged'" (click)="filter = 'flagged'">Flagged</button>
      </div>
    </div>

    <div class="card">
      <div class="empty-state">
        <div class="empty-icon">⭐</div>
        <h3>No Reviews Yet</h3>
        <p>Client reviews will appear here after sessions are completed.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .toolbar { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
    .search-input { flex: 1; min-width: 200px; padding: 10px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
    .filter-group { display: flex; gap: 4px; }
    .filter-btn { padding: 8px 18px; border-radius: 100px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 13px; font-weight: 500; color: #4a5568; cursor: pointer; transition: all 0.2s;
      &.active { border-color: #4A90A4; background: rgba(74,144,164,0.1); color: #4A90A4; font-weight: 600; }
    }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 48px 24px; }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; max-width: 400px; margin: 0; }
    }
    .empty-icon { font-size: 48px; }
  `]
})
export class AdminReviewsComponent {
  filter: 'all' | 'flagged' = 'all';
}
