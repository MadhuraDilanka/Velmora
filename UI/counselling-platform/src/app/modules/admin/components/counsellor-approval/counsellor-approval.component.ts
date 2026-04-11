import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounsellorService } from '../../../../core/services/counsellor.service';
import { CounsellorProfile } from '../../../../core/models/counsellor.model';

@Component({
  selector: 'app-counsellor-approval',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, FormsModule],
  template: `
    <div class="page-header">
      <h2>Counsellor Approval</h2>
      <p>Review and approve counsellor registration requests.</p>
    </div>

    <div class="tabs">
      <button class="tab" [class.active]="tab === 'pending'"  (click)="tab = 'pending'">
        Pending <span class="badge" *ngIf="pending.length">{{ pending.length }}</span>
      </button>
      <button class="tab" [class.active]="tab === 'approved'" (click)="tab = 'approved'">Approved</button>
      <button class="tab" [class.active]="tab === 'rejected'" (click)="tab = 'rejected'">Rejected</button>
    </div>

    <div *ngIf="isLoading" class="card loading-card">
      <div *ngFor="let i of [1,2,3]" class="skeleton-row">
        <div class="sk-avatar"></div>
        <div class="sk-lines">
          <div class="sk-line w50"></div>
          <div class="sk-line w30"></div>
        </div>
      </div>
    </div>

    <div *ngIf="!isLoading && displayed.length === 0" class="card">
      <div class="empty-state">
        <div class="empty-icon">{{ tab === 'pending' ? '✅' : tab === 'approved' ? '👍' : '⛔' }}</div>
        <h3>No {{ tab | titlecase }} Applications</h3>
        <p>{{ tab === 'pending'
          ? 'New counsellor applications will appear here for your review.'
          : 'No applications in this status.' }}</p>
      </div>
    </div>

    <div *ngIf="!isLoading && displayed.length > 0" class="card">
      <div class="counsellors-list">
        <div *ngFor="let c of displayed" class="counsellor-row">
          <div class="counsellor-row__avatar" [style.background]="avatarColor(c.fullName)">{{ initials(c.fullName) }}</div>
          <div class="counsellor-row__info">
            <div class="counsellor-row__name">{{ c.fullName }}</div>
            <div class="counsellor-row__meta">
              <span *ngIf="c.professionalTitle" class="meta-item">{{ c.professionalTitle }}</span>
              <span *ngIf="c.specializations"   class="meta-item">{{ c.specializations }}</span>
              <span *ngIf="c.yearsOfExperience" class="meta-item">{{ c.yearsOfExperience }} yrs exp</span>
            </div>
          </div>

          <!-- Actions for pending -->
          <div *ngIf="tab === 'pending'" class="counsellor-row__actions">
            <div *ngIf="rejectingId === c.id" class="reject-input-wrap">
              <input [(ngModel)]="rejectReason" class="reject-input" placeholder="Rejection reason (optional)" />
              <button class="btn-confirm-reject" (click)="confirmReject(c)">Confirm</button>
              <button class="btn-cancel" (click)="cancelReject()">Cancel</button>
            </div>
            <ng-container *ngIf="rejectingId !== c.id">
              <button class="btn-approve" (click)="approve(c)" [disabled]="processingId === c.id">
                {{ processingId === c.id ? '…' : 'Approve' }}
              </button>
              <button class="btn-reject" (click)="startReject(c)" [disabled]="processingId === c.id">Reject</button>
            </ng-container>
          </div>

          <!-- Status badge for approved/rejected -->
          <span *ngIf="tab !== 'pending'" class="status-badge" [class.badge--approved]="tab === 'approved'" [class.badge--rejected]="tab === 'rejected'">
            {{ tab | titlecase }}
          </span>
        </div>
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
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; }
    .empty-state { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; padding: 24px 0;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; max-width: 400px; margin: 0; }
    }
    .empty-icon { font-size: 48px; }

    .counsellors-list { display: flex; flex-direction: column; gap: 16px; }
    .counsellor-row { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; &:last-child { border-bottom: none; } }
    .counsellor-row__avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #fff; flex-shrink: 0; }
    .counsellor-row__info { flex: 1; }
    .counsellor-row__name { font-size: 15px; font-weight: 700; color: #1a2e3b; }
    .counsellor-row__meta { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
    .meta-item { font-size: 12px; color: #718096; }
    .counsellor-row__actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; flex-wrap: wrap; }
    .btn-approve { padding: 7px 18px; border: none; border-radius: 100px; background: #38a169; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; &:hover:not(:disabled) { background: #2f855a; } &:disabled { opacity: 0.5; cursor: not-allowed; } }
    .btn-reject  { padding: 7px 18px; border: 1.5px solid #e53e3e; border-radius: 100px; background: #fff; color: #e53e3e; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; &:hover:not(:disabled) { background: #fff5f5; } &:disabled { opacity: 0.5; cursor: not-allowed; } }
    .btn-cancel  { padding: 7px 18px; border: 1.5px solid #e2e8f0; border-radius: 100px; background: #fff; color: #718096; font-size: 13px; cursor: pointer; }
    .btn-confirm-reject { padding: 7px 18px; border: none; border-radius: 100px; background: #e53e3e; color: #fff; font-size: 13px; font-weight: 600; cursor: pointer; }
    .reject-input-wrap { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .reject-input { padding: 7px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; width: 220px; &:focus { border-color: #4A90A4; } }
    .status-badge { padding: 5px 14px; border-radius: 100px; font-size: 12px; font-weight: 600;
      &.badge--approved { background: rgba(56,161,105,0.1); color: #38a169; }
      &.badge--rejected { background: rgba(229,62,62,0.1); color: #e53e3e; }
    }
    /* Loading skeleton */
    .loading-card { padding: 24px; }
    .skeleton-row { display: flex; gap: 16px; align-items: center; padding: 16px 0; border-bottom: 1px solid #f1f5f9; &:last-child { border-bottom: none; } }
    .sk-avatar { width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; animation: shimmer 1.5s infinite; }
    .sk-lines  { flex: 1; display: flex; flex-direction: column; gap: 8px; }
    .sk-line   { height: 14px; background: #e2e8f0; border-radius: 6px; animation: shimmer 1.5s infinite; }
    .sk-line.w50 { width: 50%; } .sk-line.w30 { width: 30%; }
    @keyframes shimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `]
})
export class CounsellorApprovalComponent implements OnInit {
  tab: 'pending' | 'approved' | 'rejected' = 'pending';
  isLoading = true;
  processingId: string | null = null;
  rejectingId: string | null = null;
  rejectReason = '';

