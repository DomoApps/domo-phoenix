# Create your Custom App
This guide assumes you have already completed the **Dev Studio** [Overview](https://developer.domo.com/docs/dev-studio/dev-studio-overview) and [Quickstart](https://developer.domo.com/docs/dev-studio/dev-studio-quickstart) on [developer.domo.com](https://developer.domo.com). *Please complete those before continuing this tutorial*.


### Install the required packages
```bash
npm install
```


### Start the server
```bash
npm start
```
Check that the server is running by going to [localhost:8080](http://localhost:8080) in your browser.


### Edit index.html
Open `index.html` in your prefered IDE or text editor
Change the html in the `body` to 'Hello Word'
Go to back to [localhost:8080](http://localhost:8080) to see that the App changed


### Create your App's manifest
```bash
domo init
```
- Give your App a name
- Choose **manifest only**


### Modify your App's manifest
The default size in the DomoApp `manifest.json` is too small for a Phoenix chart, this will need to be change to the following:
- Set the `width` to `3`
- Set the `height` to `2`


### Build and Publish your App
```bash
npm run build
npm run deploy
```
You can now build your App as Card to any page in Domo!






# Adding Phoenix

### Install Phoenix
```bash
npm install --save @domoinc/domo-phoenix
```


### Import Phoenix into your App
Open `index.html` and add replace the code inside `<body></body>` with the following:
```html
<div id="phoenix-chart"></div>
```



Open `src/index.js` and add the following lines:
```js
const {
    PhoenixChart,
    PHOENIX_CHART_TYPE,
    PHOENIX_DATA_TYPE,
    PHOENIX_MAPPING
} = require('@domoinc/domo-phoenix');
 
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
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.VERT_BAR, data, options);
 
// Append the canvas element to your app
document.getElementById('phoenix-chart').appendChild(chart.canvas);
 
// Render the chart when you're ready for the user to see it
chart.render();
```

### Test
Run `npm start` to test your app in your browser
Go to back to [localhost:8080](http://localhost:8080), you should now see a Phoenix chart




# Hook it up!

### Install domo.js (part of ryuu.js)
Install domo.js so you can query data from domo:
```bash
npm install --save ryuu.js
```

### Add domo.js to your app
Add `const domo = require('ryuu.js');` to the top of `src/index.js`. The top of `index.js` should now look like this:

```js
require('normalize.css/normalize.css');
const domo = require('ryuu.js');
const {
    PhoenixChart,
    PHOENIX_CHART_TYPE,
    PHOENIX_DATA_TYPE,
    PHOENIX_MAPPING
} = require('@domoinc/domo-phoenix');
```
