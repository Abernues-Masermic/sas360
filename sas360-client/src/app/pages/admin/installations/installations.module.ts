import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material.module';

import { InstallationsRoutingModule } from './installations-routing.module';
import { InstallationsComponent } from './installations.component';

@NgModule({
  declarations: [InstallationsComponent],
  imports: [CommonModule, InstallationsRoutingModule, MaterialModule],
})
export class InstallationsModule {}
