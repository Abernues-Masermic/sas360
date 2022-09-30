import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeodataRoutingModule } from './geodata-routing.module';
import { GeodataComponent } from './geodata.component';
import { GeodataTableModule } from '@dbresource/table/geodata-table/geodata-table.module';

@NgModule({
  declarations: [GeodataComponent],
  imports: [
    CommonModule,
    MaterialModule,
    GeodataRoutingModule,
    GeodataTableModule,
  ],
})
export class DataModule {}
