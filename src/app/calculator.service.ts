import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';

import {catchError, retry} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const SERVER_URL = environment.comparatorBackend;

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
                  amountTransaction: string): Observable<HttpResponse<any>> {
    return this.http.get(`${SERVER_URL}` + '/banksuppliers', {
      params: {
        fromCountry: fromCountr,
        toCountry: toCountr,
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        volume: amountMone,
        nrTransactions: amountTransaction
      }, observe: 'response'
    }).pipe(catchError((err: HttpErrorResponse) => {

      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
      }

      // ...optionally return a default fallback value so app can continue (pick one)
      // which could be a default value
      // return Observable.of<any>({my: "default value..."});
      // or simply an empty observable
      return throwError('Something bad happened; please try again later.');
    }));
  }


  //
  // handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.log(`${error.error}`);
  //     this.setResponse(`${error.error}`);
  //     return of(result as T);
  //   };
  // }

  setResponse(text: string) {
    this.errorResponse = text;
  }

  getResponse() {
    return this.errorResponse;
  }

}



