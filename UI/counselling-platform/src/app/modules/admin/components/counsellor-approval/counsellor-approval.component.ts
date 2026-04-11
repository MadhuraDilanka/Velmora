import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-counsellor-approval',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  template: `
    <div class="page-header">
      <h2>Counsellor Approval</h2>
      <p>Review and approve counsellor registration requests.</p>
    </div>

    <div class="tabs">
      <button class="tab" [class.active]="tab === 'pending'" (click)="tab = 'pending'">Pending <span class="badge">0</span></button>
      <button class="tab" [class.active]="tab === 'approved'" (click)="tab = 'approved'">Approved</button>
      <button class="tab" [class.active]="tab === 'rejected'" (click)="tab = 'rejected'">Rejected</button>
    </div>

    <div class="card">
      <div class="empty-state">
        <div class="empty-icon">✅</div>
        <h3>No {{ tab | titlecase }} Applications</h3>
        <p>{{ tab === 'pending'
          ? 'New counsellor applications will appear here for your review.'
          : 'No applications in this status.' }}</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .tabs { display: flex; gap: 4px; margin-bottom: 20px; }
    .tab { padding: 9px 22px; border-radius: 100px; border: 1.5px solid #e2e8f0; background: #fff; font-size: 14px; font-weight: 500; color: #4a5568; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px;
      &.active { background: rgba(74,144,164,0.1); border-color: #4A90A4; color: #4A90A4; font-weight: 600; }
    }
    .badge { background: #4A90A4; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 48px 24px; }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; max-width: 400px; margin: 0; }
    }
    .empty-icon { font-size: 48px; }
  `]
})
export class CounsellorApprovalComponent {
  tab: 'pending' | 'approved' | 'rejected' = 'pending';
}
