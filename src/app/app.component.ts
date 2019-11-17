import { Component } from '@angular/core';


import currencies from 'src/assets/json/currencies.json';
import countries from 'src/assets/json/countries.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'november1-front-end';



  constructor() { }
  curr: any = currencies;
  countrs: any = countries;


  selectedCurr = '';
  selectedCoun = '';

  onEnterCoun(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCoun = s;
    }
  }

  onEnterCurr(evt: any, s: string) {
    if (evt.source.selected) {
      this.selectedCurr = s;
    }
  }


  selectCurrency(value: string) {
    this.selectedCurr = value;
  }

  selectCountry(value: string) {
    this.selectedCoun = value;
  }


}
