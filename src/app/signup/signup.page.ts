import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router 
) {}

  register() {
    this.authService.register(this.email, this.password)
      .then((result) => {
        console.log('Registration successful', result);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Registration error', error);
      });
  }
}
