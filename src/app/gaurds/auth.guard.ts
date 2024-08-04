import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    
    if (token) {
      // If token exists, allow access to the route
      return true;
    } else {
      // If no token, navigate to the login page
      this.router.navigate(['']);
      return false;
    }
  }
}
