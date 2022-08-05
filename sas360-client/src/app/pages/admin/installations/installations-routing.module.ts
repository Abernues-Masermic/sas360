import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationsComponent } from './installations.component';
import { InstallationResolverService } from '@shared/resolvers/installation.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: InstallationsComponent,
    resolve: { installations: InstallationResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstallationsRoutingModule {}
