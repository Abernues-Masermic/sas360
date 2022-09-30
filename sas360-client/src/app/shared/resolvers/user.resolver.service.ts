import { catchError, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@pagesadmin/services/user.service';
import { User } from '@shared/models/user.interface';
import { GlobalConstants } from '@shared/utils/global-constants';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User[]> {
  constructor(
    private readonly userSvc: UserService,
    private readonly router: Router,
    private toastSrv: ToastrService
  ) {}

  resolve(): Observable<User[]> {
    return this.userSvc.getAll().pipe(
      catchError(err => {
        this.toastSrv.error(err, 'SAS360 message', {
          timeOut: GlobalConstants.toastTimeout,
        });
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );
  }
}
