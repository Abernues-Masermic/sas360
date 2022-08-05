import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstallationsRoutingModule } from './installations-routing.module';
import { InstallationsComponent } from './installations.component';
import { MaterialModule } from '@shared/material.module';

@NgModule({
  declarations: [InstallationsComponent],
  imports: [CommonModule, InstallationsRoutingModule, MaterialModule],
})
export class InstallationsModule {}
