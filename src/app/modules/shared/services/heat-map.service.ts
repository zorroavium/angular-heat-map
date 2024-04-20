import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IHeatMap, IHeatMapEvent, IHeatMapEventProcessed } from '../interfaces/heat-map.model';

@Injectable({
  providedIn: 'root'
})
export class HeatmapService {

  constructor() { }

  processData(eventData: IHeatMapEvent[]): IHeatMap[] {
    // Calculate frequency distributions over time slots
    const processedData: IHeatMapEventProcessed[] = eventData.map(event => ({
      timestamp: this.convertToDate(event.timestamp),
      intensity: event.intensity
    }));
    const frequencyMap = this.calculateFrequencyDistribution(processedData);

    const heatmapData = this.mapToGridLayout(frequencyMap);

    return heatmapData;
  }

  private convertToDate(timestamp: string): Date {
    return new Date(timestamp);
  }

  private calculateFrequencyDistribution(eventData: IHeatMapEventProcessed[]): Map<Date, number> {
    const frequencyMap = new Map<Date, number>();

    const timeSlotDuration = 60 * 60 * 1000;

    for (const event of eventData) {
      const timeSlot = new Date(Math.floor(event.timestamp.getTime() / timeSlotDuration) * timeSlotDuration);
      frequencyMap.set(timeSlot, (frequencyMap.get(timeSlot) || 0) + event.intensity);
    }

    return frequencyMap;
  }

  private mapToGridLayout(frequencyMap: Map<Date, number>): IHeatMap[] {
    return Array.from(frequencyMap.entries()).map(([timestamp, frequency]) => ({
      timestamp,
      frequency
    }));
  }
}
