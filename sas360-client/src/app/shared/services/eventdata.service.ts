import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eventdata } from '@shared/models/eventdata.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EventdataService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<Eventdata[] | any> {
    console.log(`SERVICE GET ALL EVET DATA`);
    return this.http
      .get<Eventdata[]>(`${environment.API_URL}/event`)
      .pipe(catchError(this.handleError));
  }

  getByDeviceName(devicename: string): Observable<Eventdata[] | any> {
    return this.http
      .get<Eventdata[]>(`${environment.API_URL}/event/${devicename}`)
      .pipe(catchError(this.handleError));
  }

  update(id: number, event: Eventdata): Observable<any> {
    console.log(`SERVICE UPDATE EVENT ID: ${id}`, event);
    let body = { state: event.state };

    return this.http
      .patch<any>(
        `${environment.API_URL}/event/${id}`,
        JSON.stringify(event),
        this.httpOptions
      )
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  delete(eventId: number): Observable<any> {
    console.log(`SERVICE DELETE EVENT ID: ${eventId}`);
    return this.http
      .delete<any>(`${environment.API_URL}/event/${eventId}`)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error) {
      errorMessage = `Error ${error.message}`;
      console.log('event handle error');
      error.error.forEach(function (value: any) {
        console.log(value.constraints);
      });
    }
    return throwError(() => new Error(errorMessage));
  }
}
