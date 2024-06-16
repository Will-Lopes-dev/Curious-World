import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  emailUser: any;

  constructor(public authService: AuthService, public auth: AngularFireAuth) {}

  ngOnInit() {
    this.getNameProfile();
  }
  
  async getNameProfile() {
  this.authService.getProfile().then(user => {
    if(user) {
      this.emailUser = user.email;
    }
    console.log(this.emailUser);
  })
}
  
    //   const user = await this.authService.getProfile();
  //   if(user) {
  //     const uid = user.uid;
  //     const name = await this.authService.getProfile(uid);
  //     if (name) {
  //       this.nameUser = name;
  //       console.log(this.nameUser)
  //     }else (
  //       console.log('deu ruim')
  //     )
  //   }
  // }
}
