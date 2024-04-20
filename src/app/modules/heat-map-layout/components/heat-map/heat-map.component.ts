import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IHeatMap, IHeatMapEvent } from 'src/app/modules/shared/interfaces/heat-map.model';
import { HeatmapService } from 'src/app/modules/shared/services/heat-map.service';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatMapComponent implements OnInit {
  @Input() eventData: IHeatMapEvent[] = [];

  startTime: string = '';
  endTime: string = '';
  public startDate: string = '';
  public endDate: string = '';
  public minIntensity: number = 0;
  public maxIntensity: number = 100;
  public heatmapData: IHeatMap[] = [];
  public filteredHeatmapData: IHeatMap[] = [];

  private readonly DEFAULT_TIME = '1970-01-01T';
  private colorCache: { [frequency: number]: string } = {};

  constructor(private heatmapService: HeatmapService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventData']?.currentValue) {
      this.updateHeatmap();
    }
  }

  ngOnInit(): void {
    this.updateHeatmap();
  }

  getColor(frequency: number): string {
    if (this.colorCache[frequency]) {
      return this.colorCache[frequency];
    }

    return this.calculateColor(frequency);
  }

  private calculateColor(frequency: number) {
    const lowColor = [255, 255, 255]; // White for low frequencies
    const highColor = [255, 0, 0]; // Red for high frequencies

    const colorArr = this.calcColorBasedOnFrequency(lowColor, highColor, frequency / this.getMaxFrequency());

    // Convert RGB array to hexadecimal color code
    const color = '#' + this.rgbToHex(colorArr[0]) + this.rgbToHex(colorArr[1]) + this.rgbToHex(colorArr[2]);
    this.colorCache[frequency] = color;
    return color;
  }

  applyFilter() {
    let filteredData = [...this.heatmapData];

    if (this.startTime && this.endTime) {
      const startTime = new Date(this.DEFAULT_TIME + this.startTime);
      const endTime = new Date(this.DEFAULT_TIME + this.endTime);
      filteredData = filteredData.filter(data => {
        const dataTime = new Date(this.DEFAULT_TIME + data.timestamp.getHours() + ':' + data.timestamp.getMinutes());
        return dataTime >= startTime && dataTime <= endTime;
      });
    }

    filteredData = filteredData.filter(data => data.frequency >= this.minIntensity && data.frequency <= this.maxIntensity);

    this.filteredHeatmapData = filteredData;
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.minIntensity = 0;
    this.maxIntensity = 100;
    this.filteredHeatmapData = this.heatmapData;
  }

  private updateHeatmap() {
    this.heatmapData = this.heatmapService.processData(this.eventData);
    this.filteredHeatmapData = [...this.heatmapData];
  }

  private calcColorBasedOnFrequency(color1: number[], color2: number[], factor: number): number[] {
    return color1.map((channel, index) => Math.round(channel + factor * (color2[index] - channel)));
  }

  private rgbToHex(channel: number): string {
    const hex = channel.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  private getMaxFrequency(): number {
    return Math.max(...this.heatmapData.map(data => data.frequency));
  }
}
