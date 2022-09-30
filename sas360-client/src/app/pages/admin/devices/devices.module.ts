import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';
import { DevicePipe } from '@shared/pipes/device.pipe';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';

@NgModule({
  declarations: [DevicesComponent, DevicePipe],
  imports: [CommonModule, DevicesRoutingModule, MaterialModule],
  providers: [DevicePipe],
})
export class DevicesModule {}
