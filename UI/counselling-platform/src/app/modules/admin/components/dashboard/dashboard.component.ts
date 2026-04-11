import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../../core/services/admin.service';
import { CounsellorService } from '../../../../core/services/counsellor.service';
import { AdminStats } from '../../../../core/models/admin-stats.model';

interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
  bgColor: string;
  icon: string;
}

interface ActivityRow {
  user: string;
  action: string;
  date: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
}

interface PendingApproval {
  id: string;
  name: string;
  specialty: string;
  appliedDate: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  today = new Date();
  isLoadingStats = true;
  isLoadingPending = true;

  stats: StatCard[] = [];

  recentActivity: ActivityRow[] = [
    { user: 'Sarah Mitchell',  action: 'Registered as a new client',           date: '2 min ago',   status: 'active'    },
    { user: 'James Okoroh',    action: 'Counsellor application submitted',      date: '18 min ago',  status: 'pending'   },
    { user: 'Priya Sharma',    action: 'Session completed with Dr. Williams',   date: '1 hour ago',  status: 'completed' },
    { user: 'Tom Andersen',    action: 'Payment of $120 processed',             date: '2 hours ago', status: 'completed' },
    { user: 'Chioma Eze',      action: 'Appointment cancelled',                 date: '3 hours ago', status: 'cancelled' },
    { user: 'Lucas Fernandez', action: 'Registered as a new client',            date: '5 hours ago', status: 'active'    },
  ];

  pendingApprovals: PendingApproval[] = [];

  constructor(
    private adminService: AdminService,
    private counsellorService: CounsellorService,
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadPendingApprovals();
  }

  private loadStats(): void {
    this.adminService.getStats().subscribe({
      next: (data: AdminStats) => {
        this.stats = [
          { label: 'Total Users',        value: data.totalUsers.toLocaleString(),       trend: `+${data.newUsersThisMonth} this month`, trendUp: data.newUsersThisMonth > 0, color: '#4A90A4', bgColor: 'rgba(74,144,164,0.10)', icon: 'users'      },
          { label: 'Active Counsellors', value: data.activeCounsellors.toLocaleString(), trend: `${data.totalCounsellors} total`,         trendUp: true,                       color: '#38a169', bgColor: 'rgba(56,161,105,0.10)',  icon: 'counsellor' },
          { label: 'Pending Approvals',  value: data.pendingApprovals.toLocaleString(),  trend: 'Needs review',                           trendUp: false,                      color: '#dd6b20', bgColor: 'rgba(221,107,32,0.10)',  icon: 'clock'      },
          { label: 'Total Clients',      value: data.totalClients.toLocaleString(),      trend: `${data.newUsersThisMonth} new this month`, trendUp: true,                      color: '#805ad5', bgColor: 'rgba(128,90,213,0.10)', icon: 'calendar'   },
        ];
        this.isLoadingStats = false;
      },
      error: () => { this.isLoadingStats = false; },
    });
  }

  private loadPendingApprovals(): void {
    this.counsellorService.getPendingCounsellors().subscribe({
      next: (counsellors) => {
        this.pendingApprovals = counsellors.map(c => ({
          id: c.id,
          name: c.fullName,
          specialty: c.specializations ?? '—',
          appliedDate: '—',
          experience: `${c.yearsOfExperience} yr${c.yearsOfExperience !== 1 ? 's' : ''}`,
          status: 'pending' as const,
        }));
        this.isLoadingPending = false;
      },
      error: () => { this.isLoadingPending = false; },
    });
  }

  get pendingCount(): number {
    return this.pendingApprovals.filter(a => a.status === 'pending').length;
  }

  approve(approval: PendingApproval): void {
    this.counsellorService.approveCounsellor(approval.id).subscribe({
      next: () => { approval.status = 'approved'; },
    });
  }

  reject(approval: PendingApproval): void {
    this.counsellorService.rejectCounsellor(approval.id).subscribe({
      next: () => { approval.status = 'rejected'; },
    });
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#4A90A4', '#38a169', '#805ad5', '#dd6b20', '#e53e3e', '#d69e2e'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
    return colors[Math.abs(hash) % colors.length];
  }
}

