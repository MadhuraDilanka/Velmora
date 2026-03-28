import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserRole } from '../../modules/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const requiredRoles: UserRole[] = route.data['roles'];
    if (requiredRoles && requiredRoles.length > 0) {
      const user = this.authService.getCurrentUser();
      if (!user || !requiredRoles.includes(user.role)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    return true;
  }
}
