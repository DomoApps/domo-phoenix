import { DATA_TYPE } from "..";

export interface PropertyOverridesMap {
  [key: string]: string | number | boolean;
}

interface ChartComponent {
  map?: {
    type: string;
    badgetype: string;
    mapdef: string;
    datasource: string;
    columnFormats: Object;
    overrides: PropertyOverridesMap;
  };
  graph?: {
    type: string;
    badgetype: string;
    datasource: string;
    columnFormats: Object;
    overrides: PropertyOverridesMap;
  };
}

export interface Filter {
  column: string;
  values: string[];
  operand: string;
  dataSourceId: string;
}

export type NumberFormat = 'default' | 'number' | 'currency' | 'percentage';
export type ColumnAlignment = "LEFT" | "RIGHT" | "CENTER";
export enum TableColumnAlignment {
  left = "left",
  right = "right",
  center = "center",
};
export type ColumnMapping = "ITEM" | "VALUE" | "SERIES" | "HOVER" | "BUBBLESIZE" | "GROUP1" | "GROUP2" | "COLUMN" | "ROW" | "EXTRAINFO1" | "EXTRAINFO2" | "EXTRAINFO3" | "CATEGORY" | "XTIME" | "VALUE1" | "VALUE2" | "RANGE1" | "RANGE2" | "RANGE3" | "SEGMENTS" | "CATEGORY1" | "CATEGORY2" | "CATEGORY3" | "CATEGORY4" | "CATEGORY5" | "TARGET" | "MEDIAN" | "UPPER" | "LOWER" | "CURRENT" | "DATE" | "EVENT" | "HIGH" | "LOW" | "OPEN" | "CLOSE" | "MIN" | "MAX" | "PREVIOUS" | "DATE" | "MEDIAN2" | "LOWER2" | "UPPER2" | "OUTLIERS" | "START_DATE" | "END_DATE" | "PERCENT_COMPLETE" | "HIGH" | "LOW" | "LABEL" | "LATITUDE" | "LONGITUDE" | "LATITUDE2" | "LONGITUDE2" | "COUNTRY" | "COLOR" | "ANNOTATION_DATE" | "POP_PERIOD" | "POP_INDEX";
export type Aggregation = "AVG" | "COUNT" | "MAX" | "MIN" | "SUM" | "STDDEV_POP" | "VAR_POP" | "APPROXIMATE_COUNT_DISTINCT" | "APPROXIMATE_COUNT_DISTINCT_SYNOPSIS" | "APPROXIMATE_COUNT_DISTINCT_OF_SYNOPSIS";
export type DateTimeElement = "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "QUARTER" | "YEAR" | "NONE";
// See apiContent FilterType.java
export type FilterType = "CALENDAR" | "COLUMN_ID" | "CARD_FORMULA_ID" | "FORMULA_ID" | "LEGACY" | "UNSUPPORTED";
export type DateFormat = string;

export interface BaseColumnFormat {
  type: NumberFormat;
  format?: string;
  commas?: boolean;
  percentMultiplied?: boolean;
  precision?: number;
  currency?: string;
  percent?: boolean;
}

export interface ColumnFormat extends BaseColumnFormat {
  alignment?: ColumnAlignment;
  style?: TextStyle;
  dateFormat?: DateFormat;
  tableColumn?: TableColumnFormat;
  default?: boolean;
}

export type TableAggregation = 'SUM' | 'COUNT';
export type TableColumnFormat = {
  width: number;
  aggregation: TableAggregation;
  percentOfTotal?: boolean;
  dataCalculation?: DataCalculation;

  hideTotal: boolean;
  totalAlignment: TableColumnAlignment;
  totalStyle: TextStyle;

  hideSubtotal: boolean;
  subtotalAlignment: TableColumnAlignment;
  subtotalCalculation: DataCalculation;
  subtotalStyle: TextStyle;
}

