import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UsersService } from '@pagesadmin/services/users.service';
import { User } from '@shared/models/user.interface';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User> {
  constructor(private readonly userSvc: UsersService) {}

  resolve(): Observable<User> {
    return this.userSvc.getAll();
  }
}
