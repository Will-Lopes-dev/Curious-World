import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.page.html',
  styleUrls: ['./initial.page.scss'],
})
export class InitialPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  closePage() {
    this.navCtrl.navigateBack('/home');
  }

}
