import { catchError, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstants } from '@shared/utils/global-constants';
import { Device } from '@shared/models/device.interface';
import { DeviceService } from '@pagesadmin/services/device.service';

@Injectable({ providedIn: 'root' })
export class DeviceResolverService implements Resolve<Device[]> {
  constructor(
    private readonly deviceSvc: DeviceService,
    private readonly router: Router,
    private toastSrv: ToastrService
  ) {}

  resolve(): Observable<Device[]> {
    return this.deviceSvc.getAll().pipe(
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
