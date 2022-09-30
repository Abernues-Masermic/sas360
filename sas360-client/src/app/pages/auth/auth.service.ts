import { UserResponse, User } from '@shared/models/user.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { saveLocalUser, getLocalUser } from '@shared/utils/local-storage';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse | null>(null);
  private tokenExpired = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get user$(): Observable<UserResponse | null> {
    return this.user.asObservable();
  }
  get userValue(): UserResponse | null {
    return this.user.getValue();
  }

  get tokenExpired$(): Observable<boolean> {
    return this.tokenExpired.asObservable();
  }
  get tokenExpiredValue(): boolean {
    return this.tokenExpired.getValue();
  }

  login(authData: User): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((userresponse: UserResponse) => {
          saveLocalUser(userresponse, authData.username);
          this.user.next(userresponse);
          this.tokenExpired.next(false);
          return userresponse;
        }),
        catchError(err => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    let user = getLocalUser();
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        console.log('Check auth token -> Token expired');
        this.router.navigate(['/login']);
      } else {
        console.log('Check auth token -> OK');
        this.user.next(user);
      }

      this.tokenExpired.next(isExpired);
    }
  }

  private handlerError(error: any): Observable<never> {
    let errorMessage = '';
    if (error) {
      errorMessage = `Error ${error.message}`;
      if (Array.isArray(error.error)) {
        error.error.forEach(function (value: any) {
          console.log(value.constraints);
        });
      } else {
        console.log('Auth handle error', error.error);
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
