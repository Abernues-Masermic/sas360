import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./devices/devices.module').then(m => m.DevicesModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'installations',
    loadChildren: () =>
      import('./installations/installations.module').then(
        m => m.InstallationsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
