import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DeviceResolverService } from '@shared/resolvers/device.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { devices: DeviceResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
