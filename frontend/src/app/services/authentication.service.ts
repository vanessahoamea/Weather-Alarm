import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Response, User } from '../models/app.model';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.isAuthenticated = localStorage.getItem('jwt') ? true : false;
  }

  public register(email: string, password: string): Observable<string> {
    return this.apiService.register(email, password).pipe(
      map((user: User) => {
        alert(`Successfully signed up as ${user.email}.`);

        return '';
      }),
      catchError((error) => {        
        switch (error.status) {
          case 400:
            return throwError(() => new Error('E-mail and password can\'t be blank.'));
          case 409:
            return throwError(() => new Error('An account associated with this e-mail address already exists.'));
          default:
            return throwError(() => new Error('Something went wrong. Try again later.'));
        }
      })
    );
  }

  public login(email: string, password: string): Observable<string> {
    return this.apiService.login(email, password).pipe(
      map((response: Response) => {
        this.isAuthenticated = true;
        localStorage.setItem('jwt', JSON.stringify(response.data));
        this.router.navigate(['main']);

        return '';
      }),
      catchError((error) => {
        this.isAuthenticated = false;
        
        switch (error.status) {
          case 401:
            return throwError(() => new Error('Password is incorrect.'));
          case 404:
            return throwError(() => new Error('User not found.'));
          default:
            return throwError(() => new Error('Something went wrong. Try again later.'));
        }
      })
    );
  }  

  public logout() {
    this.isAuthenticated = false;
    localStorage.setItem('jwt', '');
    this.router.navigate(['login']);
  }

  public getAuthStatus() {
    return this.isAuthenticated;
  }
  
}
