import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = this.authService.getRole();

    // Vérifie si le rôle est autorisé
    if (role && route.data['roles']?.includes(role)) {
      return true;
    }

    // Redirige vers la page de login si non autorisé
    this.router.navigate(['/login']);
    return false;
  }
}
