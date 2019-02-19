# Domo Phoenix

Build beautiful charts using Phoenix, Domo's powerful charting engine.

## Documentation

This README provides a quick overview of how to use Phoenix. For more detailed information, please see the [Documentation](https://domoapps.github.io/domo-phoenix/). To quickly get up to speed on how to query data from Domo and chart with Phoenix, use the [StarterKit](https://github.com/DomoApps/StarterKit).


## Usage

First install the library:

```shell
$ npm install --save @domoinc/domo-phoenix
```

You can then import and use the library:

```javascript
import {
  PhoenixChart,
  PHOENIX_CHART_TYPE,
  PHOENIX_DATA_TYPE,
  PHOENIX_MAPPING
} from '@domoinc/domo-phoenix';

const data = {
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
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.BAR, data, options);

// Append the canvas element to your app
document.getElementById('myDiv').appendChild(chart.canvas);

// Render the chart when you're ready for the user to see it
chart.render();
```

## Configuration

### Chart Options

The following are customizable options along with their defaults.

| Property | Description                                                                         | Type             | Default |
| -------- | ----------------------------------------------------------------------------------- | ---------------- | ------- |
| width    | The width of the Phoenix Chart                                                      | number           | `500`   |
| height   | The height of the Phoenix Chart                                                     | number           | `400`   |
| animate  | Whether or not the chart should animate in when being drawn                         | boolean          | `true`  |
| colors   | An array of hex codes to use in drawing charts. Overrides the default color palette | Array of strings | `null`  |

### Chart Types

We have provided an enum, `PHOENIX_CHART_TYPE`, for you with all the supported chart types. Here are a few examples of common chart types:

- `BAR`
- `STACKEDBAR`
- `HORIZ_BAR`
- `LINE`
- `CURVED_LINE`
- `STACKED_AREA`
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

### Chart Properties

All Phoenix charts have default properties set to make your chart look great. You can, if you wish, override those properties. Examples of overrides include the chart's font size, whether or not to show the "Other" category, bar widths, etc. You can use them like so:

```javascript
const data = {
  // ...
};

const propertyOverrides = {
  font_size: 'Largest',
  hide_other_category: 'true',
  width_percentage: '50'
};

// Chart options
const options = {
  width: 600,
  height: 500,
  properties: propertyOverrides
};

// Create the Phoenix Chart
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.VERT_BAR, data, options);

// Append the canvas element to your app
document.getElementById('myDiv').appendChild(chart.canvas);

// Render the chart when you're ready for the user to see it
chart.render();
```

By passing those options, you'll have your chart customized to those settings. There are many properties supported by each chart type, and those will be documented at a later date.

### Color Palettes

By default, the chart will use Domo's color palette. You can optionally specify your own custom color palette for your chart. This is simply accomplished by passing an array of Hex Code strings in your options object. For example, if we were to create a chart like so:

```javascript
const data = {
  // ...
};

const customColors = [
  '#002159',
  '#03449E',
  '#0967D2',
  '#47A3F3',
  '#BAE3FF'
];

// Chart Options
const options = {
  width: 600,
  height: 500
  colors: customColors
};

// Create the Phoenix Chart
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.VERT_BAR, data, options);

// Append the canvas element to your app
document.getElementById('myDiv').appendChild(chart.canvas);

// Render the chart when you're ready for the user to see it
chart.render();
```

We would get a chart with that custom color palette of various shades of blue.

You can pass as few or as many colors as you would like in this array. Phoenix handles this for you, by starting with the first color in the list, and moving down the array. If it runs out of colors in the array, it will simply loop back around to the beginning and continue. For best visual results, it is recommended that you provide enough different colors to cover the scope of your data.

To update your color palette or reset to the default, see the API documentation.

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

### update(data, options?)

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

You may also **optionally** provide the options object to the update method. In this object you can pass an array of colors for a new color palette, as well as a map of chart property overrides, like so:

```javascript
// Get new data
const newData = {
  // ...
};

const options = {
  colors: ['#002159', '#03449E', '#0967D2', '#47A3F3'],
  properties: {
    'chart-property-1': 'value-1',
    'chart-property-2': 'value-2',
    'chart-property-3': 'value-3'
  }
};

// Update chart with new data as well as options providing a color palette and chart property overrides
chart.update(newData, options);
```

### setChartProperties(properties)

You can pass your chart new properties any time and that will re-render your chart with those properties your provide. Simply pass an object of property keys with their values to the method.

```javascript
// Define your properties
const properties = {
  'chart-property-1': 'value-1',
  'chart-property-2': 'value-2',
  'chart-property-3': 'value-3'
};
// Update chart with new properties
chart.setChartProperties(properties);
```

### resetColorPalette()

This method allows you to reset your chart's color palette back to the default Domo color palette. Your chart will automatically re-draw with the Domo color palette.

```javascript
// Reset color palette to default
chart.resetColorPalette();
```
