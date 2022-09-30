import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '@shared/material.module';
import { UserPipe } from '@shared/pipes/user.pipe';

@NgModule({
  declarations: [UsersComponent, UserPipe],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
  providers: [UserPipe],
})
export class UsersModule {}
