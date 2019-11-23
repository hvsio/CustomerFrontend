import {Component, OnInit} from '@angular/core';
import {CalculatorService} from '../calculator.service';
import {Calculation} from '../modules/calculation-request';


import {MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import {MatIconRegistry} from '@angular/material/typings/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {AppComponent} from 'src/app/app.component';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {

  constructor(private service: CalculatorService,
              private domSanitizer: DomSanitizer,
              public app: AppComponent,
              private calc: Calculation) {
  }

  results: any;
  displayedColumns: string[] = ['name', 'exchangeRate', 'fee', 'totalCost', 'extraCost'];
  isLoading = true;

  ngOnInit() {
    this.getBanks();
  }

  getBanks() {
    this.service.getCalculations(this.calc.fromCountry, this.calc.toCountry,
      this.calc.fromCurrency, this.calc.toCurrency,
      this.calc.amountMoney, this.calc.amountTransactions).subscribe(
      res => {
        this.results = new MatTableDataSource();
        this.results.data = res;
        this.isLoading = false;
      }
    );
  }

}
