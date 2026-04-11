import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(c => c.CounsellorDashboardComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile-management/counsellor-profile-management.component')
        .then(c => c.CounsellorProfileManagementComponent)
  },
  {
    path: 'availability',
    loadComponent: () =>
      import('./components/availability/counsellor-availability.component')
        .then(c => c.CounsellorAvailabilityComponent)
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./components/appointments/counsellor-appointments.component')
        .then(c => c.CounsellorAppointmentsComponent)
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./components/messages/counsellor-messages.component')
        .then(c => c.CounsellorMessagesComponent)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CounsellorModule { }