export enum DataCalculation {
  PERC_GRAND_TOTAL = 'PERC_GRAND_TOTAL',
  PERC_COLUMN_TOTAL = 'PERC_COLUMN_TOTAL',
  PERC_ROW_TOTAL = 'PERC_ROW_TOTAL',
  PERC_PARENT_ROW = 'PERC_PARENT_ROW',
  PERC_PARENT_COLUMN = 'PERC_PARENT_COLUMN',
  RUNNING_TOTAL = 'RUNNING_TOTAL',
  RANK_SML_TO_LRG = 'RANK_SML_TO_LRG',
  RANK_LRG_TO_SML = 'RANK_LRG_TO_SML',
}

interface PhoenixChartPaletteColorRange {
  name: string;
  values: string[];
}

interface PhoenixChartPaletteColorRule {
  min: number;
  max: number;
  values: number[][];
}

interface PhoenixChartPaletteGradient {
  colCount: number;
  values: number[][];
}

export interface PhoenixChartPalette {
  colorRanges: PhoenixChartPaletteColorRange[];
  colorRules: PhoenixChartPaletteColorRule[];
  gradients: PhoenixChartPaletteGradient[];
  lineColors?: number[][];
  nameColorMap?: { [key: string]: number[] };
}

export interface PhoenixChartConfig {
  cardURN?: string;
  components?: ChartComponent;
  conditionalFormats?: ConditionalFormat[];
  maps?: {
    map: MapAreaComponent;
  };
  datasources?: {
    [id: string]: ChartDataSource;
  };
  locale?: string;
  pageLayout?: boolean;
  editComponents?: boolean;
  timeZoneOffset?: string;
  scaleLineColor?: string;
  textColor?: string;
  transparent?: boolean;
  projectionButtonsDefault?: boolean;
  version?: string;
  mobileDarkMode?: boolean;
  dp19Sizzle?: boolean;
  pageDateFilter?: boolean;
  palette?: ColorPaletteData;
  backgroundColor?: string;
  cardLinking?: boolean;
  mobile?: boolean;
  variableId?: string; // this property tells Phoenix this chart is a variable control
}

export enum ColorPaletteType {
  DOMO = "DOMO",
  CUSTOMER = "CUSTOMER",
}

type ColorRange = {
  name: string
  values: string[]
}

type ColorSet = {
  colCount: number
  values: number[][]
}

export type ColorPaletteRule = {
  min: number
  max: number
  values: number[][]
}

export type ColorPaletteData = {
  id: string;
  type: ColorPaletteType;
  name: string;
  colorRanges: ColorRange[];
  colorRules: ColorPaletteRule[];
  gradients: ColorSet[];
  largeSelector?: ColorSet;
  lineColors?: number[][];
  nameColorMap: {
    [colorName: string]: number[]
  };
  popColors?: number[][];
  popVarColors?: number[][];
  popVarLineColors?: number[][];
  popBarColors?: any;
  popLineColors?: number[][];
  selector?: number[][][];
  smallSelector?: ColorSet;
}

type TextStyle = "PLAIN" | "ITALIC" | "BOLD" | "BOLD_ITALIC" | "MEDIUM" | "MEDIUM_ITALIC" | "LIGHT" | "LIGHT_ITALIC" | "UNDERLINE";

type Format = {
  color?: string;
  textColor?: string;
  textStyle?: TextStyle;
  applyToRow?: boolean;
}

export type ConditionalFormat = {
  id?: string;
  cardId?: string;
  dataSourceId?: string;
  format: Format;
  condition: Filter;
}

type MapAreaComponent = {
  layers: {
    name: string;
    type: string;
    areas?: {
      name: string;
      longname?: string;
      polys: any[];
    }[];
    shapes?: {
      name: string;
      longname?: string;
    }[];
    points?: any[];
  }[];
}

type ColumnMetadata = {
  type: DATA_TYPE;
  label?: string;
  column: string;
  filterType: FilterType;
  dateJoinColumn?: string;
  dataSourceId: string;
  fiscal?: boolean;
  maxLength: number;
  minLength: number;
  aggregation?: Aggregation;
  calendarColumn?: boolean;
}

