import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserResolverService } from '@shared/resolvers/user.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    resolve: { users: UserResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
