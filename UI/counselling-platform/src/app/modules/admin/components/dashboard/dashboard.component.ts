import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  id: number;
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
export class AdminDashboardComponent {
  today = new Date();

  stats: StatCard[] = [
    { label: 'Total Users',        value: '1,248', trend: '+12% this month',   trendUp: true,  color: '#4A90A4', bgColor: 'rgba(74,144,164,0.10)', icon: 'users'     },
    { label: 'Active Counsellors', value: '86',    trend: '+3 this week',      trendUp: true,  color: '#38a169', bgColor: 'rgba(56,161,105,0.10)',  icon: 'counsellor'},
    { label: 'Pending Approvals',  value: '7',     trend: 'Needs review',      trendUp: false, color: '#dd6b20', bgColor: 'rgba(221,107,32,0.10)',  icon: 'clock'     },
    { label: 'Sessions This Week', value: '342',   trend: '+8% vs last week',  trendUp: true,  color: '#805ad5', bgColor: 'rgba(128,90,213,0.10)', icon: 'calendar'  },
  ];

  recentActivity: ActivityRow[] = [
    { user: 'Sarah Mitchell',  action: 'Registered as a new client',           date: '2 min ago',   status: 'active'    },
    { user: 'James Okoroh',    action: 'Counsellor application submitted',      date: '18 min ago',  status: 'pending'   },
    { user: 'Priya Sharma',    action: 'Session completed with Dr. Williams',   date: '1 hour ago',  status: 'completed' },
    { user: 'Tom Andersen',    action: 'Payment of $120 processed',             date: '2 hours ago', status: 'completed' },
    { user: 'Chioma Eze',      action: 'Appointment cancelled',                 date: '3 hours ago', status: 'cancelled' },
    { user: 'Lucas Fernandez', action: 'Registered as a new client',            date: '5 hours ago', status: 'active'    },
  ];

  pendingApprovals: PendingApproval[] = [
    { id: 1, name: 'James Okoroh',     specialty: 'Anxiety & Stress',       appliedDate: 'Jan 18, 2025', experience: '5 years',  status: 'pending' },
    { id: 2, name: 'Amara Nwosu',      specialty: 'Couples Therapy',        appliedDate: 'Jan 17, 2025', experience: '8 years',  status: 'pending' },
    { id: 3, name: 'Daniel Park',      specialty: 'Youth & Adolescents',    appliedDate: 'Jan 16, 2025', experience: '3 years',  status: 'pending' },
    { id: 4, name: 'Fatima Al-Hassan', specialty: 'Grief & Trauma',         appliedDate: 'Jan 15, 2025', experience: '10 years', status: 'pending' },
    { id: 5, name: 'Oliver Chen',      specialty: 'CBT & Depression',       appliedDate: 'Jan 14, 2025', experience: '6 years',  status: 'pending' },
    { id: 6, name: 'Nkechi Adeyemi',   specialty: 'Mindfulness & Wellness', appliedDate: 'Jan 13, 2025', experience: '4 years',  status: 'pending' },
    { id: 7, name: "Ryan O'Brien",     specialty: 'Addiction Recovery',     appliedDate: 'Jan 12, 2025', experience: '7 years',  status: 'pending' },
  ];

  get pendingCount(): number {
    return this.pendingApprovals.filter(a => a.status === 'pending').length;
  }

  approve(approval: PendingApproval): void {
    approval.status = 'approved';
  }

  reject(approval: PendingApproval): void {
    approval.status = 'rejected';
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

