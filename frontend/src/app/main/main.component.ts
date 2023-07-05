import { Component } from '@angular/core';
import { Alarm } from '../models/app.model';
import { AlarmService } from '../services/alarm.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  private alarms: Array<Alarm> = [];
  private bearerToken: string = '';
  private ringtone = new Audio('../../assets/ringtone.mp3');

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.bearerToken = localStorage.getItem('jwt')?.replaceAll('"', '') ?? '';
    
    this.alarmService.getAlarms(this.bearerToken)
    .subscribe({
      next: (alarms) => this.alarms = alarms
    });

    // checking if an alarm can trigger every one minute
    setInterval(() => {
      const today = new Date();

      this.alarms.forEach(alarm => {
        if(today.getHours() == alarm.hour && today.getMinutes() == alarm.minutes)
        {
          // ring sound
          this.ringtone.play();
          this.ringtone.loop = true;

          // notify the user via the browser
          if(Notification.permission == 'granted')
            new Notification(alarm.title, { body: 'Your alarm is ringing!' });

          // delete alarm from list
          setTimeout(() => {
            this.ringtone.pause();
            this.deleteAlarm(alarm.id);
          }, 50 * 1000);
        }
      });
    }, 60 * 1000);
  }

  public getAlarms() {
    return this.alarms;
  }

  public addAlarm() {
    console.log('Adding alarm...');
  }

  public editAlarm(alarmId: string) {
    console.log('Editing alarm...');
  }

  public deleteAlarm(alarmId: string) {
    console.log('Deleting alarm...');
  }

}
