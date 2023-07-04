import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authenticationService: AuthenticationService) { }

  public logout() {
    this.authenticationService.logout();
  }

  public isAuthenticated() {
    return this.authenticationService.getAuthStatus();
  }
  
}
