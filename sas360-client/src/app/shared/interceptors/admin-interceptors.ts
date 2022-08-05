import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  constructor(private authScv: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('user')) {
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
