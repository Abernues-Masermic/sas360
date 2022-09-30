import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CheckLoginGuard],
    data: { animation: 'HomePage' },
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'geodata',
    canActivate: [CheckLoginGuard],
    data: { animation: 'GeodataPage' },
    loadChildren: () =>
      import('./pages/geodata/geodata.module').then(m => m.DataModule),
  },
  {
    path: 'admin',
    canActivate: [CheckLoginGuard],
    loadChildren: () =>
      import('./pages/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'notFound',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/notFound',
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
