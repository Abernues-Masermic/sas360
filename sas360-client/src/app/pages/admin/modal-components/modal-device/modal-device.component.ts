import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from '@pagesadmin/services/device.service';
import { InstallationService } from '@pagesadmin/services/installation.service';
import { ModalInstallationComponent } from '@pagesadmin/modal-components/modal-installation/modal-installation.component';
import { BaseFormDevice } from '@shared/baseform/base-form-device';
import { ButtonAction, ModalAction } from '@shared/utils/enums';
import { UtilsService } from '@shared/services/utils.service';
import { GlobalConstants } from '@shared/utils/global-constants';
import { DeviceType } from '@shared/models/device.interface';
import {
  getLocalInstallation,
  getLocalUser,
} from '@shared/utils/local-storage';

@Component({
  selector: 'app-modal-device',
  templateUrl: './modal-device.component.html',
  styleUrls: ['./modal-device.component.scss'],
})
export class ModalDeviceComponent implements OnInit, OnDestroy {
  action = ButtonAction.NEW;
  userInstallation: string | null;
  userRole?: string | null;
  deviceTypes: string[] = Object.keys(DeviceType).filter(v => isNaN(Number(v)));
  arrayInstallation!: string[];

  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public baseFormDevice: BaseFormDevice,
    public readonly utilsSvc: UtilsService,
    public deviceSvc: DeviceService,
    private readonly installationSvc: InstallationService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService
  ) {
    //SUPERADMIN OR ADMIN
    this.userInstallation = getLocalInstallation();
    const user = getLocalUser();
    this.userRole = user.role;
    this.installationSvc
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(installations => {
        if (this.userRole !== 'SUPERADMIN' && this.userInstallation !== null) {
          console.log('NOT SUPERADMIN');
          this.arrayInstallation = [this.userInstallation];
        } else {
          this.arrayInstallation = _.map(installations, 'installationname');
        }
      });
  }

  ngOnInit(): void {
    //NEW OR EDIT
    if (this.data?.device.hasOwnProperty('id')) {
      this.action = ButtonAction.EDIT;
      this.baseFormDevice.baseForm.updateValueAndValidity();
      this.data.title = 'Edit device';
      this.patchFormData();
    } else {
      this.baseFormDevice.baseForm.reset({
        warningrange: 3,
        cautionrange: 2,
        alarmrange: 1,
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onOpenModalInstallation(installation = {}): void {
    console.log('Installation ->', installation);
    const dialogRef = this.dialogRef.open(ModalInstallationComponent, {
      height: '430px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New Installation', installation: installation },
    });

    dialogRef.afterClosed().subscribe(modalaction => {
      if (modalaction === ModalAction.OK) {
        this.installationSvc
          .getAll()
          .pipe(takeUntil(this.destroy$))
          .subscribe(installations => {
            this.arrayInstallation = _.map(installations, 'installationname');
          });
      }
    });
  }

  onSaveDevice(): void {
    const formValue = this.baseFormDevice?.baseForm.value;
    console.log('DEVICE FORM VALUE', formValue);
    if (this.action == ButtonAction.NEW) {
      this.subscriptions.add(
        this.deviceSvc?.new(formValue).subscribe({
          next: res =>
            this.toastSrv.success('New device created', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          error: error => {
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            });
          },
          complete: () => {
            console.info('Device create action completed');
          },
        })
      );
    } else if (this.action == ButtonAction.EDIT) {
      const deviceId = this.data?.device?.id;
      this.subscriptions.add(
        this.deviceSvc?.update(deviceId, formValue).subscribe({
          next: res =>
            this.toastSrv.success('Selected device edited', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          error: error =>
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          complete: () => {
            console.info('Device update action completed');
          },
        })
      );
    }

    this.utilsSvc.editingMode(false);
  }

  isValidModalField(field: string): boolean | undefined {
    const isValid = this.baseFormDevice?.isValidField(field);
    return isValid;
  }

  private patchFormData(): void {
    this.baseFormDevice.baseForm.patchValue({
      devicename: this.data?.device?.devicename,
      type: this.data?.device?.type,
      installation: this.data?.device?.installation,
      warningrange: this.data?.device?.warningrange,
      cautionrange: this.data?.device?.cautionrange,
      alarmrange: this.data?.device?.alarmrange,
    });
  }

  onHandleWarningChange(target: any) {
    let warningRangeValue = target.value;
    let cautionRangeValue: number =
      this.baseFormDevice.baseForm.get('cautionrange')?.value;
    let alarmRangeValue: number =
      this.baseFormDevice.baseForm.get('alarmrange')?.value;

    if (warningRangeValue < cautionRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        cautionrange: warningRangeValue,
      });
    }

    if (warningRangeValue < alarmRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        alarmrange: warningRangeValue,
      });
    }
  }

  onHandleCautionChange(target: any) {
    let cautionRangeValue = target.value;
    let warningRangeValue: number =
      this.baseFormDevice.baseForm.get('warningrange')?.value;
    let alarmRangeValue: number =
      this.baseFormDevice.baseForm.get('alarmrange')?.value;

    if (cautionRangeValue > warningRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        warningrange: cautionRangeValue,
      });
    }

    if (cautionRangeValue < alarmRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        alarmrange: cautionRangeValue,
      });
    }
  }

  onHandleAlarmChange(target: any) {
    let alarmRangeValue = target.value;
    let cautionRangeValue: number =
      this.baseFormDevice.baseForm.get('cautionrange')?.value;
    let warningRangeValue: number =
      this.baseFormDevice.baseForm.get('warningrange')?.value;

    if (alarmRangeValue > cautionRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        cautionrange: alarmRangeValue,
      });
    }

    if (alarmRangeValue > warningRangeValue) {
      this.baseFormDevice.baseForm.patchValue({
        warningrange: alarmRangeValue,
      });
    }
  }
}
