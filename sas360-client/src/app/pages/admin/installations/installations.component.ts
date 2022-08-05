import { Subject } from 'rxjs';
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
import { InstallationsService } from '@pagesadmin/services/installations.service';

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
  displayedColumns: string[] = ['id', 'installationname', 'description'];
  dataSource = new MatTableDataSource();

  private destroy$ = new Subject<any>();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly installationSvc: InstallationsService,
    private dialogRef: MatDialog,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.route.snapshot.data['installations'];
    this.installationSvc.RefreshRequired.subscribe(() => {
      this.installationSvc.getAll().subscribe(installations => {
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

  onOpenModalInstallation(installation = {}) {}

  onDelete(installation: any): void {}
}
