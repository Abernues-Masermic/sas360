import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeodataComponent } from './geodata.component';

const routes: Routes = [
  {
    path: '',
    component: GeodataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeodataRoutingModule {}
