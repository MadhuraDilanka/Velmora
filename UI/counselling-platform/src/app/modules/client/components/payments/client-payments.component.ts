import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-payments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h2>Payments</h2>
      <p>View your billing history and manage payment methods.</p>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-label">Total Spent</span>
        <span class="stat-value">$0.00</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Sessions Paid</span>
        <span class="stat-value">0</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Pending</span>
        <span class="stat-value">$0.00</span>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3>Payment History</h3>
      </div>
      <div class="empty-state">
        <div class="empty-icon">💳</div>
        <h3>No Transactions Yet</h3>
        <p>Your payment history will appear here after your first session.</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .stat-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px 20px; display: flex; flex-direction: column; gap: 6px; }
    .stat-label { font-size: 13px; color: #718096; font-weight: 500; }
    .stat-value { font-size: 28px; font-weight: 800; color: #1a2e3b; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
    .card-header { padding: 20px 24px; border-bottom: 1px solid #e2e8f0;
      h3 { margin: 0; font-size: 16px; font-weight: 700; color: #1a2e3b; }
    }
    .empty-state { padding: 48px 24px; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; margin: 0; max-width: 360px; }
    }
    .empty-icon { font-size: 48px; }
    @media (max-width: 640px) { .stats-row { grid-template-columns: 1fr; } }
  `]
})
export class ClientPaymentsComponent {}
