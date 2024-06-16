import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'; // Importe o Router
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isAuthenticated: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
      this.loginForm = this.formBuilder.group({
      email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),

      ]],
      password: ['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),

      ]],
      password: ['',[
        Validators.required,
        Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      ]]
    })
  }


  get errorControl() {
    return this.loginForm?.controls;
  }

  async login() {
   const loading = await this.loadingCtrl.create({
    message: 'Carregando...',
   });
   await loading.present();
   if (this.loginForm?.valid) {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const user: any = await this.authService.login(email, password, this.isAuthenticated)
      .catch((error)=> {
        console.log(error);
        loading.dismiss();
      })
    if (user) {
      loading.dismiss()
      this.router.navigate(['/login']);
    }
   }
  }

//   async login() {
//     try {
//       const email = '';
//       const password = '';
//       const result = await this.authService.login(email, password, this.isAuthenticated);
//       console.log('Login successful', result);
//       this.router.navigate(['/home']);
//     } catch (error) {
//       console.error('Login error', error);
//     }
//   }
// }
}