import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geodata } from '@shared/models/geodata.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<Geodata[] | any> {
    return this.http
      .get<Geodata[]>(`${environment.API_URL}/data`)
      .pipe(catchError(this.handleError));
  }

  getByDeviceName(devicename: string): Observable<Geodata[] | any> {
    return this.http
      .get<Geodata[]>(`${environment.API_URL}/data/${devicename}`)
      .pipe(catchError(this.handleError));
  }

  delete(devicename: string): Observable<any> {
    return this.http
      .delete<Geodata>(`${environment.API_URL}/data/${devicename}`)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error) {
      errorMessage = `Error ${error.message}`;
      console.log('data handle error');
      error.error.forEach(function (value: any) {
        console.log(value.constraints);
      });
    }
    return throwError(() => new Error(errorMessage));
  }
}
