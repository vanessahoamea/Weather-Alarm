import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authenticationService: AuthenticationService) { }

  public login(email: string, password: string) {
      this.authenticationService.login(email, password)
      .subscribe({
        error: (error: string) => alert(error)
      });
  }
  
}
