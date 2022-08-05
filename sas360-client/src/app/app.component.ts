import { UtilsService } from '@shared/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sas360-client';
  opened = false;
  private destroy$ = new Subject<any>();

  constructor(private utilsSvc: UtilsService) {}

  ngOnInit(): void {
    this.utilsSvc.sidebarOpenned$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.opened = res));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
