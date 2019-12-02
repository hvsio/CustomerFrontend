import {Component, OnInit} from '@angular/core';

import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import {CalculatorService} from './calculator.service';
import {MatTableDataSource} from '@angular/material';

import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private service: CalculatorService,
              private registry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.registry.addSvgIcon(`exchange-arrows`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/exchange-arrows.svg'));
    this.registry.addSvgIcon(`question-mark`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/question-mark.svg'));
  }


  curr: any = currencies;
  countrs: any = countries;

  selectedCurrencyTo = '';
  selectedCurrencyFrom = '';

  selectedCountryToFull = '';
  selectedCountryTo = '';
  selectedCountryFromFull = '';
  selectedCountryFrom = '';

  results: any;
  displayedColumns: string[] = ['name', 'exchangeRate', 'totalFee', 'totalCost', 'savings'];

  isLoading = false;
  isLoaded = false;
  bankSuppliers: any;
  submitSent = false;

  NOVEMBER_FIRST_COST;
  savings: number;

  submitForm(amountMoney: string, amountTransactions: string) {
    this.isLoading = true;
    this.submitSent = true;
    this.service.getCalculations(this.selectedCountryFrom, this.selectedCountryTo,
      this.selectedCurrencyFrom, this.selectedCurrencyTo,
      amountMoney, amountTransactions).subscribe((response) => {
        this.bankSuppliers = response['body'];
        this.bankSuppliers.sort((a, b) => a['totalCost'] === b['totalCost'] ? 0 : a['totalCost'] > b['totalCost'] ? 1 : -1);
        console.log(this.bankSuppliers)
        this.results = new MatTableDataSource(this.bankSuppliers);
        this.isLoading = false;
        this.isLoaded = true;

        Object.keys(this.bankSuppliers).some(key => {
          console.log(this.bankSuppliers[key]['name']);
          if (this.bankSuppliers[key]['name'] === 'November First') {
            this.NOVEMBER_FIRST_COST = this.bankSuppliers[key]['totalCost'];
            console.log(this.NOVEMBER_FIRST_COST);
          }
          }
        );
      }
    );
  }

  calculateSavings(bankCost: number, N1Cost: number): number {
    this.savings = bankCost - N1Cost;
    return this.savings;
    }

  onEnterCountryTo(evt: any, abbrev: string, fullName: string) {
    if (evt.source.selected) {
      this.selectedCountryTo = abbrev;
      this.selectedCountryToFull = fullName;
      console.log(this.selectedCountryTo);
    }
  }

  onEnterCountryFrom(evt: any, abbrev: string, fullName: string) {
    if (evt.source.selected) {
      this.selectedCountryFrom = abbrev;
      this.selectedCountryFromFull = fullName;
      console.log(this.selectedCountryFrom);
    }
  }

  onEnterCurrencyTo(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCurrencyTo = s;
      console.log(this.selectedCurrencyTo);
    }
  }

  onEnterCurrencyFrom(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCurrencyFrom = s;
      console.log(this.selectedCurrencyFrom);
    }
  }

  selectCurrencyFrom(value: string) {
    this.selectedCurrencyFrom = value;
    console.log(this.selectedCurrencyFrom);
  }

  selectCurrencyTo(value: string) {
    this.selectedCurrencyTo = value;
    console.log(this.selectedCurrencyTo);
  }

  selectCountryFrom(value: string) {
    this.selectedCountryFrom = value;
    console.log(this.selectedCountryFrom);
  }

  selectCountryTo(value: string) {
    this.selectedCountryTo = value;
    console.log(this.selectedCountryTo);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
