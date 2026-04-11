import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NoAuthGuard } from './core/guards/no-auth.guard';
import { MainLayoutComponent } from './layout/components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/components/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layout/components/dashboard-layout/dashboard-layout.component';
import { UserRole } from './modules/auth/models/auth.model';

const routes: Routes = [
  // ── Public pages (with navbar + footer) ────────────────────────────
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },

  // ── Auth pages (centered card layout) ──────────────────────────────
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

  // ── Client dashboard (role-protected) ──────────────────────────────
  {
    path: 'client',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Client] },
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },

  // ── Counsellor dashboard (role-protected) ───────────────────────────
  {
    path: 'counsellor',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Counsellor] },
    loadChildren: () => import('./modules/counsellor/counsellor.module').then(m => m.CounsellorModule)
  },

  // ── Admin dashboard (role-protected) ───────────────────────────────
  {
    path: 'admin',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },

  // ── Unauthorized ───────────────────────────────────────────────────
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./modules/auth/components/unauthorized/unauthorized.component')
        .then(c => c.UnauthorizedComponent)
  },

  // ── Fallback ────────────────────────────────────────────────────────
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

