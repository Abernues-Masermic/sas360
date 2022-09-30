import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@pages/auth/auth.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authScv: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const conditions = ['user', 'installation', 'device'];
    let including_route: boolean = false;
    conditions.forEach(condition => {
      if (!including_route) {
        including_route = req.url.includes(condition);
      }
    });

    if (including_route) {
      const userValue = this.authScv.userValue;
      if (userValue) {
        const authReq = req.clone({
          setHeaders: {
            auth: userValue?.token,
          },
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
