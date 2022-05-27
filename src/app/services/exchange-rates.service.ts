import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeRatesTable } from '../exchange-rates-table.model';


@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private apiUrl: String = 'http://api.nbp.pl/api';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExchangeRatesTable[]> {
    return this.http.get<ExchangeRatesTable[]>(
      this.apiUrl + '/exchangerates/tables/A/?format=json', { 
        responseType: 'json' 
      });
  }

  getFromDate(date: String): Observable<ExchangeRatesTable[]> {
    return this.http.get<ExchangeRatesTable[]>(
      this.apiUrl + '/exchangerates/tables/A/' + date +'/?format=json', { 
        responseType: 'json' 
      });
  }
}
