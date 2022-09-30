import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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

import { ModalInstallationComponent } from '@pagesadmin/modal-components/modal-installation/modal-installation.component';
import { InstallationService } from '@pagesadmin/services/installation.service';

import { UtilsService } from '@shared/services/utils.service';
import { PopUpComponent } from '@shared/components/pop-up/pop-up.component';
import { ModalAction, ModalType } from '@shared/utils/enums';
import { GlobalConstants } from '@shared/utils/global-constants';
import { Installation } from '@shared/models/installation.interface';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.scss'],
})
export class InstallationsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  hoveredEdit = -1;
  hoveredDelete = -1;
  displayedColumns: string[] = [
    'id',
    'installationname',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly utilsSvc: UtilsService,
    private readonly installationSvc: InstallationService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.route.snapshot.data['installations'];
    this.installationSvc.RefreshRequired.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.installationSvc
        .getAll()
        .subscribe((installations: Installation[]) => {
          this.dataSource.data = installations;
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onOpenModalInstallation(installation = {}) {
    console.log('Installation ->', installation);
    this.utilsSvc.editingMode(true);
    this.dialogRef.open(ModalInstallationComponent, {
      height: '330px',
      width: '500px',
      hasBackdrop: false,
      data: { title: 'New installation', installation: installation },
    });
  }

  onDelete(installation: any): void {
    const dialogRef = this.dialogRef.open(PopUpComponent, {
      width: '620px',
      hasBackdrop: false,
      data: {
        title: `Desea eliminar la instalación ${installation.installationname}?`,
        showActions: true,
        modalType: ModalType.INFO,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog output:', data);

      if (data == ModalAction.OK) {
        this.installationSvc
          .delete(installation.id)
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
              console.info('Installation delete action completed'),
          });
      }
    });
  }
}
