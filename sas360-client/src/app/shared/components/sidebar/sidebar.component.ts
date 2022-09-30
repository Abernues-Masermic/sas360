import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';
import { AuthService } from '@pagesauth/auth.service';
import { RoleType, UserResponse } from '@shared/models/user.interface';
import { getLocalUser } from '@shared/utils/local-storage';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  disabled = false;
  isLogged = false;
  userRole?: RoleType | null;

  private destroy$ = new Subject<any>();
  constructor(
    private readonly utilsSvc: UtilsService,
    private authSvc: AuthService
  ) {
    this.utilsSvc.editingModeOpenned$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: boolean) => {
        this.disabled = res;
        console.log('Editing mode', this.disabled);
      });
  }

  ngOnInit(): void {
    this.authSvc.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userresponse: UserResponse | null) => {
        this.isLogged = userresponse != null;
        const user = getLocalUser();
        this.userRole = user && this.isLogged ? user.role : null;
      });
  }

  onExit(): void {
    this.utilsSvc.openSidebar(false);
  }

  public get roleType(): typeof RoleType {
    return RoleType;
  }
}
