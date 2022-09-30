import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material.module';
import { GeodataTableComponent } from '@dbresource/table/geodata-table/geodata-table.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GeodataTableComponent],
  exports: [GeodataTableComponent],
  imports: [CommonModule, MaterialModule],
})
export class GeodataTableModule {}
