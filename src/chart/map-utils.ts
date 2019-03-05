import { CHART_TYPE } from '../enums/phoenix-chart-type';

export function _isMap(type: string): boolean {
  switch (type) {
    case CHART_TYPE.MAP_WORLD:
    case CHART_TYPE.MAP_UNITED_STATES:
    case CHART_TYPE.MAP_AFRICA:
    case CHART_TYPE.MAP_ASIA:
    case CHART_TYPE.MAP_AUSTRALIA:
    case CHART_TYPE.MAP_AUSTRIA:
    case CHART_TYPE.MAP_BRAZIL:
    case CHART_TYPE.MAP_CANADA:
    case CHART_TYPE.MAP_CHILE:
    case CHART_TYPE.MAP_CHINA:
    case CHART_TYPE.MAP_CUSTOM:
    case CHART_TYPE.MAP_EUROPE:
    case CHART_TYPE.MAP_FRANCE:
    case CHART_TYPE.MAP_FRANCE:
    case CHART_TYPE.MAP_FRANCE_DEPARTMENTS:
    case CHART_TYPE.MAP_GERMANY:
    case CHART_TYPE.MAP_GHANA:
    case CHART_TYPE.MAP_INDIA:
    case CHART_TYPE.MAP_INDONESIA:
    case CHART_TYPE.MAP_ITALY:
    case CHART_TYPE.MAP_JAPAN:
    case CHART_TYPE.MAP_LATLONG:
    case CHART_TYPE.MAP_LATLONG_ROUTE:
    case CHART_TYPE.MAP_MALAYSIA:
    case CHART_TYPE.MAP_MEXICO:
    case CHART_TYPE.MAP_MIDDLE_EAST:
    case CHART_TYPE.MAP_NEW_ZEALAND:
    case CHART_TYPE.MAP_NIGERIA:
    case CHART_TYPE.MAP_NORTH_AMERICA:
    case CHART_TYPE.MAP_PANAMA:
    case CHART_TYPE.MAP_PERU:
    case CHART_TYPE.MAP_PHILIPPINES:
    case CHART_TYPE.MAP_PORTUGAL:
    case CHART_TYPE.MAP_SOUTH_AMERICA:
    case CHART_TYPE.MAP_SOUTH_KOREA:
    case CHART_TYPE.MAP_SPAIN:
    case CHART_TYPE.MAP_SWITZERLAND:
    case CHART_TYPE.MAP_UAE:
    case CHART_TYPE.MAP_UK_COUNTRY:
    case CHART_TYPE.MAP_UK_POSTAL:
    case CHART_TYPE.MAP_UNITED_KINGDOM:
    case CHART_TYPE.MAP_US_COUNTIES:
    case CHART_TYPE.MAP_US_STATE:
      return true;
    default:
      return false;
  }
}
