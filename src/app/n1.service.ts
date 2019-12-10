import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {observable, Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const N1_SERVER = environment.comparatorBackend;

@Injectable({
  providedIn: 'root',
})
export class N1Service {

  errorResponse: any;

  constructor(private http: HttpClient) {
  }

  getAvailableCountries() {
    return this.http.get(`${N1_SERVER}` + '/fromcountries').pipe(
      catchError(this.handleError<any>('data')));
  }

  getAvailableCurrencies(chosenCountry: string) {
    return this.http.get(`${N1_SERVER}` + '/allowedcurrencies?countryCode=' + chosenCountry);
  }

  isQuoteAvailable() {
    return this.http.get(`${N1_SERVER}` + '/available').pipe(
      catchError((err: HttpErrorResponse) => {

      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      return throwError('Something bad happened; please try again later.');
    }));
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.message);
      this.setResponse(error.message);
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
