import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import * as _ from 'lodash';

import { Geodata } from '@shared/models/geodata.interface';
import { GeodataService } from '@shared/services/geodata.service';
import { EventdataService } from '@shared/services/eventdata.service';
import { GeodataPipe } from '@shared/pipes/geodata.pipe';
import { getLocalUser } from '@shared/utils/local-storage';
import { RoleType } from '@shared/models/user.interface';
import { Eventdata, EventStateType } from '@shared/models/eventdata.interface';
import { EventdataPipe } from '@shared/pipes/eventdata.pipe';
import { GlobalConstants } from '@shared/utils/global-constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<any>();

  userRole?: RoleType | null;
  userHeaderStyles: any;
  geodataContainerStyles: any;

  expandButtonColor = 'basic';

  geodataItems: Geodata[] = [];
  eventdataItems: Eventdata[] = [];

  showLineChart: boolean = false;
  deviceFilterArray: string[] = [];
  deviceFilter: string = '';
  dateIniFilter?: Date;
  dateEndFilter?: Date;
  eventstateFilterName: string = 'ALL';
  eventstateFilter: number = -1;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private geodatasvc: GeodataService,
    private eventdatasvc: EventdataService,
    private geodatapipe: GeodataPipe,
    private eventdatapipe: EventdataPipe,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    const user = getLocalUser();
    this.userRole = user ? user.role : null;

    //Define styles if user - admin
    this.userHeaderStyles = {
      'margin-top': '5px',
      'background-color':
        this.userRole === RoleType.ADMIN ||
        this.userRole === RoleType.SUPERADMIN
          ? 'darkred'
          : 'black',
    };

    this.geodataContainerStyles = {
      'border-color': 'grey',
      'border-width': '0px 1px 1px 0px',
      'border-style': 'solid',
    };

    //-----------------------------

    //Device filter
    this.deviceFilterArray = _.uniq(
      _.map(this.activatedroute.snapshot.data['devices'], 'devicename')
    );
    this.deviceFilterArray.push('');

    this.refreshData();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  public refreshData() {
    this.refreshGeoData();
    this.refreshEventData();
  }

  public refreshGeoData() {
    this.geodatasvc
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((geodataItems: Geodata[]) => {
        this.geodataItems = this.geodatapipe.transform(
          geodataItems,
          this.deviceFilter,
          this.dateIniFilter,
          this.dateEndFilter
        );
        console.log('GeodataItems home ->', this.geodataItems);
      });
  }

  public refreshEventData() {
    this.eventdatasvc
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((eventdataItems: Eventdata[]) => {
        this.eventdataItems = this.eventdatapipe.transform(
          eventdataItems,
          this.deviceFilter,
          this.dateIniFilter,
          this.dateEndFilter,
          this.eventstateFilter
        );
        console.log('EventdataItems home ->', this.eventdataItems);
      });
  }

  onDeviceFilterEventHandler(deviceName: string): void {
    this.deviceFilter = deviceName;
    this.refreshData();
  }

  onDateIniFilterEventHandler(dateIni: Date): void {
    this.dateIniFilter = dateIni;
    this.refreshData();
  }

  onDateEndFilterEventHandler(dateEnd: Date): void {
    this.dateEndFilter = dateEnd;
    this.refreshData();
  }

  onCloseEventHandler(eventdata: Eventdata): void {
    console.log('Close event handler (Home)->', eventdata);
    eventdata.state = Object.values(EventStateType).indexOf('CLOSED');
    eventdata.sState = 'CLOSED';

    this.updateEvent(eventdata.id, eventdata);
  }

  onArchiveEventHandler(eventdata: Eventdata): void {
    console.log('Archive event handler (Home)->', eventdata);
    eventdata.state = Object.values(EventStateType).indexOf('ARCHIVED');
    eventdata.sState = 'ARCHIVED';

    this.updateEvent(eventdata.id, eventdata);
  }

  updateEvent(id: number, eventdata: Eventdata) {
    this.eventdatasvc
      .update(id, eventdata)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res =>
          this.toastSrv.success(res.message, 'SAS360 message', {
            timeOut: GlobalConstants.toastTimeout,
          }),
        error: error =>
          this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
            timeOut: GlobalConstants.toastTimeout,
          }),
        complete: () => {
          console.info(`${eventdata.sState} action completed`);
          this.refreshData();
        },
      });
  }

  onChangeStateEventHandler(newState: any): void {
    this.eventstateFilterName = newState === -1 ? 'ALL' : newState;
    this.eventstateFilter =
      newState !== -1 ? Object.values(EventStateType).indexOf(newState) : -1;

    console.log('Event state change (Home)->', this.eventstateFilter);

    this.refreshEventData();
  }

  onOpenGeoDataWindow() {
    this.router.navigate(['/geodata']);
  }
  onOpenEventWindow() {
    this.router.navigate(['/event']);
  }
}
