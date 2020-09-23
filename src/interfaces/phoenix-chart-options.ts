import { PropertyOverridesMap, Conditional, ComponentColorMap } from './phoenix-chart-config';

export interface PhoenixChartOptions {
  height: number;
  width: number;
  animate?: boolean;
  colors?: string[];
  properties?: PropertyOverridesMap;
  componentColors?: ComponentColorMap;
  backgroundColor?: string;
  textColor?: string;
  transparentBackground?: boolean;
  conditionalFormats?: Conditional[];
}