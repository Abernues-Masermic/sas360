import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InstallationService } from '@app/pages/admin/services/installation.service';
import { ButtonAction, ModalAction } from '@shared/utils/enums';
import { UtilsService } from '@shared/services/utils.service';
import { GlobalConstants } from '@shared/utils/global-constants';
import { BaseFormInstallation } from '@app/shared/baseform/base-form-installation';

@Component({
  selector: 'app-modal-installation',
  templateUrl: './modal-installation.component.html',
  styleUrls: ['./modal-installation.component.scss'],
})
export class ModalInstallationComponent implements OnInit, OnDestroy {
  action = ButtonAction.NEW;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<ModalInstallationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public baseFormInstallation: BaseFormInstallation,
    public readonly utilsSvc: UtilsService,
    public installationSvc: InstallationService,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data?.installation.hasOwnProperty('id')) {
      this.action = ButtonAction.EDIT;
      this.baseFormInstallation.baseForm.updateValueAndValidity();
      this.data.title = 'Edit installation';
      this.patchFormData();
    } else {
      this.baseFormInstallation.baseForm.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSaveInstallation(): void {
    const formValue = this.baseFormInstallation?.baseForm.value;
    if (this.action == ButtonAction.NEW) {
      this.subscriptions.add(
        this.installationSvc?.new(formValue).subscribe({
          next: res =>
            this.toastSrv.success(
              'New installation created',
              'SAS360 message',
              {
                timeOut: GlobalConstants.toastTimeout,
              }
            ),
          error: error =>
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          complete: () => {
            console.info('Installation create action completed');
            this.dialogRef.close(ModalAction.OK);
          },
        })
      );
    } else if (this.action == ButtonAction.EDIT) {
      const installationId = this.data?.installation?.id;
      this.subscriptions.add(
        this.installationSvc?.update(installationId, formValue).subscribe({
          next: res =>
            this.toastSrv.success(
              'Selected installation edited',
              'SAS360 message',
              {
                timeOut: GlobalConstants.toastTimeout,
              }
            ),
          error: error =>
            this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
              timeOut: GlobalConstants.toastTimeout,
            }),
          complete: () => {
            console.info('Installation update action completed');
            this.dialogRef.close(ModalAction.OK);
          },
        })
      );
    }

    this.utilsSvc.editingMode(false);
  }

  isValidModalField(field: string): boolean | undefined {
    const isValid = this.baseFormInstallation?.isValidField(field);
    return isValid;
  }

  private patchFormData(): void {
    this.baseFormInstallation.baseForm.patchValue({
      installationname: this.data?.installation?.installationname,
      description: this.data?.installation?.description,
    });
  }
}
