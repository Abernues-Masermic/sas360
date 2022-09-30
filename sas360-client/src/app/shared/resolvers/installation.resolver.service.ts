import { catchError, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Installation } from '@shared/models/installation.interface';
import { InstallationService } from '@pagesadmin/services/installation.service';
import { GlobalConstants } from '@shared/utils/global-constants';

@Injectable({ providedIn: 'root' })
export class InstallationResolverService implements Resolve<Installation[]> {
  constructor(
    private readonly installationSvc: InstallationService,
    private readonly router: Router,
    private toastSrv: ToastrService
  ) {}

  resolve(): Observable<Installation[]> {
    return this.installationSvc.getAll().pipe(
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
