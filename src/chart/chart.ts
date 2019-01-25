import { PHOENIX_CHART_TYPE } from '../enums/phoenix-chart-type';
import {
  PhoenixChartConfig,
  PhoenixChartPalette
} from '../interfaces/phoenix-chart-config';
import { PhoenixChartData } from '../interfaces/phoenix-chart-data';
import { PhoenixChartOptions } from '../interfaces/phoenix-chart-options';
import * as Phoenix from '../lib/phoenix';

const DEFAULT_OPTIONS: PhoenixChartOptions = {
  height: 400,
  width: 500,
  animate: true,
  colors: null
};

export class PhoenixChart {
  private _type: PHOENIX_CHART_TYPE;
  private _data: PhoenixChartData;
  private _options: PhoenixChartOptions;
  private _instance: any;
  public canvas: HTMLCanvasElement;

  constructor(
    type: PHOENIX_CHART_TYPE,
    data: PhoenixChartData,
    options?: PhoenixChartOptions
  ) {
    this._type = type;
    this._data = data;
    if (Array.isArray(data.rows)) {
      if (!Array.isArray(data.rows[0])) {
        // Array of objects. Transform data to correct format.
        this._data.rows = this.transformData(data.rows);
      }
    }
    this._options = { ...DEFAULT_OPTIONS, ...options };
    this._instance = this._createInstance();
    this.canvas = this._instance.getCanvas();
  }

  /**
   * Render the Phoenix chart on the canvas element
   */
  render() {
    this._instance.draw(null, !this._options.animate, false);
  }

  /**
   * Resize the Phoenix chart
   */
  resize(width: number, height: number) {
    this._instance.resize(width, height);
  }

  /**
   * Update the Phoenix chart with new data
   */
  update(data: PhoenixChartData, colors?: string[]) {
    this._data = data;
    if (Array.isArray(data.rows)) {
      if (!Array.isArray(data.rows[0])) {
        // Array of objects. Transform data to correct format.
        this._data.rows = this.transformData(data.rows);
      }
    }
    const configString = this._createConfigString(this._type, data, colors);
    this._instance.updateChartJson(configString, !this._options.animate);
  }

  private transformData(rows) {
    const newRows = rows.map((row: Object) => {
      const newRow: any[] = [];
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          newRow.push(row[key]);
        }
      }
      return newRow;
    });

    return newRows;
  }

  private _createInstance() {
    const configString = this._createConfigString(
      this._type,
      this._data,
      this._options.colors
    );
    const chart = Phoenix.createPhoenixWithChartState(
      configString,
      '{}',
      this._options.width,
      this._options.height,
      true,
      0
    );

    return chart;
  }

  private _createConfigString(
    type: PHOENIX_CHART_TYPE,
    data: PhoenixChartData,
    colors?: string[]
  ): string {
    const chartConfig = this._toPhoenixConfig(type, data, colors);
    const configString = JSON.stringify(chartConfig);
    return configString;
  }

  private _toPhoenixConfig(
    type: PHOENIX_CHART_TYPE,
    data: PhoenixChartData,
    colors?: string[]
  ) {
    const config: PhoenixChartConfig = {
      datasources: {
        default: {
          type: 'ordered-column-list',
          data: {
            datasource: 'default',
            metadata: data.columns.map(col => ({ type: col.type })),
            mappings: data.columns.map(col => col.mapping),
            columns: data.columns.map(col => col.name),
            rows: data.rows,
            numRows: data.rows.length,
            numColumns: data.columns.length
          }
        }
      },
      components: {
        graph: {
          type: 'graph',
          badgetype: type,
          datasource: 'default',
          columnFormats: {},
          overrides: {}
        }
      },
      conditionalFormats: [],
      locale: 'en-US',
      version: '6'
    };
    if (colors) {
      config.palette = this._createPalette(colors);
    }
  }

  private _createPalette(colors: string[]): PhoenixChartPalette {
    const palette: PhoenixChartPalette = {
      colorRanges: [
        {
          name: 'CustomPalette',
          values: [...colors.map(color => color.substring(1))]
        }
      ],
      colorRules: [
        {
          min: 1,
          max: colors.length,
          values: [...colors.map((_color, index) => [0, index])]
        }
      ]
    };
    return palette;
  }
}
