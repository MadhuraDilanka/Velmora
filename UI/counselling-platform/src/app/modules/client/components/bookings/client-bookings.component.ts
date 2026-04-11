import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-header">
      <h2>My Bookings</h2>
      <p>View and manage your upcoming and past counselling sessions.</p>
    </div>

    <div class="tabs">
      <button class="tab" [class.active]="activeTab === 'upcoming'" (click)="activeTab = 'upcoming'">Upcoming</button>
      <button class="tab" [class.active]="activeTab === 'past'" (click)="activeTab = 'past'">Past</button>
    </div>

    <div class="card">
      <div class="empty-state" *ngIf="activeTab === 'upcoming'">
        <div class="empty-icon">📅</div>
        <h3>No Upcoming Sessions</h3>
        <p>You have no upcoming sessions scheduled. Browse counsellors to book your first session.</p>
        <a routerLink="/counsellors" class="action-btn">Browse Counsellors</a>
      </div>
      <div class="empty-state" *ngIf="activeTab === 'past'">
        <div class="empty-icon">📋</div>
        <h3>No Past Sessions</h3>
        <p>Your completed sessions will appear here.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .tabs { display: flex; gap: 4px; margin-bottom: 20px; }
    .tab { padding: 9px 22px; border-radius: 100px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 14px; font-weight: 500; color: #4a5568; cursor: pointer; transition: all 0.2s;
      &.active { background: rgba(74,144,164,0.1); border-color: #4A90A4; color: #4A90A4; font-weight: 600; }
    }
    .card { background: #fff; border-radius: 16px; border: 1px solid #e2e8f0; padding: 48px 24px; }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; max-width: 360px; margin: 0; }
    }
    .empty-icon { font-size: 48px; }
    .action-btn { padding: 11px 28px; border-radius: 100px; background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; margin-top: 8px; display: inline-block; transition: background 0.2s; &:hover { background: #357a8e; } }
  `]
})
export class ClientBookingsComponent {
  activeTab: 'upcoming' | 'past' = 'upcoming';
}
