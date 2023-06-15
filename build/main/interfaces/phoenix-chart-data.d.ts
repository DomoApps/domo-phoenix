import { DATA_TYPE } from '../enums/phoenix-data-type';
import { MAPPING } from '../enums/phoenix-mapping';
import { ChartDataSourceData } from './phoenix-chart-config';
export declare const CalendarJoinColumns: {
    year: string;
    quarter: string;
    month: string;
    week: string;
    day: string;
};
export interface PhoenixChartDataColumn extends ChartDataColumnBase {
    grainColumnName: keyof typeof CalendarJoinColumns;
}
interface ChartDataColumnBase {
    type: DATA_TYPE;
    name: string;
    mapping: MAPPING;
    format?: string;
    dateGrain?: string;
}
export interface ChartData {
    rows: {
        [column: string]: string | number;
    }[] | (string | number)[][];
    columns: PhoenixChartDataColumn[];
    total?: (string | number)[];
    limit?: number;
    offset?: number;
    orderBy?: ChartDataSourceData['orderBy'];
}
export declare type PhoenixChartData = {
    rows: (string | number)[][];
    columns: PhoenixChartDataColumn[];
    total?: (string | number)[];
    limit?: number;
    offset?: number;
    orderBy?: ChartDataSourceData['orderBy'];
};
export {};
