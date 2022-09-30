import { AuthService } from '@pagesauth/auth.service';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { RoleType, UserResponse } from '@shared/models/user.interface';
import {
  getLocalInstallation,
  getLocalUser,
} from '@shared/utils/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  imageSrc: string = 'assets/images/SASicon2.png';
  imageAlt = 'SAS360';
  userInstallation?: string | null;
  userRole?: RoleType | null;
  userName?: string | null;
  isLogged = false;

  private destroy$ = new Subject<any>();
  private subscriptions: Subscription = new Subscription();

  @Output() toogleSidenav = new EventEmitter<void>();

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userresponse: UserResponse | null) => {
        this.isLogged = userresponse != null;
        const user = getLocalUser();
        console.log('Header user ->', user);

        this.userRole = user && this.isLogged ? user.role : null;
        this.userName = user && this.isLogged ? user.username : '';
        this.userInstallation = getLocalInstallation();
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
    this.userRole = null;
    this.userName = '';
  }

  public get roleType(): typeof RoleType {
    return RoleType;
  }

  public get sRole(): string {
    return this.userRole != null ? RoleType[this.userRole] : '';
  }
}
