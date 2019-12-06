import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

const N1_SERVER = 'http://35.222.69.129:13022';

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
