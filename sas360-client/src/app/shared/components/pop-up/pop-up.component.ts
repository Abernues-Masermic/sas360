import { ModalType } from '@shared/utils/enums';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ModalAction } from '@app/shared/utils/enums';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent {
  title: string;
  showActions: boolean;
  modalType: ModalType;

  constructor(
    private dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.showActions = data.showActions;
    this.modalType = data.modalType;
    console.log('Modal type ->', this.modalType);
  }

  onAccept() {
    this.dialogRef.close(ModalAction.OK);
  }

  onCancel() {
    this.dialogRef.close(ModalAction.CANCEL);
  }
}
