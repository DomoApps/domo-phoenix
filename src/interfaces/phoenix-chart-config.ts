export interface PropertyOverridesMap {
  [key: string]: string | number | boolean;
}

interface Component {
  map?: {};
  graph?: {
    type: string;
    badgetype: string;
    datasource: string;
    columnFormats: Object;
    overrides: PropertyOverridesMap;
  };
}

interface Conditional {
  condition: {
    column: string;
    values: string[];
    operand: string;
    dataSourceId: string;
  };
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

export interface BadgeData {
  datasource?: string;
  queryUrl?: string;
  columns: string[];
  aliases?: string[];
  mappings?: Object[];
  metadata?: BadgeDataMetadata[];
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

export interface PhoenixChartPalette {
  colorRanges: PhoenixChartPaletteColorRange[];
  colorRules: PhoenixChartPaletteColorRule[];
  lineColors?: number[][];
}

export interface PhoenixChartConfig {
  datasources: {
    [key: string]: PhoenixData;
  };
  components: Component;
  palette?: PhoenixChartPalette;
  conditionalFormats: Conditional[];
  locale?: string;
  version?: string;
  cardURN?: string;
}