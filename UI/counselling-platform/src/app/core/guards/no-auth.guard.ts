import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      switch (user?.role) {
        case UserRole.Admin:      this.router.navigate(['/admin/dashboard']);      break;
        case UserRole.Counsellor: this.router.navigate(['/counsellor/dashboard']); break;
        default:                  this.router.navigate(['/client/dashboard']);     break;
      }
      return false;
    }
    return true;
  }
}
