import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Geodata } from '@shared/models/geodata.interface';

@Component({
  selector: 'app-geodata-table',
  templateUrl: './geodata-table.component.html',
  styleUrls: ['./geodata-table.component.scss'],
})
export class GeodataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private destroy$ = new Subject<any>();

  //Get geodata values from parent
  private _geodataItems = new BehaviorSubject<Geodata[]>([]);
  @Input() set geodataItems(value: Geodata[]) {
    this._geodataItems.next(value);
  }
  get geodataItems() {
    return this._geodataItems.getValue();
  }
  //----------------------------

  displayedColumns: string[] = [
    'devicename',
    'instant',
    'positionx',
    'positiony',
  ];
  dataSource = new MatTableDataSource();

  constructor() {}

  ngOnInit(): void {
    this._geodataItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((geodata: Geodata[]) => {
        this.dataSource.data = geodata;
        console.log('GeodataItems table ->', geodata);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
