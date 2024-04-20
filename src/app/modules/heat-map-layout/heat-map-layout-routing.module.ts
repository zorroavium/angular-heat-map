import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeatMapLayoutComponent } from './heat-map-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HeatMapLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeatMapLayoutRoutingModule { }
