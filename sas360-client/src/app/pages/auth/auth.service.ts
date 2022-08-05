import { UserResponse, User } from '@shared/models/user.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  login(user: User): Observable<UserResponse> {
    const userresponse: UserResponse = {
      message: 'Logged',
      token: '1234',
      refreshToken: '1234',
      userId: 1,
      role: 'ADMIN',
    };
    this.saveLocalStorage(userresponse);
    this.user.next(userresponse);
    this.tokenExpired.next(false);

    return of(userresponse);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const item = localStorage.getItem('user');
    if (item) {
      const user = JSON.parse(item) || null;
      if (user) {
        const isExpired = false;
        //const isExpired = helper.isTokenExpired(user.token);
        const tokenUser = isExpired ? null : user;
        this.user.next(tokenUser);
        this.tokenExpired.next(isExpired);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }
}
