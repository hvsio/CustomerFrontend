import {Component, OnInit} from '@angular/core';

import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';
import {CalculatorService} from './calculator.service';
import {MatTableDataSource} from '@angular/material';

import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {N1Service} from './n1.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private service: CalculatorService,
              private N1service: N1Service,
              private registry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.registry.addSvgIcon(`exchange-arrows`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/exchange-arrows.svg'));
    this.registry.addSvgIcon(`question-mark`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/question-mark.svg'));
    this.registry.addSvgIcon(`express-transfer`, this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/express-transfer.svg'));
  }

  amount = new FormControl('',
    [Validators.required,
      Validators.min(1000),
      Validators.max(10000000)]);

  frequency = new FormControl('',
    [Validators.required,
      Validators.min(1),
      Validators.max(10000000)]);

  toCountries: any = countries;

  toCurrency: any[];
  fromCountries: any[];
  fromCurrency: any[];

  selectedCurrencyTo = '';
  selectedCurrencyFrom = '';

  selectedCountryToFull = '';
  selectedCountryTo = '';
  selectedCountryFromFull = '';
  selectedCountryFrom = '';

  results: any;
  displayedColumns: string[] = ['name', 'exchangeRate', 'totalFee', 'totalCost', 'savings'];

  isServiceAvailable: boolean;
  submitSent = false;
  isLoading: boolean = false;
  isLoaded = false;
  bankSuppliers: any;

  NOVEMBER_FIRST_COST;
  savings: number;
  private arr: { [p: string]: unknown }[];

  submitForm(amountMoney: string, amountTransactions: string) {
    if (this.getAmountTruth() && this.getFrequencyTruth() && this.selectedCountryFrom !== '' && this.selectedCountryTo !== '' &&
      this.selectedCurrencyFrom !== '' && this.selectedCurrencyTo !== '') {
      this.isLoading = true;
      this.submitSent = true;
      this.service.getCalculations(this.selectedCountryFrom, this.selectedCountryTo,
        this.selectedCurrencyFrom, this.selectedCurrencyTo,
        amountMoney, amountTransactions).subscribe((response) => {
          this.bankSuppliers = response['body'];
          this.bankSuppliers.sort((a, b) => a['totalCost'] === b['totalCost'] ? 0 : a['totalCost'] > b['totalCost'] ? 1 : -1);
          console.log(this.bankSuppliers);
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
  }


  getN1Countries() {
    this.N1service.getAvailableCountries().subscribe(
      data => {
        this.N1service.isQuoteAvailable().subscribe(response => {
          console.log(' response is :' + response);
          if (response['status'] === 'ok') {
            this.isServiceAvailable = true;
            console.log("inside if = " + this.isServiceAvailable);
          }
          else {
            this.isServiceAvailable = false;
            console.log("inside else = " + this.isServiceAvailable);
          }
        });
        this.fromCountries = Object.entries(data).map(([k, v]) => ({country: v, abbreviation: k}));
        console.log(this.fromCountries);
        console.log("out of is quote available = " + this.isServiceAvailable);

      });
    console.log('outside of subscribe is: '+this.isServiceAvailable);
  }

  getAvailableCurrencies(chosenCountry: string) {
    console.log(chosenCountry);
    this.N1service.getAvailableCurrencies(chosenCountry).subscribe(
      data => {
        this.fromCurrency = Object.entries(data['FromCurrencies']).map(([k, v]) => ({currency: v}));
        this.toCurrency = Object.entries(data['ToCurrencies']).map(([k, v]) => ({currency: v}));
        console.log(data['ToCurrencies']);
        console.log(this.fromCurrency);
      });
  }

  checkName(fromCurrency: string) {
    return fromCurrency;
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
      this.getAvailableCurrencies(this.selectedCountryFrom);
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

  selectCountryFrom(value: string, fullName: string) {
    this.selectedCountryFromFull = fullName;
    this.selectedCountryFrom = value;
    this.getAvailableCurrencies(value);
    console.log(this.selectedCountryFrom);
  }

  selectCountryTo(value: string, fullName: string) {
    this.selectedCountryToFull = fullName;
    this.selectedCountryTo = value;
    console.log(this.selectedCountryTo);
  }

  getErrorMessageAmount(): string {
    return this.amount.hasError('required') ? 'You must enter a value' :
      this.amount.hasError('min') ? 'Amount of money must be more than 1000' :
        this.amount.hasError('max') ? 'Amount of money must be less than 10 000 000' : '';
  }

  getAmountTruth(): boolean {
    return this.amount.hasError('required') ? false :
      this.amount.hasError('min') ? false :
        this.amount.hasError('max') ? false : true;
  }

  getErrorMessageFrequency(): string {
    return this.frequency.hasError('required') ? 'You must enter a value' :
      this.frequency.hasError('min') ? 'Frequency must be more than 1' :
        this.frequency.hasError('max') ? 'Frequency must be less than 10 000 000' : '';
  }

  getFrequencyTruth(): boolean {
    return this.frequency.hasError('required') ? false :
      this.frequency.hasError('min') ? false :
        this.frequency.hasError('max') ? false : true;
  }

  ngOnInit(): void {
     this.getN1Countries();
     this.isServiceAvailable = true;
    }
  }

