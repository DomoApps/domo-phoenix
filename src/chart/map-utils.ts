import { PHOENIX_CHART_TYPE } from '../enums/phoenix-chart-type';
import AFRICA_MAP from '../maps/africa.json';
import ASIA_MAP from '../maps/asia.json';
import AUSTRALIA_MAP from '../maps/australia.json';
import AUSTRIA_MAP from '../maps/austria.json';
import BRAZIL_MAP from '../maps/brazil.json';
import CANADA_MAP from '../maps/canada.json';
import CHILE_MAP from '../maps/chile.json';
import CHINA_MAP from '../maps/china.json';
import EUROPE_MAP from '../maps/europe.json';
import FRANCE_MAP from '../maps/france.json';
import FRANCE_DEPT_MAP from '../maps/france_dept.json';
import GERMANY_MAP from '../maps/germany.json';
import GHANA_MAP from '../maps/ghana.json';
import INDIA_MAP from '../maps/india.json';
import INDONESIA_MAP from '../maps/indonesia.json';
import ITALY_MAP from '../maps/italy.json';
import JAPAN_MAP from '../maps/japan.json';
import MALAYSIA_MAP from '../maps/malaysia.json';
import MEXICO_MAP from '../maps/mexico.json';
import MIDDLE_EAST_MAP from '../maps/middle_east.json';
import NEW_ZEALAND_MAP from '../maps/new_zealand.json';
import NIGERIA_MAP from '../maps/nigeria.json';
import NORTH_AMERICA_MAP from '../maps/north_america.json';
import PANAMA_MAP from '../maps/panama.json';
import PERU_MAP from '../maps/peru.json';
import PHILIPPINES_MAP from '../maps/philippines.json';
import PORTUGAL_MAP from '../maps/portugal.json';
import SOUTH_AMERICA_MAP from '../maps/south_america.json';
import SOUTH_KOREA_MAP from '../maps/south_korea.json';
import SPAIN_MAP from '../maps/spain.json';
import SWITZERLAND_MAP from '../maps/switzerland.json';
import UAE_MAP from '../maps/uae.json';
import UNITED_KINGDOM_MAP from '../maps/united_kingdom.json';
import US_MAP from '../maps/us.json';
import WORLD_MAP from '../maps/world.json';

export function _getMapDefinition(type: string): any {
  switch (type) {
    case PHOENIX_CHART_TYPE.MAP_UNITED_STATES:
      return US_MAP;
    case PHOENIX_CHART_TYPE.MAP_WORLD:
      return WORLD_MAP;
    case PHOENIX_CHART_TYPE.MAP_CANADA:
      return CANADA_MAP;
    case PHOENIX_CHART_TYPE.MAP_AUSTRALIA:
      return AUSTRALIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_JAPAN:
      return JAPAN_MAP;
    case PHOENIX_CHART_TYPE.MAP_AFRICA:
      return AFRICA_MAP;
    case PHOENIX_CHART_TYPE.MAP_ASIA:
      return ASIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_AUSTRIA:
      return AUSTRIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_BRAZIL:
      return BRAZIL_MAP;
    case PHOENIX_CHART_TYPE.MAP_CHILE:
      return CHILE_MAP;
    case PHOENIX_CHART_TYPE.MAP_CHINA:
      return CHINA_MAP;
    case PHOENIX_CHART_TYPE.MAP_EUROPE:
      return EUROPE_MAP;
    case PHOENIX_CHART_TYPE.MAP_FRANCE:
      return FRANCE_MAP;
    case PHOENIX_CHART_TYPE.MAP_FRANCE_DEPARTMENTS:
      return FRANCE_DEPT_MAP;
    case PHOENIX_CHART_TYPE.MAP_GERMANY:
      return GERMANY_MAP;
    case PHOENIX_CHART_TYPE.MAP_GHANA:
      return GHANA_MAP;
    case PHOENIX_CHART_TYPE.MAP_INDIA:
      return INDIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_INDONESIA:
      return INDONESIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_ITALY:
      return ITALY_MAP;
    case PHOENIX_CHART_TYPE.MAP_MALAYSIA:
      return MALAYSIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_MEXICO:
      return MEXICO_MAP;
    case PHOENIX_CHART_TYPE.MAP_MIDDLE_EAST:
      return MIDDLE_EAST_MAP;
    case PHOENIX_CHART_TYPE.MAP_NEW_ZEALAND:
      return NEW_ZEALAND_MAP;
    case PHOENIX_CHART_TYPE.MAP_NIGERIA:
      return NIGERIA_MAP;
    case PHOENIX_CHART_TYPE.MAP_NORTH_AMERICA:
      return NORTH_AMERICA_MAP;
    case PHOENIX_CHART_TYPE.MAP_PANAMA:
      return PANAMA_MAP;
    case PHOENIX_CHART_TYPE.MAP_PERU:
      return PERU_MAP;
    case PHOENIX_CHART_TYPE.MAP_PHILIPPINES:
      return PHILIPPINES_MAP;
    case PHOENIX_CHART_TYPE.MAP_PORTUGAL:
      return PORTUGAL_MAP;
    case PHOENIX_CHART_TYPE.MAP_SOUTH_AMERICA:
      return SOUTH_AMERICA_MAP;
    case PHOENIX_CHART_TYPE.MAP_SOUTH_KOREA:
      return SOUTH_KOREA_MAP;
    case PHOENIX_CHART_TYPE.MAP_SPAIN:
      return SPAIN_MAP;
    case PHOENIX_CHART_TYPE.MAP_SWITZERLAND:
      return SWITZERLAND_MAP;
    case PHOENIX_CHART_TYPE.MAP_UAE:
      return UAE_MAP;
    case PHOENIX_CHART_TYPE.MAP_UNITED_KINGDOM:
      return UNITED_KINGDOM_MAP;
    case PHOENIX_CHART_TYPE.MAP_US_COUNTIES:
    case PHOENIX_CHART_TYPE.MAP_US_STATE:
    case PHOENIX_CHART_TYPE.MAP_FRANCE:
    case PHOENIX_CHART_TYPE.MAP_UK_COUNTRY:
    case PHOENIX_CHART_TYPE.MAP_UK_POSTAL:
    case PHOENIX_CHART_TYPE.MAP_LATLONG:
    case PHOENIX_CHART_TYPE.MAP_LATLONG_ROUTE:
    case PHOENIX_CHART_TYPE.MAP_CUSTOM:
      throw new Error(
        '[@domoinc/domo-phoenix] Sorry, this map is not supported at this time.'
      );
  }
}

