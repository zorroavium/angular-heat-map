export interface IHeatMapEvent {
  timestamp: string;
  intensity: number;
 }

 export interface IHeatMapEventProcessed {
  timestamp: Date;
  intensity: number;
 }

 export interface IHeatMap {
  timestamp: Date;
  frequency: number;
 }
