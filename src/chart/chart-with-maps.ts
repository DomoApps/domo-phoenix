
import { _getMapDefinition as getDefinition } from './map-definitions';
import { Chart as ChartOnly } from './chart';
import { CHART_TYPE } from '../enums/phoenix-chart-type';

export class Chart extends ChartOnly {
  protected _getMapDefinition(type: CHART_TYPE) {
    return getDefinition(type);
  }
}