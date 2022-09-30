import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GeodataTableModule } from '@dbresource/table/geodata-table/geodata-table.module';
import { EventTableComponent } from '@dbresource/table/event-table/event-table.component';
import { GeodataFilterComponent } from '@dbresource/filter/geodata-filter/geodata-filter.component';
import { EventFilterComponent } from '@dbresource/filter/event-filter/event-filter.component';
import { GeodataLinechartComponent } from '@dbresource/chart/geodata-linechart/geodata-linechart.component';
import { GeodataBublechartComponent } from '@dbresource/chart/geodata-bublechart/geodata-bublechart.component';
import { EventBarchartComponent } from '@dbresource/chart/event-barchart/event-barchart.component';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { SpinnerInterceptor } from '@shared/interceptors/spinner.interceptor';
import { EventdataPipe } from '@shared/pipes/eventdata.pipe';
import { GeodataPipe } from '@shared/pipes/geodata.pipe';
import { MaterialModule } from '@shared/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    HomeComponent,
    GeodataFilterComponent,
    EventTableComponent,
    GeodataLinechartComponent,
    GeodataBublechartComponent,
    GeodataPipe,
    EventBarchartComponent,
    EventTableComponent,
    EventFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    SpinnerModule,
    MatDatepickerModule,
    MatRadioModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxChartsModule,
    GeodataTableModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    GeodataPipe,
    EventdataPipe,
  ],
})
export class HomeModule {}
