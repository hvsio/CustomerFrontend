import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from 'src/environments/environment.prod';

const SERVER_URL = environment.comparatorBackend ;

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  errorResponse: any;

  constructor(private http: HttpClient) {
  }

  getCalculations(fromCountr: string,
                  toCountr: string,
                  fromCurrency: string,
                  toCurrency: string,
                  amountMone: string,
                  amountTransaction: string): Observable<HttpResponse<Object>> {
    return this.http.get( `${SERVER_URL}` + '/banksuppliers', {
      params: {
        fromCountry: fromCountr,
        toCountry: toCountr,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        volume: amountMone,
        nrTransactions: amountTransaction
      }, observe: 'response'
    });
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${error.error.errors}`);
      this.setResponse(`${error.error.errors}`);
      return of(result as T);
    };
  }

  setResponse(text: string) {
    this.errorResponse = text;
  }

  getResponse() {
    return this.errorResponse;
  }
}
