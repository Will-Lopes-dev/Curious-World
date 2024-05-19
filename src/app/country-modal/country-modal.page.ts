import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.page.html',
  styleUrls: ['./country-modal.page.scss'],
})
export class CountryModalPage {
  country: any;
  safeGoogleMapsUrl: SafeResourceUrl;
  safeOpenStreetMapsUrl: SafeResourceUrl;

  constructor(private modalController: ModalController, private navParams: NavParams, private sanitizer: DomSanitizer) { 
    this.country = this.navParams.get('country');

    // Sanitize the map URLs
    this.safeGoogleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.country.maps.googleMaps);
    this.safeOpenStreetMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.country.maps.openStreetMaps);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getFirstCurrency(country: any) {
    if (country.currencies) {
      const firstCurrencyKey = Object.keys(country.currencies)[0];
      return country.currencies[firstCurrencyKey];
    }
    return null;
  }

}