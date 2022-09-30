import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';
import { ModalInstallationComponent } from '@pagesadmin/modal-components/modal-installation/modal-installation.component';
import { UserService } from '@pagesadmin/services/user.service';
import { InstallationService } from '@pagesadmin/services/installation.service';
import { UtilsService } from '@shared/services/utils.service';
import { BaseFormUser } from '@shared/baseform/base-form-user';
import { ButtonAction, ModalAction } from '@shared/utils/enums';
import { RoleType } from '@shared/models/user.interface';
import { GlobalConstants } from '@shared/utils/global-constants';
import {
  getLocalInstallation,
  getLocalUser,
} from '@shared/utils/local-storage';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit, OnDestroy {
  action = ButtonAction.NEW;
  userInstallation: string | null;
  userRole?: string | null;
  showPasswordField = true;
  hidepasswordbutton = true;

  showInstallation?: boolean;
  roleTypes: string[] = Object.keys(RoleType).filter(v => isNaN(Number(v)));
  arrayInstallation!: string[];

  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public baseFormUser: BaseFormUser,
    public readonly utilsSvc: UtilsService,
    private readonly userSvc: UserService,
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
    if (this.data?.user.hasOwnProperty('id')) {
      this.action = ButtonAction.EDIT;
      //this.showPasswordField = false;
      //this.baseFormUser.baseForm.get('password')?.setValidators(null);
      this.data.title = 'Edit user';
      this.patchFormData();
      this.checkInstallationMode(this.baseFormUser.baseForm.value['role']);
    } else {
      this.baseFormUser.baseForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.subscriptions.unsubscribe();
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

  onSelectRole(role: string) {
    this.checkInstallationMode(role);
  }

  onSaveUser(): void {
    const formValue = this.baseFormUser?.baseForm.value;
    console.log('Save user ->', formValue);
    if (this.action == ButtonAction.NEW) {
      this.subscriptions.add(
        this.userSvc?.new(formValue).subscribe({
          next: res =>
            this.toastSrv.success('New user created', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          error: error =>
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          complete: () => console.info('User create action completed'),
        })
      );
    } else if (this.action == ButtonAction.EDIT) {
      const userId = this.data?.user?.id;
      this.subscriptions.add(
        this.userSvc?.update(userId, formValue).subscribe({
          next: res =>
            this.toastSrv.success('Selected user edited', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          error: error =>
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          complete: () => console.info('User update action completed'),
        })
      );
    }

    this.utilsSvc.editingMode(false);
  }

  isValidModalField(field: string): boolean | undefined {
    const isValid = this.baseFormUser?.isValidField(field);
    return isValid;
  }

  private patchFormData(): void {
    this.baseFormUser.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
      installation: this.data?.user?.installation,
    });
  }

  private checkInstallationMode(role: string) {
    this.showInstallation = role !== 'SUPERADMIN';
    if (!this.showInstallation) {
      this.baseFormUser.baseForm.get('installation')?.setValue(null);
      this.baseFormUser.baseForm.controls['installation']?.setValidators(null);
    } else {
      this.baseFormUser.baseForm.controls['installation']?.setValidators(
        Validators.required
      );
    }
    setTimeout(() => {
      this.baseFormUser.baseForm.get('installation')?.updateValueAndValidity();
    });
  }
}
