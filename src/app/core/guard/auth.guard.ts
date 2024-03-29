import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private routes: Router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (sessionStorage.getItem('user') != null) {
        return true;
      }
      else {
        this.routes.navigate(['login']);
        return false;
      }
  }
}
