import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stub-page">
      <h1 class="stub-page__title">Appointments</h1>
      <p class="stub-page__desc">View and manage all appointments scheduled on the platform.</p>
    </div>
  `,
  styles: [`
    .stub-page { padding: 32px; }
    .stub-page__title { font-size: 22px; font-weight: 800; color: #1a2e3b; margin: 0 0 8px; }
    .stub-page__desc  { color: #718096; font-size: 15px; margin: 0; }
  `]
})
export class AdminAppointmentsComponent {}
