import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit{
  regForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.regForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
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

ngOnInit() {
  this.regForm = this.formBuilder.group({
    fullname: ['', [Validators.required]],
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
    return this.regForm?.controls;
  }

  async register() {
   const loading = await this.loadingCtrl.create({
    message: 'Carregando...',
   });
   await loading.present();
   if (this.regForm?.valid) {
    const email = this.regForm.get('email')?.value;
    const password = this.regForm.get('password')?.value;
    const user: any = await this.authService.register(email, password)
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

  // async register() {
  //   this.authService.register(this.email, this.password)
  //     .then((result) => {
  //       console.log('Registration successful', result);
  //       this.router.navigate(['/login']);
  //     })
  //     .catch((error) => {
  //       console.error('Registration error', error);
  //     });
  // }
}
