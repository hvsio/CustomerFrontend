import {Component, OnInit} from '@angular/core';

import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import {CalculatorService} from './calculator.service';
import {Router} from '@angular/router';
import {Calculation} from './modules/calculation-request';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // banks: any;


  constructor(private service: CalculatorService,
              public router: Router,
              public calc: Calculation) {
  }


  curr: any = currencies;
  countrs: any = countries;

  selectedCurrencyTo = '';
  selectedCurrencyFrom = '';

  selectedCountryTo = '';
  selectedCountryFrom = '';

  // testable
  results: any;
  displayedColumns: string[] = ['bank', 'exchange', 'fee', 'cost'];
  isLoading = true;
  //
  // submitForm(amountMoney: string, amountTransactions: string) {
  //   this.service.getCalculations(this.selectedCountryFrom, this.selectedCountryTo,
  //     this.selectedCurrencyFrom, this.selectedCurrencyTo,
  //     amountMoney, amountTransactions).subscribe((response) => {
  //       this.results = new MatTableDataSource();
  //       this.results.data = response;
  //       this.isLoading = false;
  //     }
  //   );

  submitForm(amountMoney: string, amountTransactions: string) {
    this.service.getCalculations(this.selectedCountryFrom, this.selectedCountryTo,
      this.selectedCurrencyFrom, this.selectedCurrencyTo,
      amountMoney, amountTransactions).subscribe((response) => {
        this.results = new MatTableDataSource();
        this.results.data = response;
        console.log(response);
        console.log(this.results);
        console.log(this.results.data);
        this.isLoading = false;
      }
    );


    // this.service.getBanks(this.data).subscribe((response) =>{
    //   this.router.navigate(['table']);
    //   console.log(response);
    // });
  }

  onEnterCountryTo(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCountryTo = s;
      console.log(this.selectedCountryTo);
    }
  }

  onEnterCountryFrom(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCountryFrom = s;
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
