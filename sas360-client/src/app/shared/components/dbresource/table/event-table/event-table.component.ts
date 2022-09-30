import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Eventdata, EventStateKeys } from '@shared/models/eventdata.interface';
import { STAGGER_ANIMATION } from '@shared/animations/pagesAnimation';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  animations: [STAGGER_ANIMATION],
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private destroy$ = new Subject<any>();

  // ------Get Eventdata values filter from parent -------
  private _eventdataItems = new BehaviorSubject<Eventdata[]>([]);
  @Input() set eventdataItems(value: Eventdata[]) {
    this._eventdataItems.next(value);
  }
  get eventdataItems() {
    return this._eventdataItems.getValue();
  }

  private _eventstate = new BehaviorSubject<string>('');
  @Input() set eventstate(value: string) {
    this._eventstate.next(value);
  }
  get eventstate() {
    return this._eventstate.getValue();
  }
  //----------------------------

  // ------Send register action-------
  @Output() closeEvent = new EventEmitter<Eventdata>();
  @Output() archiveEvent = new EventEmitter<Eventdata>();
  //

  hoveredClose = -1;
  hoveredArchive = -1;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor() {
    Object.assign(this, { EventStateKeys });
  }

  ngOnInit(): void {
    this._eventdataItems
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventdata: Eventdata[]) => {
        this.dataSource.data = eventdata;
        console.log('EventdataItems table ->', eventdata);
      });

    this._eventstate
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventstate: string) => {
        this.displayedColumns.splice(0, this.displayedColumns.length);
        this.displayedColumns.push('devicename');
        this.displayedColumns.push('instant');
        if (eventstate === 'CLOSED') {
          this.displayedColumns.push('closedinstant');
        }
        this.displayedColumns.push('sSeverity');
        this.displayedColumns.push('info');
        this.displayedColumns.push('sState');
        if (eventstate === 'ACTIVE' || eventstate === 'ARCHIVED') {
          this.displayedColumns.push('actionsActive');
        }
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

  onClose(event: Eventdata): void {
    console.log('CLOSE EVENT -> ', event);
    this.closeEvent.emit(event);
  }

  onArchive(event: Eventdata): void {
    console.log('ARCHIVE EVENT -> ', event);
    this.archiveEvent.emit(event);
  }
}
