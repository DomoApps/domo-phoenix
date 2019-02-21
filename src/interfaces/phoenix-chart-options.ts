import { PropertyOverridesMap } from './phoenix-chart-config';

export interface PhoenixChartOptions {
  height: number;
  width: number;
  animate?: boolean;
  colors?: string[];
  properties?: PropertyOverridesMap;
  backgroundColor?: string;
  textColor?: string;
  transparentBackground?: boolean;
}
