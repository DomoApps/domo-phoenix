# Domo Phoenix

Build beautiful charts using Domo's powerful charting engine

## Usage

First install the library:

```shell
$ npm install --save @domoinc/domo-phoenix
```

You can then import and use the library:

```javascript
import {
  PhoenixChart,
  PhoenixChartData,
  PHOENIX_CHART_TYPE,
  PHOENIX_DATA_TYPE,
  PHOENIX_MAPPING
} from '@domoinc/domo-phoenix';

const data: PhoenixChartData = {
  // This is the data you get back from the Domo Data API
  rows: [
    ['Low', 'Corporate', 8582.8875],
    ['High', 'Home Office', 14415.941],
    ['Low', 'Consumer', 1264.8215],
    ['Medium', 'Small Business', 21478.799],
    ['Critical', 'Consumer', 2621.97],
    ['Not Specified', 'Consumer', 2211.31],
    ['Critical', 'Corporate', 10087.1315],
    ['Not Specified', 'Corporate', 4407.138],
    ['High', 'Consumer', 11667.366],
    ['High', 'Corporate', 19503.323],
    ['Low', 'Small Business', 1735.3715],
    ['Low', 'Home Office', 10057.42],
    ['Medium', 'Home Office', 7691.02],
    ['Critical', 'Small Business', 4036.064],
    ['Not Specified', 'Small Business', 84.99],
    ['High', 'Small Business', 689.74],
    ['Critical', 'Home Office', 7416.828],
    ['Not Specified', 'Home Office', 1839.26],
    ['Medium', 'Consumer', 4280.034],
    ['Medium', 'Corporate', 7965.238]
  ],
  // You provide the names, types, and mappings of your ordered columns
  columns: [
    {
      type: PHOENIX_DATA_TYPE.STRING,
      name: 'Order Priority',
      mapping: PHOENIX_MAPPING.SERIES
    },
    {
      type: PHOENIX_DATA_TYPE.STRING,
      name: 'Customer Segment',
      mapping: PHOENIX_MAPPING.ITEM
    },
    {
      type: PHOENIX_DATA_TYPE.DOUBLE,
      name: 'Sales',
      mapping: PHOENIX_MAPPING.VALUE
    }
  ]
};

// Chart Options
const options = {
  width: 600,
  height: 500
};

// Create the Phoenix Chart
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.VERT_BAR, data, options);

// Append the canvas element to your app
document.getElementById('myDiv').appendChild(chart.canvas);

// Render the chart when you're ready for the user to see it
chart.render();
```

## Configuration

### Chart Options

The following are customizable options along with their defaults.

| Property | Description                                                 | Type    | Default |
| -------- | ----------------------------------------------------------- | ------- | ------- |
| width    | The width of the Phoenix Chart                              | number  | `500`   |
| height   | The height of the Phoenix Chart                             | number  | `400`   |
| animate  | Whether or not the chart should animate in when being drawn | boolean | `true`  |

### Chart Types

We have provided an enum, `PHOENIX_CHART_TYPE`, for you with all the supported chart types. Here are a few examples of common chart types:

- `VERT_BAR`
- `VERT_STACKEDBAR`
- `HORIZ_BAR`
- `TRENDLINE`
- `CURVED_LINE`
- `STACKEDTREND`
- `NAUTILUS`
- `PIE`
- `FUNNEL`
- `BUBBLE`
- `DONUT`
- `WORD_CLOUD`

### Data Types

We have provided an enum, `PHOENIX_DATA_TYPE`, for you with all the supported data types. Here are the supported data types:

- `STRING`
- `DOUBLE`
- `LONG`
- `DECIMAL`
- `DATE`
- `DATETIME`
- `TIME`

### Mappings

To correctly map your data to the chart, we require that you provide a mapping for your columns. We have an enum, `PHOENIX_MAPPING`, for the purpose of this mapping. The following are the mappings supported and their purpose:

- `ITEM`: In a bar chart, this would be your x axis
- `VALUE`: In a bar chart, this would be your y axis
- `SERIES`: This is how your data is grouped

## Chart Methods

The following are the methods you have access to in addition to the ones shown above in the example.

### render()

This performs the actual rendering of the chart on the canvas. Your chart will not show up until you have called this method.

```javascript
// Render chart
chart.render();
```

### resize(width, height)

The resize method allows you to resize your chart to whatever size you want, given a width and a height. These are in numbers of pixels.

```javascript
// Resize chart to 800px by 500px
chart.resize(800, 500);
```

### update(data)

The update method allows you to provide a new data object, which will update your chart to reflect those changes. **NOTE:** You do not need to call `render()` again, this method performs that for you.

```javascript
// Get new data
const newData = {
  rows: [['Michael Scott', 43], ['Jim Halpert', 36], ['Dwight Schrute', 41]],
  columns: [
    {
      type: PHOENIX_DATA_TYPE.STRING,
      name: 'Name',
      mapping: PHOENIX_MAPPING.ITEM
    },
    {
      type: PHOENIX_DATA_TYPE.DOUBLE,
      name: 'Age',
      mapping: PHOENIX_MAPPING.VALUE
    }
  ]
};

// Update chart with new data
chart.update(newData);
```
