import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {observable, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment.prod';

const N1_SERVER =  environment.comparatorBackend;

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

  isQuoteAvailable(): Observable<HttpResponse<Object>> {
    return this.http.get(`${N1_SERVER}` + '/available', { observe: 'response'} ) ;
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
