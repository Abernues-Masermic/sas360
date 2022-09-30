import { GlobalConstants } from '../../../../utils/global-constants';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Geodata, GeodataChart } from '@shared/models/geodata.interface';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
//import { multi } from '@shared/mock/data';
import * as _ from 'lodash';

@Component({
  selector: 'app-geodata-linechart',
  templateUrl: './geodata-linechart.component.html',
  styleUrls: ['./geodata-linechart.component.scss'],
})
export class GeodataLinechartComponent implements OnInit {
  private destroy$ = new Subject<any>();

  //Get geodata values from parent
  private _geodataItems = new BehaviorSubject<Geodata[]>([]);
  @Input() deviceFilterArray: string[] = [];
  @Input() set geodataItems(value: Geodata[]) {
    this._geodataItems.next(value);
  }
  get geodataItems() {
    return this._geodataItems.getValue();
  }
  //----------------

  //multi?: any[];
  linechartdata?: any[];

  //---------- options ---------------
  view?: [number, number];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'X-coordinate';
  yAxisLabel: string = 'Y-coordinate';
  yScaleMin: number = GlobalConstants.minYChart;
  yScaleMax: number = GlobalConstants.maxYChart;
  xScaleMin: number = GlobalConstants.minXChart;
  xScaleMax: number = GlobalConstants.maxXChart;
  timeline: boolean = false;

  colors: string[] = [
    '#ED5565',
    '#A0D468',
    '#5D9CEC',
    '#AC92EC',
    '#48CFAD',
    '#ED5565',
    '#A0D468',
    '#5D9CEC',
    '#AC92EC',
    '#48CFAD',
  ];
  customColors?: any[] = [];
  // -------------------------------------

  selectedName?: string = '_';
  selectedX?: string = '_';
  selectedY?: string = '_';
  frecIndex?: string = '_';

  constructor() {
    //Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.deviceFilterArray.forEach((device, index) => {
      this.customColors?.push({ name: device, value: this.colors[index] });
    });

    this._geodataItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((geodataitems: Geodata[]) => {
        console.log('GeodataItems linechart ->', geodataitems);

        let geodataChart: GeodataChart[] = geodataitems.map(function (
          geodata: Geodata
        ) {
          const filter: GeodataChart = {
            devicename: geodata.devicename,
            name: geodata.positionx,
            value: geodata.positiony,
          };
          return filter;
        });

        this.linechartdata = _.chain(geodataChart)
          .groupBy('devicename')
          .map((values: GeodataChart[], key: string) => ({
            name: key,
            series: values.map(({ devicename, ...rest }) => rest),
          }))
          .value();

        console.log('Linechart data', this.linechartdata);
      });
  }

  onSelect(data: any): void {
    const json_data: any = JSON.parse(JSON.stringify(data));
    this.selectedName = json_data['series'];
    this.selectedX = json_data['name'];
    this.selectedY = json_data['value'];
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
