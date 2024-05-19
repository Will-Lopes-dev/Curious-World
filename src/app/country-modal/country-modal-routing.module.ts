import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryModalPage } from './country-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CountryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryModalPageRoutingModule {}
