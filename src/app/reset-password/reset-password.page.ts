import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: any;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async resetPassword() {
    this.authService.resetPassword(this.email).then(()=>{
      console.log('link de redefinição enviado');
      this.router.navigate(['/login']);
    }).catch((error)=>{
      console.log(error);
    });
  }

}
