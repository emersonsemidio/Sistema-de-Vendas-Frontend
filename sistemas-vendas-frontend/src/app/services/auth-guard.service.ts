import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem('authToken');
    const isLoginPage = state.url.includes('/login');
    console.log('Auth Token:', authToken);

    if (authToken && isLoginPage) {
      this.router.navigate(['/mercados']);
      return false;
    } else if (!authToken && !isLoginPage) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
