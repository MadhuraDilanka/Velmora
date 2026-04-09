import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './modules/auth/models/auth.model';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'client',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Client] },
    loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'counsellor',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Counsellor] },
    loadChildren: () => import('./modules/counsellor/counsellor.module').then(m => m.CounsellorModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] },
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'unauthorized',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // Wildcard — redirect unknown paths to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
