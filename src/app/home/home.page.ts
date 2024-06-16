import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { CountryModalPage } from '../country-modal/country-modal.page';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  allCountries: any[] = [];
  countriesPerPage: any[] = [];
  countries: any[] = [];
  batchSize: number = 10;
  startIndex: number = 0;

  constructor(private apiService: ApiService, private modalController: ModalController, public authService: AuthService) {}

  ngOnInit() {
    this.loadAllCountries();
  }

  loadAllCountries() {
    this.apiService.getCountries().subscribe({
      next: (data: any[]) => {
        this.allCountries = data;
        if (data.length > 0) {
          data.forEach(country => {
            if (country.currencies) {
              const firstCurrencyKey = Object.keys(country.currencies)[0];
              const firstCurrency = country.currencies[firstCurrencyKey];
              country.firstCurrency = firstCurrency;
            }
          });
        }
        this.loadMoreCountries();
      },
      error: (error: any) => {
        console.error("Erro ao carregar países", error);
      }
    });
  }

  loadMoreCountries() {
    const endIndex = this.startIndex + this.batchSize;
    const newCountries = this.allCountries.slice(this.startIndex, endIndex);
    this.countries.push(...newCountries);
    this.startIndex = endIndex;
  }

  filterCountries(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm) {
      this.countries = this.allCountries.filter(country => {
        return country.translations.por.common.toLowerCase().startsWith(searchTerm);
      });
    } else {
      this.resetPagination();
    }
  }

  resetPagination() {
    this.startIndex = 0;
    this.countries = this.allCountries.slice(0, this.batchSize);
  }

  onScroll(event: any) {
    const scrollElement = event.target;
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const clientHeight = scrollElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadMoreCountries();
    }
  }

  async openCountryModal(country: any) {
    const modal = await this.modalController.create({
      component: CountryModalPage,
      componentProps: {
        country: country,
        firstCurrencyName: country.firstCurrencyName,
        firstCurrencySymbol: country.firstCurrencySymbol,
        maps: country.maps // Supondo que 'maps' é o nome da propriedade em 'country' que contém os links do mapa
      }
    });
    return await modal.present();
  }
}
