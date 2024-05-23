import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { CountryModalPage } from '../country-modal/country-modal.page';
// import _ from 'lodash';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  countries: any[] = [];
  allCountries: any[] = [];
  firstCurrencies: { countryName: string, name: string, symbol: string }[] = [];
  batchSize: number = 10;
  startIndex: number = 0;
  filteredCountries: any[] = [];



  nomeUsuario: string = 'Nome do Usuário'; // Substitua pelo nome do usuário logado


  constructor(private apiService: ApiService, private modalController: ModalController) {
    this.allCountries = this.countries;
  }

  ngOnInit() {
    this.loadCountries();
  }



  loadCountries() {
    this.apiService.getCountries(this.batchSize, this.startIndex).subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          data.forEach(country => {
            if (country.currencies) {
              const firstCurrencyKey = Object.keys(country.currencies)[0];
              const firstCurrency = country.currencies[firstCurrencyKey];
              country.firstCurrency = firstCurrency;
            }
          });
          this.allCountries = this.allCountries.concat(data);
          this.startIndex += this.batchSize; 
          console.log(this.allCountries);
        }
      },
      error: (error: any) => {
        console.error("Erro ao carregar países", error);
      }
    });
  }

  filterCountries(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm) {
      this.countries = this.allCountries.filter(country => {
        return country.translations.por.common.toLowerCase().startsWith(searchTerm);
      });
    } else {
      this.countries= [];
      this.countries = this.allCountries.slice(0, this.startIndex);
    }
  }

  
  onScroll(event: any) {
    const scrollElement = event.target;
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const clientHeight = scrollElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.loadCountries();
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
