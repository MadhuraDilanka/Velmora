import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(c => c.ClientDashboardComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/client-profile.component').then(c => c.ClientProfileComponent)
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./components/bookings/client-bookings.component').then(c => c.ClientBookingsComponent)
  },
  {
    path: 'messages',
    loadComponent: () =>
      import('./components/messages/client-messages.component').then(c => c.ClientMessagesComponent)
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./components/payments/client-payments.component').then(c => c.ClientPaymentsComponent)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ClientModule { }
