import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Geodata, GeodataBublechart } from '@shared/models/geodata.interface';
import * as _ from 'lodash';
import { GlobalConstants } from '@shared/utils/global-constants';

@Component({
  selector: 'app-geodata-bublechart',
  templateUrl: './geodata-bublechart.component.html',
  styleUrls: ['./geodata-bublechart.component.scss'],
})
export class GeodataBublechartComponent implements OnInit {
  @ViewChild('chartwrapper')
  chartwrapper?: ElementRef;

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
  //---------------------------

  bublechartdata?: any[];

  //---------options---------
  view?: [number, number];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Y-coordinate';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'X-coordinate';
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = GlobalConstants.minYChart;
  yScaleMax: number = GlobalConstants.maxYChart;
  xScaleMin: number = GlobalConstants.minXChart;
  xScaleMax: number = GlobalConstants.maxXChart;

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
  // -------------------------

  selectedName?: string = '_';
  selectedX?: string = '_';
  selectedY?: string = '_';
  frecIndex?: number;

  constructor() {}

  ngOnInit(): void {
    this.deviceFilterArray.forEach((device, index) => {
      this.customColors?.push({ name: device, value: this.colors[index] });
    });

    this._geodataItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((geodataitems: Geodata[]) => {
        console.log('GeodataItems bublechart ->', geodataitems);

        let geodataBublechart: GeodataBublechart[] = geodataitems.map(function (
          geodata: Geodata
        ) {
          const filter: GeodataBublechart = {
            devicename: geodata.devicename,
            name: geodata.positionx,
            x: geodata.positionx,
            y: geodata.positiony,
            r: Math.random() * (20 - 5) + 5,
          };
          return filter;
        });

        this.bublechartdata = _.chain(geodataBublechart)
          .groupBy('devicename')
          .map((values: GeodataBublechart[], key: string) => ({
            name: key,
            series: values.map(({ devicename, ...rest }) => rest),
          }))
          .value();

        console.log('Bublechart data', this.bublechartdata);
      });
  }

  onSelect(data: any): void {
    const json_data: any = JSON.parse(JSON.stringify(data));
    this.selectedName = json_data['series'];
    this.selectedX = json_data['name'];
    this.selectedY = json_data['value'];
    this.frecIndex = json_data['r'];
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
