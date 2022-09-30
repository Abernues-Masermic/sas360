import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';

import { AdminRoutingModule } from '@pagesadmin/admin-routing.module';
import { AdminComponent } from '@pagesadmin/admin.component';
import { ModalUserComponent } from '@pagesadmin/modal-components/modal-user/modal-user.component';
import { ModalInstallationComponent } from '@pagesadmin/modal-components/modal-installation/modal-installation.component';
import { ModalDeviceComponent } from '@pagesadmin/modal-components/modal-device/modal-device.component';

@NgModule({
  declarations: [
    AdminComponent,
    ModalUserComponent,
    ModalInstallationComponent,
    ModalDeviceComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
