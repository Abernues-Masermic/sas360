import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'users',
    data: { animation: 'UsersPage' },
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'devices',
    data: { animation: 'DevicesPage' },
    loadChildren: () =>
      import('./devices/devices.module').then(m => m.DevicesModule),
  },
  {
    path: 'events',
    data: { animation: 'EventsPage' },
    loadChildren: () =>
      import('./events/events.module').then(m => m.EventsModule),
  },
  {
    path: 'installations',
    data: { animation: 'InstallationsPage' },
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
