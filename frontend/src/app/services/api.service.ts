import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Response, Alarm } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public register(email: string, password: string) {
    return this.http.post<User>('/api/users/register', {
      'email': email,
      'password': password
    });
  }

  public login(email: string, password: string) {
    return this.http.post<Response>('/api/users/login', {
      'email': email,
      'password': password
    });
  }

  public createAlarm(title: string, lat: number, lon: number, hour: number, minutes: number, bearerToken: string) {
    return this.http.post<Alarm | Response>('/api/alarms', {
      'title': title,
      'latitude': lat,
      'longitude': lon,
      'hour': hour,
      'minutes': minutes,
    }, {
      'headers': { 'Authorization': `Bearer ${bearerToken}` }
    });
  }

  public getAlarms(bearerToken: string) {
    return this.http.get<Array<Alarm>>('/api/alarms', {
      'headers': { 'Authorization': `Bearer ${bearerToken}` }
    });
  }

  public editAlarm(id: string, title: string, lat: number, lon: number, hour: number, minutes: number, bearerToken: string) {
    return this.http.put<Alarm>(`/api/alarms/${id}`, {
      'title': title,
      'latitude': lat,
      'longitude': lon,
      'hour': hour,
      'minutes': minutes
    }, {
      'headers': { 'Authorization': `Bearer ${bearerToken}` }
    });
  }

  public deleteAlarm(id: string, bearerToken: string)
  {
    return this.http.delete<Alarm>(`/api/alarms/${id}`, {
      'headers': { 'Authorization': `Bearer ${bearerToken}` }
    });
  }
}
