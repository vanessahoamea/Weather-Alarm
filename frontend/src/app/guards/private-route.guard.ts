import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateRouteGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const requiresAuthentication = route.data['requiresAuthentication'];

    // main page
    if(requiresAuthentication)
    {
      if(!this.authenticationService.getAuthStatus())
        this.router.navigate(['login']);
      return true;
    }
    // login, register pages
    else
    {
      if(this.authenticationService.getAuthStatus())
        this.router.navigate(['main']);
      return true;
    }
  }
  
}
