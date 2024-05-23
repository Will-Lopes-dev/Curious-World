import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'https://restcountries.com/v3/all'

  constructor(private https: HttpClient) { }

  getCountries(batchSize: number, startIndex: number): Observable<any[]> {
    const api = `${this.url}?limit=${batchSize}&offset=${startIndex}`
    return this.https.get<any[]>(api);
  }
}
