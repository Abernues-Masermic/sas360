import { AuthService } from '@pagesauth/auth.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { UserResponse } from '@app/shared/models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole?: string | null;
  userName?: string | null;
  isLogged = false;

  private destroy$ = new Subject<any>();
  private subscriptions: Subscription = new Subscription();

  @Output() toogleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userresponse: UserResponse | null) => {
        this.isLogged = userresponse != null;
        this.userRole = this.isLogged ? userresponse?.role : null;
        this.userName = this.isLogged ? 'abernues@masermic.com' : '';
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    this.subscriptions.unsubscribe();
  }

  onToogleSideNav(): void {
    this.toogleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }
}
