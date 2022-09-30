import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import {
  Eventdata,
  EventSeverityKeys,
} from '@shared/models/eventdata.interface';
import { DataChart, SeriesChart } from '@shared/models/chartdata.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-event-barchart',
  templateUrl: './event-barchart.component.html',
  styleUrls: ['./event-barchart.component.scss'],
})
export class EventBarchartComponent implements OnInit {
  private destroy$ = new Subject<any>();

  //Get eventdata values from parent
  private _eventdataItems = new BehaviorSubject<Eventdata[]>([]);
  @Input() deviceFilterArray: string[] = [];
  @Input() set eventdataItems(value: Eventdata[]) {
    this._eventdataItems.next(value);
  }
  get eventdataItems() {
    return this._eventdataItems.getValue();
  }
  //----------------

  @Input() eventState: string = '';
  loaded: boolean = false;
  barchartdata: DataChart[] = [];

  // -------- options -----------------
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Device';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Count';
  legendTitle: string = 'Severity';

  colors: string[] = ['#E1A700', '#E15500', '#E10000', '#850101'];
  customColors?: any[] = [];

  // ----------------------------------

  constructor() {}

  ngOnInit(): void {
    EventSeverityKeys.forEach((severity, index) => {
      this.customColors?.push({ name: severity, value: this.colors[index] });
    });

    this._eventdataItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventdataitems: Eventdata[]) => {
        this.loaded = false;
        console.log('EventdataItems barchart ->', eventdataitems);

        //Cogemos los fields a utilizar
        let eventdatagroup: any[] = eventdataitems.map(function (
          eventdata: Eventdata
        ) {
          const filter: any = {
            devicename: eventdata.devicename,
            name: eventdata.sSeverity,
          };
          return filter;
        });

        //Agrupamos por device
        let devicegroupdata = _.chain(eventdatagroup)
          .groupBy('devicename')
          .map((values: any[], key: string) => ({
            name: key,
            series: values.map(({ devicename, ...rest }) => rest),
          }))
          .value();
        console.log('Device group event data -> ', devicegroupdata);

        //Contamos el numero de apariciones de cada device asociado a severity
        let createbarchardata: DataChart[] = [];
        devicegroupdata?.forEach(devicedata => {
          let seriesvalues: SeriesChart[] = [];
          EventSeverityKeys.forEach(severity => {
            const total = _.countBy(
              devicedata.series,
              serie => serie.name === severity
            );
            const serievalue: SeriesChart = {
              name: severity,
              value: total['true'] !== undefined ? total['true'] : 0,
            };
            seriesvalues.push(serievalue);
          });

          let devicearray: DataChart = {
            name: devicedata.name,
            series: seriesvalues,
          };
          createbarchardata.push(devicearray);
        });
        console.log(
          'Device group event data (count field) -> ',
          createbarchardata
        );

        createbarchardata = _.sortBy(createbarchardata, ['name']);

        this.barchartdata = [...createbarchardata];

        setTimeout(() => {
          this.loaded = true;
        }, 100);
      });
  }

  withoutDecimals(val: any): string {
    return val;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
