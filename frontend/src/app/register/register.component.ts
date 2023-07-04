import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authenticationService: AuthenticationService) { }

  public register(email: string, password: string) {
      this.authenticationService.register(email, password)
      .subscribe({
        error: (error: string) => alert(error)
      });
  }
  
}
