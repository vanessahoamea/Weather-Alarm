import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Response } from '../models/app.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.isAuthenticated = localStorage.getItem('jwt') ? true : false;
  }

  public login(email: string, password: string) {
    this.apiService.login(email, password)
    .subscribe({
      next: (response: Response) => {
        this.isAuthenticated = true;
        localStorage.setItem('jwt', JSON.stringify(response.data));
      },
      error: (error) => {
        this.isAuthenticated = false;
        console.log(error);
      }
    });
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