export function _isMap(type: string): boolean {
  switch (type) {
    case PHOENIX_CHART_TYPE.MAP_WORLD:
    case PHOENIX_CHART_TYPE.MAP_UNITED_STATES:
    case PHOENIX_CHART_TYPE.MAP_AFRICA:
    case PHOENIX_CHART_TYPE.MAP_ASIA:
    case PHOENIX_CHART_TYPE.MAP_AUSTRALIA:
    case PHOENIX_CHART_TYPE.MAP_AUSTRIA:
    case PHOENIX_CHART_TYPE.MAP_BRAZIL:
    case PHOENIX_CHART_TYPE.MAP_CANADA:
    case PHOENIX_CHART_TYPE.MAP_CHILE:
    case PHOENIX_CHART_TYPE.MAP_CHINA:
    case PHOENIX_CHART_TYPE.MAP_CUSTOM:
    case PHOENIX_CHART_TYPE.MAP_EUROPE:
    case PHOENIX_CHART_TYPE.MAP_FRANCE:
    case PHOENIX_CHART_TYPE.MAP_FRANCE:
    case PHOENIX_CHART_TYPE.MAP_FRANCE_DEPARTMENTS:
    case PHOENIX_CHART_TYPE.MAP_GERMANY:
    case PHOENIX_CHART_TYPE.MAP_GHANA:
    case PHOENIX_CHART_TYPE.MAP_INDIA:
    case PHOENIX_CHART_TYPE.MAP_INDONESIA:
    case PHOENIX_CHART_TYPE.MAP_ITALY:
    case PHOENIX_CHART_TYPE.MAP_JAPAN:
    case PHOENIX_CHART_TYPE.MAP_LATLONG:
    case PHOENIX_CHART_TYPE.MAP_LATLONG_ROUTE:
    case PHOENIX_CHART_TYPE.MAP_MALAYSIA:
    case PHOENIX_CHART_TYPE.MAP_MEXICO:
    case PHOENIX_CHART_TYPE.MAP_MIDDLE_EAST:
    case PHOENIX_CHART_TYPE.MAP_NEW_ZEALAND:
    case PHOENIX_CHART_TYPE.MAP_NIGERIA:
    case PHOENIX_CHART_TYPE.MAP_NORTH_AMERICA:
    case PHOENIX_CHART_TYPE.MAP_PANAMA:
    case PHOENIX_CHART_TYPE.MAP_PERU:
    case PHOENIX_CHART_TYPE.MAP_PHILIPPINES:
    case PHOENIX_CHART_TYPE.MAP_PORTUGAL:
    case PHOENIX_CHART_TYPE.MAP_SOUTH_AMERICA:
    case PHOENIX_CHART_TYPE.MAP_SOUTH_KOREA:
    case PHOENIX_CHART_TYPE.MAP_SPAIN:
    case PHOENIX_CHART_TYPE.MAP_SWITZERLAND:
    case PHOENIX_CHART_TYPE.MAP_UAE:
    case PHOENIX_CHART_TYPE.MAP_UK_COUNTRY:
    case PHOENIX_CHART_TYPE.MAP_UK_POSTAL:
    case PHOENIX_CHART_TYPE.MAP_UNITED_KINGDOM:
    case PHOENIX_CHART_TYPE.MAP_US_COUNTIES:
    case PHOENIX_CHART_TYPE.MAP_US_STATE:
      return true;
    default:
      return false;
  }
}
