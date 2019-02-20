import { PHOENIX_DATA_TYPE } from '../enums/phoenix-data-type';
import { PHOENIX_MAPPING } from '../enums/phoenix-mapping';

export interface PhoenixChartDataColumn {
  type: PHOENIX_DATA_TYPE;
  name: string;
  mapping: PHOENIX_MAPPING;
  format: string;
}

export interface PhoenixChartData {
  rows: any[];
  columns: PhoenixChartDataColumn[];
}
