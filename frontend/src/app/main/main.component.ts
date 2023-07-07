import { Component } from '@angular/core';
import { Alarm, Weather } from '../models/app.model';
import { AlarmService } from '../services/alarm.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  private alarms: Array<Alarm> = [];
  private bearerToken: string = '';
  private ringtone: HTMLAudioElement = new Audio();
  private alarmId: string = '';

  constructor(private alarmService: AlarmService) { }

  ngOnInit() {
    this.bearerToken = localStorage.getItem('jwt')?.replaceAll('"', '') ?? '';
    this.ringtone = new Audio('../../assets/ringtone.mp3');
    
    this.alarmService.getAlarms(this.bearerToken)
    .subscribe({
      next: (alarms) => this.alarms = alarms
    });

    // checking if an alarm can trigger every one second
    setInterval(() => {
      const now = new Date();

      this.alarms.forEach(alarm => {
        if(now.getHours() == alarm.hour && now.getMinutes() == alarm.minutes && now.getSeconds() == 0)
        {
          this.ringtone.play();
          this.ringtone.loop = true;

          this.alarmService.getWeather(alarm.id, this.bearerToken)
          .subscribe({
            next: (weather: Weather) => {
              const data = `Current weather information for ${weather.location}, ${weather.country}: ` + 
              `${weather.condition}, with a temperature of ${weather.temperature}°C. ` +
              `Wind is blowing with a speed of ${weather.wind} km/h, with ` +
              `${weather.humidity}% humidity, and a UV index of ${weather.uvIndex}.`;

              alarm.weather = data;
              
              if(Notification.permission == 'granted')
                new Notification(`Weather Alarm: ${alarm.title}`, {
                  body: data,
                  icon: weather.iconUrl
                });
            },
            error: (error: string) => alert(error)
          });

          setTimeout(() => {
            this.ringtone.pause();
          }, 17 * 1000);
        }
      });
    }, 1000);

    // in case of CSS errors on reload
    this.closeModal();
  }

  public getAlarms() {
    return this.alarms;
  }

  public addAlarm(title: string, hour: number, minutes: number) {
    new Promise<number[]>((resolve) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        resolve([coords.latitude, coords.longitude])
      }, () => {
        resolve([47.15, 27.58]); // default coordinates: Iasi, Romania
      });
    }).then((coords) => {
      this.alarmService.createAlarm(title, coords[0], coords[1], hour, minutes, this.bearerToken)
      .subscribe({
        next: () => window.location.reload(),
        error: (error: string) => alert(error)
      });
    });
  }

  public editAlarm(title: string, hour: number, minutes: number) {
    new Promise<number[]>((resolve) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        resolve([coords.latitude, coords.longitude])
      }, () => {
        resolve([47.15, 27.58]); // default coordinates: Iasi, Romania
      });
    }).then((coords) => {
      this.alarmService.editAlarm(this.alarmId, title, coords[0], coords[1], hour, minutes, this.bearerToken)
      .subscribe({
        next: () => window.location.reload(),
        error: (error: string) => alert(error)
      });
    });
  }

  public deleteAlarm() {
    this.alarmService.deleteAlarm(this.alarmId, this.bearerToken)
    .subscribe({
      next: () => window.location.reload(),
      error: (error: string) => alert(error)
    });
  }

  public showModal(contentId: string, alarmId: string = '', alarmTitle: string = '', alarmHour: number = 0, alarmMinutes: number = 0)
  {
    document.getElementById('modal')!.style.display = 'block';
    document.getElementById(contentId)!.style.display = 'block';

    if(contentId == 'alarm-form' && alarmId != '')
    {
      const hour = alarmHour < 10 ? '0' + alarmHour.toString() : alarmHour.toString();
      const minutes = alarmMinutes < 10 ? '0' + alarmMinutes.toString() : alarmMinutes.toString();
      (<HTMLInputElement>document.getElementById('title')).value = alarmTitle;
      (<HTMLInputElement>document.getElementById('time')).value = `${hour}:${minutes}`;
    }
    else
    {
      (<HTMLInputElement>document.getElementById('title')).value = '';
      (<HTMLInputElement>document.getElementById('time')).value = '';
    }

    this.alarmId = alarmId;
  }

  public closeModal() {
    document.getElementById('modal')!.style.display = 'none';
    document.getElementById('alarm-form')!.style.display = 'none';
    document.getElementById('delete-text')!.style.display = 'none';
    this.alarmId = '';
  }

  public confirm() {
    const alarmForm = document.getElementById('alarm-form');
    const deleteText = document.getElementById('delete-text');

    if(alarmForm!.style.display == 'block')
    {
      const title = (<HTMLInputElement>document.getElementById('title')).value;
      const time = (<HTMLInputElement>document.getElementById('time')).value;
      const hour = parseInt(time.split(':')[0]);
      const minutes = parseInt(time.split(':')[1]);

      if(this.alarmId == '')
        this.addAlarm(title, hour, minutes);
      else
        this.editAlarm(title, hour, minutes);
    }
    else if(deleteText!.style.display == 'block')
      this.deleteAlarm();
  }

}
