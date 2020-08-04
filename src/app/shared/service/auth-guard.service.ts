import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private authService: ApiService) { }

  canActivate(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('userId')) {
      return true;
    }        
    this.router.navigate(['/login']);
    return false;
  }
}