export type ChartDataSourceData = {
  datasource: string;
  dateGrain?: DateTimeElement;
  dateJoinColumn?: string;
  columns: string[];
  queryUrl?: string
  fiscal?: boolean;
  aliases?: string[];
  formats?: ColumnFormat[];
  mappings?: ColumnMapping[];
  metadata: ColumnMetadata[];
  fromcache?: boolean;
  rows: (string | number)[][];
  numRows: number;
  numColumns: number;
  limit?: number;
  offset?: number;
  orderBy?: SortColumn[];
}

export interface SortColumn {
  column: string;
  order: SortOrder;
  aggregation: Aggregation;
  formulaId?: string;
  calendar?: boolean;
  staticSort?: boolean;
}

export type SortOrder = "ASCENDING" | "DESCENDING";

export type ChartDataSource = {
  type: 'ordered-column-list',
  limited: boolean;
  data: ChartDataSourceData;
  total?: ChartDataSourceData;
  subtotal?: ChartDataSourceData;
  pivottotals?: ChartDataSourceData[];
}

export enum ComponentColorName {
  NestedBar = "NestedBar",
  NestedBarDisabled = "NestedBarDisabled",
  BoxPlotFill = "BoxPlotFill",
  BoxPlotStroke = "BoxPlotStroke",
  CatScatterFill = "CatScatterFill",
  CatScatterStroke = "CatScatterStroke",
  FilledGaugeRed = "FilledGaugeRed",
  FilledGaugeGreen = "FilledGaugeGreen",
  CompGaugeLtGreen = "CompGaugeLtGreen",
  CompGaugeDkGreen = "CompGaugeDkGreen",
  CompGaugeArrowGreen = "CompGaugeArrowGreen",
  CompGaugeLtRed = "CompGaugeLtRed",
  CompGaugeDkRed = "CompGaugeDkRed",
  CompGaugeArrowRed = "CompGaugeArrowRed",
  ProgressBar = "ProgressBar",
  FaceGaugeGreen = "FaceGaugeGreen",
  FaceGaugeYellow = "FaceGaugeYellow",
  FaceGaugeRed = "FaceGaugeRed",
  FaceGaugeGray = "FaceGaugeGray",
  LineScaleRangeGray = "LineScaleRangeGray",
  LineScaleRangeBlue = "LineScaleRangeBlue",
  LineScaleRangeGreen = "LineScaleRangeGreen",
  ParetoLine = "ParetoLine",
  CandlestickUpGreen = "CandlestickUpGreen",
  CandlestickDnRed = "CandlestickDnRed",
  WaterfallGreen = "WaterfallGreen",
  WaterfallRed = "WaterfallRed",
  WaterfallBlue = "WaterfallBlue",
  WordCloudFirstOrange = "WordCloudFirstOrange",
  WordCloudSecBlue = "WordCloudSecBlue",
  DragSelect = "DragSelect",
  LineRangeOutlierFill = "LineRangeOutlierFill",
  LineRangeDashedRed = "LineRangeDashedRed",
  POPSingleVarianceLine = "POPSingleVarianceLine",
  PositiveColor = "PositiveColor",
  NegativeColor = "NegativeColor",
  BulletActual = "BulletActual",
  BulletTarget = "BulletTarget",
  BulletRange1 = "BulletRange1",
  BulletRange2 = "BulletRange2",
  BulletRange3 = "BulletRange3",
  NoData = "NoData",
  NoDataVeryLight = "NoDataVeryLight",
  NoDataLight = "NoDataLight",
  NoDataMedium = "NoDataMedium",
  NoDataDark = "NoDataDark",
  NoDataVeryDark = "NoDataVeryDark",
  NoDataCalendar = "NoDataCalendar",
  GrayCalendar = "GrayCalendar",
}


export type ComponentColorMap = {
  [name in ComponentColorName]?: number[];
}