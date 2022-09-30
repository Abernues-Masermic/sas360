import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Installation } from '@shared/models/installation.interface';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InstallationService {
  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<Installation[]> {
    console.log(`SERVICE GET ALL INSTALLATION`);
    return this.http
      .get<Installation[]>(`${environment.API_URL}/installation`)
      .pipe(catchError(this.handleError));
  }

  getById(installationId: number): Observable<Installation> {
    console.log(`SERVICE GET INSTALLATION BY ID ${installationId}`);
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
    console.log(
      `SERVICE UPDATE INSTALLATION ID ${installationId}`,
      installation
    );
    return this.http
      .patch<Installation>(
        `${environment.API_URL}/installation/${installationId}`,
        installation
      )
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  delete(installationId: number): Observable<any> {
    console.log(`SERVICE DELETE INSTALLATION ID ${installationId}`);
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
      if (Array.isArray(error.error)) {
        error.error.forEach(function (value: any) {
          console.log(value.constraints);
        });
      } else {
        console.log('Installation handle error', error.error);
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
