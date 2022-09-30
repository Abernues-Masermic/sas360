import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '@pagesauth/auth.service';
import { UtilsService } from '@shared/services/utils.service';
import { UserResponse } from '@shared/models/user.interface';
import { PAGE_SLIDE_ANIMATION } from '@shared/animations/pagesAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [PAGE_SLIDE_ANIMATION],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sas360-client';
  openned = false;
  private destroy$ = new Subject<any>();

  constructor(
    private contexts: ChildrenOutletContexts,
    private readonly utilsSvc: UtilsService,
    private readonly authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.utilsSvc.sidebarOpenned$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => (this.openned = res));

    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userresponse: UserResponse | null) => {
        if (userresponse == null) {
          this.openned = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
