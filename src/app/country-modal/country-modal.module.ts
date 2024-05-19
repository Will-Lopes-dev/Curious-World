import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryModalPageRoutingModule } from './country-modal-routing.module';

import { CountryModalPage } from './country-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryModalPageRoutingModule
  ],
  declarations: [CountryModalPage]
})
export class CountryModalPageModule {}
