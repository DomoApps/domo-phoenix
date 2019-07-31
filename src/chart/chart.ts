import { CHART_TYPE } from '../enums/phoenix-chart-type';
import { DATA_TYPE } from '../enums/phoenix-data-type';
import {
  PhoenixChartConfig,
  PhoenixChartPalette,
  BadgeDataColFormat,
  PropertyOverridesMap
} from '../interfaces/phoenix-chart-config';
import { PhoenixChartData } from '../interfaces/phoenix-chart-data';
import { PhoenixChartOptions } from '../interfaces/phoenix-chart-options';
import * as Phoenix from '../lib/phoenix';
import { _isMap } from './map-utils';

const DEFAULT_OPTIONS: PhoenixChartOptions = {
  height: 400,
  width: 500,
  animate: true,
  colors: null,
  backgroundColor: null,
  textColor: null,
  transparentBackground: false
};

export class Chart {
  private _type: CHART_TYPE;
  private _data: PhoenixChartData;
  private _options: PhoenixChartOptions;
  private _instance: any;
  private _packet: string;
  public canvas: HTMLCanvasElement;

  constructor(
    type: CHART_TYPE,
    data: PhoenixChartData,
    options?: PhoenixChartOptions
  ) {
    this._type = type;
    this._data = this.transformData(data.columns, data.rows);
    this._options = { ...DEFAULT_OPTIONS, ...options };
    this._instance = this._createInstance();
    this._instance.setUsePhoenixHover(true);
    this._instance.setTransparentBackground(
      this._options.transparentBackground
    );
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
  update(data: PhoenixChartData, options?: PhoenixChartOptions) {
    if (options && options.colors) {
      // Changing color palette, update options
      this._options.colors = options.colors;
    }
    if (options && options.properties) {
      // Changing chart properties, update options
      this._options.properties = options.properties;
    }
    this._data = this.transformData(data.columns, data.rows);
    const configString = this._createConfigString(
      this._type,
      this._data,
      this._options
    );
    this._packet = configString;
    this._instance.updateChartJson(configString, !this._options.animate);
  }

  /**
   * Update the Phoenix chart with a new set of chart property overrides
   */
  setChartProperties(properties: PropertyOverridesMap) {
    this._options.properties = properties;
    this.update(this._data);
  }

  /**
   * Reset the chart color palette to the Domo default palette, redraws the chart
   */
  resetColorPalette() {
    this._options.colors = null;
    this.update(this._data);
  }

  /**
   * Get the chart packet for debugging
   */
  getPacket(): string {
    return this._packet;
  }

  /**
   * Is chart picker available for the current chart and data
   */
  isChartPickerAvailable(): boolean {
    return this._instance.isChartPickerAvailable();
  }

  /**
   * Is the chart picker panel open
   */
  isChartPickerOpen(): boolean {
    return this._instance.isChartPickerOpen();
  }

  /**
   * Show the chart picker panel
   */
  showChartPicker() {
    this._instance.showChartPicker();
  }

  /**
   * Hide the chart picker panel
   */
  hideChartPicker() {
    this._instance.hideChartPicker();
  }

  /**
   * Attach a handler to various Phoenix event types
   */
  addEventListener(type: string, handler: (event: Event) => boolean) {
    this._instance.addEventListener(type, handler);
  }

  private transformData(columns, rows) {
    // Modify grained column objects
    var CalendarJoinColumns = {
      year: 'Year',
      quarter: 'CalendarQuarter',
      month: 'CalendarMonth',
      week: 'CalendarWeek',
      day: 'Date'
    };
    columns.forEach(c => {
      if (c.dateGrain != null) {
        c.type = c.dateGrain === 'day' ? DATA_TYPE.DATE : DATA_TYPE.STRING;
        c.grainColumnName = CalendarJoinColumns[c.dateGrain];
      }
    });

    if (
      rows &&
      rows[0] &&
      rows[0] instanceof Object &&
      !Array.isArray(rows[0])
    ) {
      // Use "columns" array to convert "rows" to a 2D array
      var make2Dimensional = function(r) {
        var row = [];
        columns &&
          columns.forEach(c => row.push(r[c.grainColumnName || c.name]));
        return row;
      };

      return {
        columns,
        rows: rows.map(make2Dimensional)
      };
    }

    return { columns: columns, rows: rows };
  }

  private _createInstance() {
    const configString = this._createConfigString(
      this._type,
      this._data,
      this._options
    );
    const chart = Phoenix.createPhoenixWithChartState(
      configString,
      '{}',
      this._options.width,
      this._options.height,
      true,
      0
    );
    this._packet = configString;

    return chart;
  }

  private _createConfigString(
    type: CHART_TYPE,
    data: PhoenixChartData,
    options?: PhoenixChartOptions
  ): string {
    const chartConfig = this._toPhoenixConfig(type, data, options);
    const configString = JSON.stringify(chartConfig);
    return configString;
  }

  protected _getMapDefinition(type: CHART_TYPE) {
    console.error(
      `Could not get definition for "${type}", this version of domoPhoenix does not include maps.`
    );
    return null;
  }

  private _toPhoenixConfig(
    type: CHART_TYPE,
    data: PhoenixChartData,
    options?: PhoenixChartOptions
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
            formats: data.columns.map(col => this._getFormat(col.format)),
            rows: data.rows,
            numRows: data.rows.length,
            numColumns: data.columns.length
          }
        }
      },
      components: {
        graph: !_isMap(type)
          ? {
              type: 'graph',
              badgetype: type,
              datasource: 'default',
              columnFormats: {},
              overrides: options.properties || {}
            }
          : null,
        map: _isMap(type)
          ? {
              type: 'map',
              badgetype: type,
              mapdef: 'map',
              datasource: 'default',
              columnFormats: {},
              overrides: options.properties || {}
            }
          : null
      },
      maps: _isMap(type) && this._getMapDefinition(type),
      conditionalFormats: [],
      locale: 'en-US',
      version: '6'
    };
    if (_isMap(type)) {
      // Make sure there is nothing graphs related when it's not a graph
      delete config.components.graph;
    } else {
      // Make sure there is nothing maps related when it's not a map
      delete config.maps;
      delete config.components.map;
    }
    if (options.backgroundColor) {
      config.backgroundColor = options.backgroundColor;
    }
    if (options.textColor) {
      config.textColor = options.textColor;
    }
    if (options.colors) {
      config.palette = this._createPalette(options.colors);
    }
    return config;
  }

  private _getFormat(format: string): BadgeDataColFormat {
    if (format != null && format.trim().length > 0) {
      const colFmt: BadgeDataColFormat = {
        type: 'default',
        format: '#',
        currency: '$',
        commas: false,
        precision: 0,
        percentMultiplied: true,
        percent: false
      };
      format = format.trim();
      if (format.indexOf('%') != -1) {
        colFmt.type = 'percent';
        colFmt.percent = true;
        format = format.trim().substr(0, format.length - 1);
      } else {
        const firstChar = format.charAt(0);
        if (
          firstChar == '$' ||
          firstChar == '¥' ||
          firstChar == '€' ||
          firstChar == '£'
        ) {
          colFmt.type = 'currency';
          colFmt.currency = firstChar;
        }
      }
      if (format.indexOf(',') != -1) {
        colFmt.commas = true;
        colFmt.format = '###,###';
      }
      const decPos = format.indexOf('.');
      if (decPos != -1) {
        format = format.substr(decPos + 1);
        colFmt.precision = format.trim().length;
        colFmt.format += '.' + format;
      }
      return colFmt;
    }
    return null;
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
      ],

      gradients: [
        {
          colCount: colors.length,
          values: [...colors.map((_color, index) => [0, index])]
        }
      ],

      nameColorMap: {
        FilledGaugeGreen: [0, 0],
        FilledGaugeRed: [0, 1],
        CompGaugeLtGreen: [0, 0],
        CompGaugeDkGreen: [0, 0],
        CompGaugeArrowGreen: [0, 0],
        CompGaugeLtRed: [0, 1],
        CompGaugeDkRed: [0, 1],
        CompGaugeArrowRed: [0, 1],
        ProgressBar: [0, 0],
        FaceGaugeGreen: [0, 0],
        FaceGaugeRed: [0, 1],
        FaceGaugeYellow: [0, 2],
        FaceGaugeGray: [0, 3],
        BoxPlotFill: [0, 0],
        BoxPlotStroke: [0, 1],
        CatScatterFill: [0, 0],
        CatScatterStroke: [0, 1],
        CandlestickUpGreen: [0, 0],
        CandlestickDnRed: [0, 1],
        WaterfallGreen: [0, 0],
        WaterfallRed: [0, 1],
        WaterfallBlue: [0, 2],
        WordCloudFirstOrange: [0, 0],
        WordCloudSecBlue: [0, 1]
      }
    };
    return palette;
  }
}
