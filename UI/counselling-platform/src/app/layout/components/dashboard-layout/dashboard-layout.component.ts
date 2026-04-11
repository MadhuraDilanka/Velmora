import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { UserDto, UserRole } from '../../../modules/auth/models/auth.model';
import { AvatarUrlPipe } from '../../../shared/pipes/avatar-url.pipe';

interface NavLink {
  label: string;
  route: string;
  icon: string;
  dividerBefore?: boolean;
}

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, AvatarUrlPipe],
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit, OnDestroy {
  currentUser: UserDto | null = null;
  navLinks: NavLink[] = [];
  sidebarOpen = false;
  notificationsOpen = false;
  notificationCount = 3;
  topbarImgError = false;
  private destroy$ = new Subject<void>();

  readonly clientLinks: NavLink[] = [
    { label: 'Dashboard',   route: '/client/dashboard', icon: 'grid' },
    { label: 'My Profile',  route: '/client/profile',   icon: 'user' },
    { label: 'My Bookings', route: '/client/bookings',  icon: 'calendar' },
    { label: 'Messages',    route: '/client/messages',  icon: 'message' },
    { label: 'Payments',    route: '/client/payments',  icon: 'credit-card' },
  ];

  readonly counsellorLinks: NavLink[] = [
    { label: 'Dashboard',          route: '/counsellor/dashboard',    icon: 'grid' },
    { label: 'Profile Management', route: '/counsellor/profile',      icon: 'user' },
    { label: 'Availability',       route: '/counsellor/availability', icon: 'clock' },
    { label: 'Appointments',       route: '/counsellor/appointments', icon: 'calendar' },
    { label: 'Messages',           route: '/counsellor/messages',     icon: 'message' },
  ];

  readonly adminLinks: NavLink[] = [
    { label: 'Dashboard',    route: '/admin/dashboard',    icon: 'grid' },
    { label: 'Users',        route: '/admin/users',        icon: 'users' },
    { label: 'Counsellors',  route: '/admin/counsellors',  icon: 'counsellor' },
    { label: 'Approvals',    route: '/admin/approvals',    icon: 'check-circle' },
    { label: 'Appointments', route: '/admin/appointments', icon: 'calendar', dividerBefore: true },
    { label: 'Payments',     route: '/admin/payments',     icon: 'credit-card' },
    { label: 'Reviews',      route: '/admin/reviews',      icon: 'star' },
    { label: 'Settings',     route: '/admin/settings',     icon: 'settings', dividerBefore: true },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser   = user;
        this.topbarImgError = false;
        this.navLinks = this.getLinksForRole(user?.role);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getLinksForRole(role?: UserRole): NavLink[] {
    switch (role) {
      case UserRole.Admin:      return this.adminLinks;
      case UserRole.Counsellor: return this.counsellorLinks;
      default:                  return this.clientLinks;
    }
  }

  get roleLabel(): string {
    switch (this.currentUser?.role) {
      case UserRole.Admin:      return 'Admin';
      case UserRole.Counsellor: return 'Counsellor';
      default:                  return 'Client';
    }
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === UserRole.Admin;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
  }
}
