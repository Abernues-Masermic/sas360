import { AuthService } from '@pagesauth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormUser } from '@app/shared/baseform/base-form-user';
import { GlobalConstants } from '@shared/utils/global-constants';
import { saveLocalUser } from '@shared/utils/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public hidePassword: boolean = true;
  public isExpired: boolean = false;
  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<boolean>();

  constructor(
    private authSvc: AuthService,
    private router: Router,
    public baseFormUser: BaseFormUser,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    this.baseFormUser.baseForm.get('role')?.setValidators(null);
    this.baseFormUser.baseForm.get('installation')?.setValidators(null);
    this.baseFormUser.baseForm.updateValueAndValidity();
    this.patchFormData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLogin(): void {
    if (this.baseFormUser.baseForm.invalid) {
      return;
    }
    const formValue = this.baseFormUser.baseForm.value;
    this.subscriptions.add(
      this.authSvc?.login(formValue).subscribe({
        next: res => {
          console.log('onLogin', res);
          this.router.navigate(['']);
        },
        error: error =>
          this.toastSrv.error(error, 'SAS360 message', {
            timeOut: GlobalConstants.toastTimeout,
          }),
        complete: () => console.info('onLogin completed'),
      })
    );
  }

  checkField(field: string): boolean | undefined {
    return this.baseFormUser.isValidField(field);
  }

  private patchFormData(): void {
    this.baseFormUser.baseForm.patchValue({
      username: '',
      password: '',
    });
  }
}