  pending:  CounsellorProfile[] = [];
  approved: CounsellorProfile[] = [];
  rejected: CounsellorProfile[] = [];

  constructor(private counsellorService: CounsellorService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.isLoading = true;
    this.counsellorService.getApprovedCounsellors().subscribe({
      next: (data) => {
        this.approved = data;
        this.loadPending();
      },
      error: () => this.loadPending(),
    });
  }

  private loadPending(): void {
    this.counsellorService.getPendingCounsellors().subscribe({
      next: (data) => { this.pending = data; this.isLoading = false; },
      error: ()     => { this.isLoading = false; },
    });
  }

  get displayed(): CounsellorProfile[] {
    if (this.tab === 'pending')  return this.pending;
    if (this.tab === 'approved') return this.approved;
    return this.rejected;
  }

  approve(c: CounsellorProfile): void {
    this.processingId = c.id;
    this.counsellorService.approveCounsellor(c.id).subscribe({
      next: () => {
        this.approved.push(c);
        this.pending = this.pending.filter(p => p.id !== c.id);
        this.processingId = null;
      },
      error: () => { this.processingId = null; },
    });
  }

  startReject(c: CounsellorProfile): void {
    this.rejectingId = c.id;
    this.rejectReason = '';
  }

  cancelReject(): void {
    this.rejectingId = null;
    this.rejectReason = '';
  }

  confirmReject(c: CounsellorProfile): void {
    this.processingId = c.id;
    this.counsellorService.rejectCounsellor(c.id, this.rejectReason || undefined).subscribe({
      next: () => {
        this.rejected.push(c);
        this.pending = this.pending.filter(p => p.id !== c.id);
        this.processingId = null;
        this.rejectingId = null;
        this.rejectReason = '';
      },
      error: () => { this.processingId = null; this.rejectingId = null; },
    });
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

