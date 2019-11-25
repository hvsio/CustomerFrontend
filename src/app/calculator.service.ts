import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Calculation} from 'src/app/modules/calculation-request';
import {catchError, retry} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  server = 'http://127.0.0.1:5000/testfront';
  errorResponse: any;

  constructor(private http: HttpClient) {
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // };
  //
  // getBanks(): Observable<Calculation> {
  //   return this.http
  //     .get<Calculation>(this.server)
  //     .pipe(retry(2), catchError(this.handleError));
  // }


  getCalculations(fromCountr: string,
                  toCountr: string,
                  fromCurrency: string,
                  toCurrency: string,
                  amountMone: string,
                  amountTransaction: string): Observable<HttpResponse<Object>> {
    return this.http.get(this.server, {
      params: {
        fromCountry: fromCountr,
        toCountry: toCountr,
        fromCur: fromCurrency,
        toCur: toCurrency,
        amountMoney: amountMone,
        amountTransactions: amountTransaction
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
