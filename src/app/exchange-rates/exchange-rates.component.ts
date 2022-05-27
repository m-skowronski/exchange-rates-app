import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../services/exchange-rates.service';
import { ExchangeRatesTable } from '../exchange-rates-table.model';
import { ThemeService } from '../services/theme.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRatesTable: ExchangeRatesTable = {
    table: '',
    no: '',
    effectiveDate: '',
    rates: []
  };

  stateOptions: any[];
  theme: String = "light-indigo";
  date: Date | undefined;

  constructor(private exchangeRatesService: ExchangeRatesService, private themeService: ThemeService) { 
    this.stateOptions = [{label: 'Jasny', value: 'light-indigo'}, {label: 'Ciemny', value: 'dark-indigo'}];
  }

  ngOnInit(): void {
    this.getExchangeRatesTable();
  }

  getExchangeRatesTable(): void {
    this.exchangeRatesService.getAll().subscribe(
      (rates) => {
        this.exchangeRatesTable = rates[0];
      },
      (error) => {
        error.log('error caught');
        this.exchangeRatesTable = {
          table: '',
          no: '',
          effectiveDate: '',
          rates: []
        };
      }
    );
  }

  getExchangeRatesTableFromDate(date: String): void {
    this.exchangeRatesService.getFromDate(date).subscribe(
      (rates) => {
        this.exchangeRatesTable = rates[0];
      },
      (error) => {
        console.error('error caught');
        this.exchangeRatesTable = {
          table: '',
          no: '',
          effectiveDate: '',
          rates: []
        };
      }
    );
  }

  changeTheme(): void {
    this.themeService.switchTheme(this.theme);
  }

  clear(table: Table) {
    this.getExchangeRatesTable();
    table.clear();
    this.date = undefined;
  }

  onDateChange() {
    if(this.date) {
      console.log(this.date);
      let parsedDate: String = this.date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      this.getExchangeRatesTableFromDate(parsedDate);
    } else {
      console.log('wrong date format');
      this.exchangeRatesTable = {
        table: '',
        no: '',
        effectiveDate: '',
        rates: []
      };
    }
  }
}
