import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'; // Importe o Router
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  async login() {
    try {
      const result = await this.authService.login(this.email, this.password, this.isAuthenticated);
      console.log('Login successful', result);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error', error);
    }
  }
}
