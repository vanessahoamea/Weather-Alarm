import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Alarm, Response, Weather } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private apiService: ApiService) { }

  public createAlarm(title: string, lat: number, lon: number, hour: number, minutes: number, bearerToken: string): Observable<string> {
    return this.apiService.createAlarm(title, lat, lon, hour, minutes, bearerToken).pipe(
      map((result: Alarm | Response) => {
        if('title' in result)
          alert('Alarm created.');
        else
          alert(result.message);

        return '';
      }),
      catchError((error) => {
        switch (error.status) {
          case 401:
            return throwError(() => new Error('You don\'t have access to this resource.'));
          default:
            return throwError(() => new Error('Something went wrong.'))
        }
      })
    );
  }

  public getAlarms(bearerToken: string): Observable<Array<Alarm>> {
    return this.apiService.getAlarms(bearerToken).pipe(
      map((alarms: Array<Alarm>) => alarms),
      catchError((_) => [])
    );
  }

  public editAlarm(id: string, title: string, lat: number, lon: number, hour: number, minutes: number, bearerToken: string): Observable<string> {
    return this.apiService.editAlarm(id, title, lat, lon, hour, minutes, bearerToken).pipe(
      map((alarm: Alarm) => {
        alert(`Successfully modified alarm "${alarm.title}".`);

        return '';
      }),
      catchError((error) => {        
        switch (error.status) {
          case 401:
            return throwError(() => new Error('You don\'t have access to this resource.'));
          case 404:
            return throwError(() => new Error('This alarm doesn\'t exist.'));
          default:
            return throwError(() => new Error('Something went wrong. Try again later.'));
        }
      })
    );
  }

  public deleteAlarm(id: string, bearerToken: string): Observable<string> {
    return this.apiService.deleteAlarm(id, bearerToken).pipe(
      map((alarm: Alarm) => {
        alert(`Successfully deleted alarm "${alarm.title}".`);

        return '';
      }),
      catchError((error) => {        
        switch (error.status) {
          case 401:
            return throwError(() => new Error('You don\'t have access to this resource.'));
          case 404:
            return throwError(() => new Error('This alarm doesn\'t exist.'));
          default:
            return throwError(() => new Error('Something went wrong. Try again later.'));
        }
      })
    );
  }

  public getWeather(id: string, bearerToken: string): Observable<Weather> {
    return this.apiService.getWeather(id, bearerToken).pipe(
      map((weather: Weather) => weather),
      catchError((error) => {
        switch (error.status) {
          case 401:
            return throwError(() => new Error('You don\'t have access to this resource.'));
          case 404:
            return throwError(() => new Error('This alarm doesn\'t exist.'));
          default:
            return throwError(() => new Error('Something went wrong. Try again later.'));
        }
      })
    );
  }

}
