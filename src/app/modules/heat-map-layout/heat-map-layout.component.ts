import { Component } from '@angular/core';
import { IHeatMapEvent } from '../shared/interfaces/heat-map.model';
const eventMockData = require('../../../assets/event-data.json');

@Component({
  selector: 'app-heat-map-layout',
  templateUrl: './heat-map-layout.component.html',
  styleUrls: ['./heat-map-layout.component.scss']
})
export class HeatMapLayoutComponent {
  public eventData: IHeatMapEvent[] = eventMockData;

  // Fetch eventData from API call here
  // Then on response received, update eventData
  // Using MOCK JSON for now
}
