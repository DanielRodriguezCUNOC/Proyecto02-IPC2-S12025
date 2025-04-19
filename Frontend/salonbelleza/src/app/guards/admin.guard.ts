// admin.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user?.rol === 'administrador') {
          return true;
        }
        this.router.navigate(['/acceso-denegado']);
        return false;
      })
    );
  }
}
