import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(c => c.AdminDashboardComponent)
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/user-management/user-management.component').then(c => c.UserManagementComponent)
  },
  {
    path: 'approvals',
    loadComponent: () =>
      import('./components/counsellor-approval/counsellor-approval.component').then(c => c.CounsellorApprovalComponent)
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./components/payments/admin-payments.component').then(c => c.AdminPaymentsComponent)
  },
  {
    path: 'reviews',
    loadComponent: () =>
      import('./components/reviews/admin-reviews.component').then(c => c.AdminReviewsComponent)
  },
  {
    path: 'counsellors',
    loadComponent: () =>
      import('./components/counsellors-list/admin-counsellors.component').then(c => c.AdminCounsellorListComponent)
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./components/appointments/admin-appointments.component').then(c => c.AdminAppointmentsComponent)
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/admin-settings.component').then(c => c.AdminSettingsComponent)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdminModule { }
