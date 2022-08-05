import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ModalInstallationComponent } from '@pagesadmin/components/modal-installation/modal-installation.component';
import { UsersService } from '@pagesadmin/services/users.service';
import { BaseFormUser } from '@shared/utils/base-form-user';
import { ButtonAction } from '@shared/utils/enums';
import { GlobalConstants } from '@shared/utils/global-constants';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  action = ButtonAction.NEW;
  showPasswordField = true;
  hide = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userForm: BaseFormUser,
    private readonly userSvc: UsersService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data?.user.hasOwnProperty('id')) {
      this.action = ButtonAction.EDIT;
      this.showPasswordField = false;
      this.userForm.baseForm.get('password')?.setValidators(null);
      this.userForm.baseForm.updateValueAndValidity();
      this.data.title = 'Edit user';
      this.patchFormData();
    } else {
      this.userForm.baseForm.reset();
    }
  }

  onOpenModalInstallation(installation = {}): void {
    console.log('Installation ->', installation);
    this.dialogRef.open(ModalInstallationComponent, {
      height: '430px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New Installation', installation: installation },
    });
  }

  onSaveUser(): void {
    const formValue = this.userForm?.baseForm.value;
    if (this.action == ButtonAction.NEW) {
      this.userSvc?.new(formValue).subscribe({
        next: res =>
          this.toastSrv.success('New user created', 'SAS360 message', {
            timeOut: GlobalConstants.toastTimout,
          }),
        error: error =>
          this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
            timeOut: GlobalConstants.toastTimout,
          }),
        complete: () => console.info('User create action completed'),
      });
    } else if (this.action == ButtonAction.EDIT) {
      const userId = this.data?.user?.id;
      this.userSvc?.update(userId, formValue).subscribe({
        next: res =>
          this.toastSrv.success('Selected user edited', 'SAS360 message', {
            timeOut: GlobalConstants.toastTimout,
          }),
        error: error =>
          this.toastSrv.error('Something goes wrong!', 'SAS360 message', {
            timeOut: GlobalConstants.toastTimout,
          }),
        complete: () => console.info('User update action completed'),
      });
    }
  }

  isValidModalField(field: string): boolean | undefined {
    const isValid = this.userForm?.isValidField(field);
    return isValid;
  }

  private patchFormData(): void {
    this.userForm.baseForm.patchValue({
      username: this.data?.user?.username,
      role: this.data?.user?.role,
      installation: this.data?.user?.installation,
    });
  }
}
