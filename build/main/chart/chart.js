"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
var phoenix_data_type_1 = require("../enums/phoenix-data-type");
var phoenix_chart_config_1 = require("../interfaces/phoenix-chart-config");
var phoenix_chart_data_1 = require("../interfaces/phoenix-chart-data");
var Phoenix = __importStar(require("../lib/phoenix"));
var map_utils_1 = require("./map-utils");
var DEFAULT_OPTIONS = {
    height: 400,
    width: 500,
    animate: true,
    colors: null,
    componentColors: {},
    backgroundColor: null,
    textColor: null,
    transparentBackground: false
};
var Chart = /** @class */ (function () {
    function Chart(type, data, options) {
        this._type = type;
        this._data = this.transformData(data);
        this._options = __assign(__assign({}, DEFAULT_OPTIONS), options);
        this._instance = this._createInstance();
        this._instance.setTransparentBackground(this._options.transparentBackground);
        this.setUsePhoenixHover(true);
        this.canvas = this._instance.getCanvas();
    }
    /**
     * Render the Phoenix chart on the canvas element
     */
    Chart.prototype.render = function () {
        this._instance.draw(null, !this._options.animate, false);
    };
    /**
     * Resize the Phoenix chart
     */
    Chart.prototype.resize = function (width, height) {
        this._instance.resize(width, height);
    };
    /**
     * Update the Phoenix chart with new data
     */
    Chart.prototype.update = function (data, options) {
        if (options && options.colors) {
            // Changing color palette, update options
            this._options.colors = options.colors;
        }
        if (options && options.properties) {
            // Changing chart properties, update options
            this._options.properties = options.properties;
        }
        this._data = this.transformData(data);
        var configString = this._createConfigString(this._type, this._data, this._options);
        this._packet = configString;
        this._instance.updateChartJson(configString, !this._options.animate);
    };
    /**
     * Update the Phoenix chart with a new set of chart property overrides
     */
    Chart.prototype.setChartProperties = function (properties) {
        this._options.properties = properties;
        this.update(this._data);
    };
    /**
     * Reset the chart color palette to the Domo default palette, redraws the chart
     */
    Chart.prototype.resetColorPalette = function () {
        this._options.colors = null;
        this.update(this._data);
    };
    /**
     * Get the chart packet for debugging
     */
    Chart.prototype.getPacket = function () {
        return this._packet;
    };
    /**
     * Is chart picker available for the current chart and data
     */
    Chart.prototype.isChartPickerAvailable = function () {
        return this._instance.isChartPickerAvailable();
    };
    /**
     * Is the chart picker panel open
     */
    Chart.prototype.isChartPickerOpen = function () {
        return this._instance.isChartPickerOpen();
    };
    /**
     * Show the chart picker panel
     */
    Chart.prototype.showChartPicker = function () {
        this._instance.showChartPicker();
    };
    /**
     * Hide the chart picker panel
     */
    Chart.prototype.hideChartPicker = function () {
        this._instance.hideChartPicker();
    };
    /**
     * Attach a handler to various Phoenix event types
     */
    Chart.prototype.addEventListener = function (type, handler) {
        this._instance.addEventListener(type, handler);
        if (type === 'hover') {
            this.setUsePhoenixHover(false);
        }
    };
    /**
     * Have Phoenix render hover tooltips
     */
    Chart.prototype.setUsePhoenixHover = function (flag) {
        this._instance.setUsePhoenixHover(flag);
    };
    /**
     *
     */
    Chart.prototype.highlight = function (filters) {
        if (filters && filters.length) {
            var needsRedraw = this._instance.highlight(JSON.stringify(filters));
            if (needsRedraw) {
                this._instance.draw();
            }
        }
    };
    Chart.prototype.transformData = function (data) {
        var columns = data.columns, rows = data.rows, total = data.total, limit = data.limit, offset = data.offset, orderBy = data.orderBy;
        // Modify grained column objects
        columns.forEach(function (c) {
            if (c.dateGrain != null) {
                c.type = c.dateGrain === 'day' ? phoenix_data_type_1.DATA_TYPE.DATE : phoenix_data_type_1.DATA_TYPE.STRING;
                c.grainColumnName = phoenix_chart_data_1.CalendarJoinColumns[c.dateGrain];
            }
        });
        if (rows &&
            rows[0] &&
            rows[0] instanceof Object &&
            !Array.isArray(rows[0])) {
            // Use "columns" array to convert "rows" to a 2D array
            var make2Dimensional = function (r) {
                var row = [];
                columns &&
                    columns.forEach(function (c) { return row.push(r[c.grainColumnName || c.name]); });
                return row;
            };
            var newRows = rows.map(make2Dimensional);
            return {
                columns: columns,
                rows: newRows,
                total: total,
                limit: limit,
                offset: offset,
                orderBy: orderBy,
            };
        }
        return {
            columns: columns,
            rows: rows,
            total: total,
            limit: limit,
            offset: offset,
            orderBy: orderBy,
        };
    };
    Chart.prototype._createInstance = function () {
        var configString = this._createConfigString(this._type, this._data, this._options);
        var chart = Phoenix.createPhoenixWithChartState(configString, '{}', this._options.width, this._options.height, true, 0);
        this._packet = configString;
        return chart;
    };
    Chart.prototype._createConfigString = function (type, data, options) {
        var chartConfig = this._toPhoenixConfig(type, data, options);
        var configString = JSON.stringify(chartConfig);
        return configString;
    };
    Chart.prototype._getMapDefinition = function (type) {
        console.error("Could not get definition for \"" + type + "\", this version of domoPhoenix does not include maps.");
        return null;
    };
    Chart.prototype._toPhoenixConfig = function (type, data, options) {
        var _a;
        var _this = this;
        var dataSourceId = 'default';
        var columns = data.columns.map(function (col) { return col.name; });
        var total;
        if (data.total) {
            total = {
                datasource: dataSourceId,
                metadata: data.columns.map(function (col) { return ({
                    label: col.name,
                    type: col.type,
                    column: col.name,
                    filterType: undefined,
                    dataSourceId: dataSourceId,
                    maxLength: -1,
                    minLength: -1,
                }); }),
                columns: columns,
                rows: [data.total],
                numRows: 1,
                numColumns: data.columns.length
            };
        }
        var config = {
            datasources: (_a = {},
                _a[dataSourceId] = {
                    type: 'ordered-column-list',
                    limited: undefined,
                    data: {
                        datasource: dataSourceId,
                        aliases: undefined,
                        metadata: data.columns.map(function (col) { return ({
                            label: col.name,
                            type: col.type,
                            column: col.name,
                            filterType: undefined,
                            dataSourceId: dataSourceId,
                            maxLength: -1,
                            minLength: -1,
                        }); }),
                        limit: data.limit,
                        offset: data.offset,
                        orderBy: data.orderBy,
                        mappings: data.columns.map(function (col) { return col.mapping; }),
                        columns: columns,
                        formats: data.columns.map(function (col) { return _this._getFormat(col.format); }),
                        rows: data.rows,
                        numRows: data.rows.length,
                        numColumns: data.columns.length,
                        fiscal: undefined,
                        fromcache: false,
                    },
                    total: total,
                },
                _a),
            components: {
                graph: !(0, map_utils_1._isMap)(type)
                    ? {
                        type: 'graph',
                        badgetype: type,
                        datasource: 'default',
                        columnFormats: {},
                        overrides: options.properties || {}
                    }
                    : null,
                map: (0, map_utils_1._isMap)(type)
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
            maps: (0, map_utils_1._isMap)(type) && this._getMapDefinition(type),
            conditionalFormats: options.conditionalFormats,
            locale: 'en-US',
            cardLinking: true,
            version: '7'
        };
        if ((0, map_utils_1._isMap)(type)) {
            // Make sure there is nothing graphs related when it's not a graph
            delete config.components.graph;
        }
        else {
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
            config.palette = this._createPalette(options.colors, options.componentColors);
        }
        return config;
    };
    Chart.prototype._getFormat = function (format) {
        if (format != null && format.trim().length > 0) {
            var colFmt = {
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
                colFmt.type = 'percentage';
                colFmt.percent = true;
                format = format.trim().substr(0, format.length - 1);
            }
            else {
                var firstChar = format.charAt(0);
                if (firstChar == '$' ||
                    firstChar == '¥' ||
                    firstChar == '€' ||
                    firstChar == '£') {
                    colFmt.type = 'currency';
                    colFmt.currency = firstChar;
                }
            }
            if (format.indexOf(',') != -1) {
                colFmt.commas = true;
                colFmt.format = '###,###';
            }
            var decPos = format.indexOf('.');
            if (decPos != -1) {
                format = format.substr(decPos + 1);
                colFmt.precision = format.trim().length;
                colFmt.format += '.' + format;
            }
            return colFmt;
        }
        return null;
    };
    Chart.prototype._createPalette = function (colors, colorMap) {
        var _a;
        var getColor = function (color) { return color.charAt(0) === '#' ? color.substring(1) : color; };
        var colorRanges = [
            {
                name: 'CustomPalette',
                values: __spreadArray([], colors.map(function (color) { return getColor(color); }), true)
            }
        ];
        var colorRules = [
            {
                min: 1,
                max: colors.length,
                values: __spreadArray([], colors.map(function (_color, index) { return [0, index]; }), true)
            }
        ];
        var gradients = [
            {
                colCount: colors.length,
                values: __spreadArray([], colors.map(function (_color, index) { return [0, index]; }), true)
            }
        ];
        var nameColorMap = (_a = {},
            _a[phoenix_chart_config_1.ComponentColorName.BoxPlotFill] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.BoxPlotStroke] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.CandlestickDnRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.CandlestickUpGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.CatScatterFill] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.CatScatterStroke] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeArrowGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeArrowRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeDkGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeDkRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeLtGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.CompGaugeLtRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.FaceGaugeGray] = [0, 3],
            _a[phoenix_chart_config_1.ComponentColorName.FaceGaugeGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.FaceGaugeRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.FaceGaugeYellow] = [0, 2],
            _a[phoenix_chart_config_1.ComponentColorName.FilledGaugeGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.FilledGaugeRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.ProgressBar] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.WaterfallBlue] = [0, 2],
            _a[phoenix_chart_config_1.ComponentColorName.WaterfallGreen] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.WaterfallRed] = [0, 1],
            _a[phoenix_chart_config_1.ComponentColorName.WordCloudFirstOrange] = [0, 0],
            _a[phoenix_chart_config_1.ComponentColorName.WordCloudSecBlue] = [0, 1],
            _a);
        if (colorMap) {
            var mapRange_1 = { name: 'ColorMapRange', values: [] };
            var mapIndex_1 = colorRanges.push(mapRange_1) - 1;
            Object.keys(colorMap).forEach(function (key) {
                var colorIndex = mapRange_1.values.push(getColor(colorMap[key])) - 1;
                nameColorMap[key] = [mapIndex_1, colorIndex];
            });
        }
        var palette = {
            id: 'custom',
            type: phoenix_chart_config_1.ColorPaletteType.CUSTOMER,
            name: 'custom',
            colorRanges: colorRanges,
            colorRules: colorRules,
            gradients: gradients,
            nameColorMap: nameColorMap,
        };
        return palette;
    };
    return Chart;
}());
exports.Chart = Chart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY2hhcnQvY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0VBQXVEO0FBQ3ZELDJFQVU0QztBQUM1Qyx1RUFBb0c7QUFFcEcsc0RBQTBDO0FBQzFDLHlDQUFxQztBQUVyQyxJQUFNLGVBQWUsR0FBd0I7SUFDM0MsTUFBTSxFQUFFLEdBQUc7SUFDWCxLQUFLLEVBQUUsR0FBRztJQUNWLE9BQU8sRUFBRSxJQUFJO0lBQ2IsTUFBTSxFQUFFLElBQUk7SUFDWixlQUFlLEVBQUUsRUFBRTtJQUNuQixlQUFlLEVBQUUsSUFBSTtJQUNyQixTQUFTLEVBQUUsSUFBSTtJQUNmLHFCQUFxQixFQUFFLEtBQUs7Q0FDN0IsQ0FBQztBQUVGO0lBUUUsZUFDRSxJQUFnQixFQUNoQixJQUFlLEVBQ2YsT0FBNkI7UUFFN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLHlCQUFRLGVBQWUsR0FBSyxPQUFPLENBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUNwQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FB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