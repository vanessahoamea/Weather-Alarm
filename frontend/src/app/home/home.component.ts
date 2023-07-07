import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

  ngOnInit() {
    // requesting permission to send notifications
    Notification.requestPermission().then(() => { });

    // requesting permission to access the user's location
    navigator.geolocation.getCurrentPosition(() => { });
  }

}
