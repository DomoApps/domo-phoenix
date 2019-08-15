export interface PropertyOverridesMap {
  [key: string]: string | number | boolean;
}

interface Component {
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

export interface Conditional {
  condition: Filter;
  format: {
    color: string;
    textColor: string;
    textStyle: string;
    applyToRow: boolean;
  };
}

interface BadgeDataMetadata {
  type: string;
  dataSourceId?: string;
  calendarColumn?: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface BadgeDataColFormat {
  type: string;
  format: string;
  precision: number;
  currency: string;
  commas: boolean;
  percent: boolean;
  percentMultiplied: boolean;
}

export interface BadgeData {
  datasource?: string;
  queryUrl?: string;
  columns: string[];
  aliases?: string[];
  mappings?: Object[];
  metadata?: BadgeDataMetadata[];
  formats?: BadgeDataColFormat[];
  fromcache?: boolean | string;
  rows: Object[][];
  numRows?: number;
  numColumns?: number;
}

interface PhoenixData {
  type: string;
  data: BadgeData;
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
  datasources: {
    [key: string]: PhoenixData;
  };
  components: Component;
  maps?: any;
  palette?: PhoenixChartPalette;
  conditionalFormats: Conditional[];
  phoenixZoom?: boolean;
  backgroundColor?: string;
  textColor?: string;
  locale?: string;
  version?: string;
  cardURN?: string;
}
