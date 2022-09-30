import { Pipe, PipeTransform } from '@angular/core';
import { RoleType, User } from '@shared/models/user.interface';

@Pipe({
  name: 'usertype',
})
export class UserPipe implements PipeTransform {
  transform(users: User[], _args: any): User[] {
    let result: User[] = [];
    for (const user of users) {
      switch (user.role) {
        case RoleType.OPERATOR: {
          user.sRole = 'OPERATOR';
          break;
        }
        case RoleType.ADMIN: {
          user.sRole = 'ADMIN';
          break;
        }
        case RoleType.SUPERADMIN: {
          user.sRole = 'SUPERADMIN';
          break;
        }
      }

      result = [...result, user];
    }

    return result;
  }
}
