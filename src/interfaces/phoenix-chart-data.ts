import { DATA_TYPE } from '../enums/phoenix-data-type';
import { MAPPING } from '../enums/phoenix-mapping';

export interface PhoenixChartDataColumn {
  type: DATA_TYPE;
  name: string;
  mapping: MAPPING;
  format?: string;
  dateGrain?: string;
}

export interface PhoenixChartData {
  rows: any[];
  columns: PhoenixChartDataColumn[];
}
