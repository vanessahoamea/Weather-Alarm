import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Response } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public register(email: string, password: string) {
    return this.http.post<User>("/api/users/register", {
      'email': email,
      'password': password
    });
  }

  public login(email: string, password: string) {
    return this.http.post<Response>("/api/users/login", {
      'email': email,
      'password': password
    });
  }
}