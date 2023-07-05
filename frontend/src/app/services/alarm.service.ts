import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map } from 'rxjs';
import { Alarm } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private apiService: ApiService) { }

  public getAlarms(bearerToken: string): Observable<Array<Alarm>> {
    return this.apiService.getAlarms(bearerToken).pipe(
      map((alarms: Array<Alarm>) => alarms),
      catchError((_) => [])
    );
  }

}
