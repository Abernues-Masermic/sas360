import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AfterViewInit,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '@pagesadmin/services/user.service';
import { ModalUserComponent } from '@pagesadmin/modal-components/modal-user/modal-user.component';

import { ModalAction, ModalType } from '@shared/utils/enums';
import { PopUpComponent } from '@shared/components/pop-up/pop-up.component';
import { GlobalConstants } from '@shared/utils/global-constants';
import { UtilsService } from '@shared/services/utils.service';
import { User } from '@shared/models/user.interface';
import { UserPipe } from '@shared/pipes/user.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  hoveredEdit = -1;
  hoveredDelete = -1;
  displayedColumns: string[] = [
    'id',
    'username',
    'sRole',
    'installation',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly utilsSvc: UtilsService,
    private readonly userSvc: UserService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService,
    private userpipe: UserPipe
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.userpipe.transform(
      this.route.snapshot.data['users'],
      null
    );

    this.userSvc.RefreshRequired.pipe(takeUntil(this.destroy$)).subscribe(
      () => {
        this.userSvc.getAll().subscribe((users: User[]) => {
          this.dataSource.data = this.userpipe.transform(users, null);
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

  onOpenModalUser(user = {}) {
    console.log('User ->', user);
    this.utilsSvc.editingMode(true);
    this.dialogRef.open(ModalUserComponent, {
      height: '430px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'New user', user: user },
    });
  }

  onDelete(user: any): void {
    const dialogRef = this.dialogRef.open(PopUpComponent, {
      width: '620px',
      hasBackdrop: false,
      data: {
        title: `Desea eliminar el usuario ${user.username}?`,
        showActions: true,
        modalType: ModalType.INFO,
      },
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Dialog output:', data);

      if (data == ModalAction.OK) {
        this.userSvc
          .delete(user.id)
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
            complete: () => console.info('User delete action completed'),
          });
      }
    });
  }
}
