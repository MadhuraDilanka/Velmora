import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.AdminDashboardComponent)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AdminModule { }
