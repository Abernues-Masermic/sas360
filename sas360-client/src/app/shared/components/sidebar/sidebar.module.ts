import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { UtilsService } from '@shared/services/utils.service';
import { MaterialModule } from '@shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [SidebarComponent],
  providers: [UtilsService],
})
export class SidebarModule {}
