import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@shared/models/user.interface';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private _refreshRequired = new Subject<void>();
  get RefreshRequired() {
    return this._refreshRequired;
  }

  getAll(): Observable<User[] | any> {
    return this.http
      .get<User[]>(`${environment.API_URL}/user`)
      .pipe(catchError(this.handleError));
  }

  getById(userId: number): Observable<User> {
    return this.http
      .get<User>(`${environment.API_URL}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  new(user: User): Observable<any> {
    console.log('SERVICE NEW USER', user);
    return this.http
      .post<User>(`${environment.API_URL}/user`, user)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  update(userId: number, user: User): Observable<User> {
    return this.http
      .patch<User>(`${environment.API_URL}/user/${userId}`, user)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  delete(userId: number): Observable<any> {
    return this.http
      .delete<User>(`${environment.API_URL}/user/${userId}`)
      .pipe(tap(() => this.RefreshRequired.next()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
