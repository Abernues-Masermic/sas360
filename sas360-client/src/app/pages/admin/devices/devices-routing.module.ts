import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices.component';
import { DeviceResolverService } from '@shared/resolvers/device.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    resolve: { devices: DeviceResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicesRoutingModule {}
