import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Installation } from '@shared/models/installation.interface';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstallationsService {
  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<Installation[] | any> {
    return this.http
      .get<Installation[]>(`${environment.API_URL}/installation`)
      .pipe(catchError(this.handleError));
  }

  getById(installationId: number): Observable<Installation> {
    return this.http
      .get<Installation>(
        `${environment.API_URL}/installation/${installationId}`
      )
      .pipe(catchError(this.handleError));
  }

  new(installation: Installation): Observable<any> {
    console.log('SERVICE NEW INSTALLATION', installation);
    return this.http
      .post<Installation>(`${environment.API_URL}/installation`, installation)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  update(
    installationId: number,
    installation: Installation
  ): Observable<Installation> {
    return this.http
      .patch<Installation>(
        `${environment.API_URL}/installation/${installationId}`,
        installation
      )
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  delete(installationId: number): Observable<any> {
    return this.http
      .delete<Installation>(
        `${environment.API_URL}/installation/${installationId}`
      )
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    //TODO -> Send handle error to the component
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
