import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

import { DeviceService } from '@pagesadmin/services/device.service';
import { ModalDeviceComponent } from '@pagesadmin/modal-components/modal-device/modal-device.component';

import { UtilsService } from '@shared/services/utils.service';
import { PopUpComponent } from '@shared/components/pop-up/pop-up.component';
import { ModalAction, ModalType } from '@shared/utils/enums';
import { GlobalConstants } from '@shared/utils/global-constants';
import { Device } from '@shared/models/device.interface';
import { DevicePipe } from '@shared/pipes/device.pipe';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit, OnDestroy, AfterViewInit {
  hoveredEdit = -1;
  hoveredDelete = -1;
  displayedColumns: string[] = [
    'id',
    'devicename',
    'sType',
    'installation',
    'warningrange',
    'cautionrange',
    'alarmrange',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly utilsSvc: UtilsService,
    private readonly deviceSvc: DeviceService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService,
    private devicepipe: DevicePipe
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.devicepipe.transform(
      this.route.snapshot.data['devices'],
      null
    );
    this.deviceSvc.RefreshRequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.deviceSvc
          .getAll()
          .pipe(takeUntil(this.destroy$))
          .subscribe((devices: Device[]) => {
            this.dataSource.data = this.devicepipe.transform(devices, null);
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onOpenModalDevice(device = {}) {
    console.log('Device ->', device);
    this.utilsSvc.editingMode(true);
    this.dialogRef.open(ModalDeviceComponent, {
      height: '450px',
      width: '650px',
      hasBackdrop: false,
      data: { title: 'New Device', device: device },
    });
  }

  onDelete(device: any): void {
    const dialogRef = this.dialogRef.open(PopUpComponent, {
      width: '620px',
      hasBackdrop: false,
      data: {
        title: `Desea eliminar el  dispositivo ${device.devicename}?`,
        showActions: true,
        modalType: ModalType.INFO,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog output:', data);

      if (data == ModalAction.OK) {
        this.deviceSvc
          .delete(device.id)
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
            complete: () =>
              console.info('Inbstallation delete action completed'),
          });
      }
    });
  }
}
