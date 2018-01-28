import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve) => {
      this.auth.getAuthState().subscribe(user => {
        if (user === null) {
          this.router.navigate(['/login']);
          resolve(false);
        }

        resolve(true);
      });
    });
  }
}
