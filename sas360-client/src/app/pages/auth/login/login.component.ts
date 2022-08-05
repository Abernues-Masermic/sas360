import { AuthService } from '@pagesauth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public hide: boolean = true;
  private subscriptions: Subscription = new Subscription();
  private destroy$ = new Subject<boolean>();

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.hide = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLogin(): void {
    const user: User = {
      username: 'abernues@masermic.com',
      password: '12345678',
      role: 'ADMIN',
      installation: 'MASERMIC',
    };

    console.log('onLogin request ->', user);

    this.subscriptions.add(
      this.authSvc.login(user).subscribe(res => {
        if (res) {
          console.log('onLogin response ->', res);
          this.router.navigate(['']);
        }
      })
    );
  }
}
