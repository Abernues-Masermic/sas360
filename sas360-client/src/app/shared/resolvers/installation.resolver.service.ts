import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Installation } from '@shared/models/installation.interface';
import { InstallationsService } from '@pagesadmin/services/installations.service';

@Injectable({ providedIn: 'root' })
export class InstallationResolverService implements Resolve<Installation> {
  constructor(private readonly installationSvc: InstallationsService) {}

  resolve(): Observable<Installation> {
    return this.installationSvc.getAll();
  }
}
