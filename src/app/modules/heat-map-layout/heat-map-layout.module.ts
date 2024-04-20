import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeatMapLayoutRoutingModule } from './heat-map-layout-routing.module';
import { HeatMapLayoutComponent } from './heat-map-layout.component';
import { HeatMapComponent } from './components/heat-map/heat-map.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeatMapLayoutComponent,
    HeatMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeatMapLayoutRoutingModule
  ]
})
export class HeatMapLayoutModule { }
