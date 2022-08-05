import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ButtonAction } from '@shared/utils/enums';
import { BaseFormInstallation } from '@shared/utils/base-form-installation';

@Component({
  selector: 'app-modal-installation',
  templateUrl: './modal-installation.component.html',
  styleUrls: ['./modal-installation.component.scss'],
})
export class ModalInstallationComponent implements OnInit {
  action = ButtonAction.NEW;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public installationForm: BaseFormInstallation,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {}

  onSave(): void {
  }

  isValidModalField(field: string): boolean | undefined {
    const isValid = this.installationForm?.isValidField(field);
    return isValid;
  }
}
