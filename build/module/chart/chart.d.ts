import { CHART_TYPE } from '../enums/phoenix-chart-type';
import { Filter, PropertyOverridesMap } from '../interfaces/phoenix-chart-config';
import { ChartData } from '../interfaces/phoenix-chart-data';
import { PhoenixChartOptions } from '../interfaces/phoenix-chart-options';
export declare class Chart {
    private _type;
    private _data;
    private _options;
    private _instance;
    private _packet;
    canvas: HTMLCanvasElement;
    constructor(type: CHART_TYPE, data: ChartData, options?: PhoenixChartOptions);
    /**
     * Render the Phoenix chart on the canvas element
     */
    render(): void;
    /**
     * Resize the Phoenix chart
     */
    resize(width: number, height: number): void;
    /**
     * Update the Phoenix chart with new data
     */
    update(data: ChartData, options?: PhoenixChartOptions): void;
    /**
     * Update the Phoenix chart with a new set of chart property overrides
     */
    setChartProperties(properties: PropertyOverridesMap): void;
    /**
     * Reset the chart color palette to the Domo default palette, redraws the chart
     */
    resetColorPalette(): void;
    /**
     * Get the chart packet for debugging
     */
    getPacket(): string;
    /**
     * Is chart picker available for the current chart and data
     */
    isChartPickerAvailable(): boolean;
    /**
     * Is the chart picker panel open
     */
    isChartPickerOpen(): boolean;
    /**
     * Show the chart picker panel
     */
    showChartPicker(): void;
    /**
     * Hide the chart picker panel
     */
    hideChartPicker(): void;
    /**
     * Attach a handler to various Phoenix event types
     */
    addEventListener(type: string, handler: (event: Event) => boolean): void;
    /**
     * Have Phoenix render hover tooltips
     */
    setUsePhoenixHover(flag: boolean): void;
    /**
     *
     */
    highlight(filters: Filter[]): void;
    private transformData;
    private _createInstance;
    private _createConfigString;
    protected _getMapDefinition(type: CHART_TYPE): any;
    private _toPhoenixConfig;
    private _getFormat;
    private _createPalette;
}
