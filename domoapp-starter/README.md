# Create your Custom App

### Before you begin
This guide assumes you have already completed the **Dev Studio** [Overview](https://developer.domo.com/docs/dev-studio/dev-studio-overview) and [Quickstart](https://developer.domo.com/docs/dev-studio/dev-studio-quickstart) on [developer.domo.com](https://developer.domo.com). *Please complete those before continuing this tutorial*.

### Requirements
Please ensure you have the following installed:
- A Git client - Have an installed [command line](https://git-scm.com/downloads) or [desktop](https://desktop.github.com/) Git client.
- NPM - NPM is included with the [Node.js](https://nodejs.org/en/download/) install. Run `npm -v` in our terminal to ensure this is installed.
- ryuu - This is intalled when doing the Dev Studio [Overview](https://developer.domo.com/docs/dev-studio/dev-studio-overview). Run `domo -v` in our terminal to ensure this is installed.

### Download and install domoapp-starter
Use git to *clone* (download) this project from [https://github.com/th3uiguy/domo-phoenix.git](https://github.com/th3uiguy/domo-phoenix.git). If you are using a command line client, you can run the following command in your terminal:
```bash
git clone https://github.com/th3uiguy/domo-phoenix.git
```


In a terminal window, change to the `domoapp-starter` folder and install the project:
```bash
cd /Path/to/domo-phoenix
cd domoapp-starter
npm install
```


### Start the server
In your terminal run:
```bash
npm start
```
Check that the server is running by going to [localhost:8080](http://localhost:8080) in your browser. You should see "DomoApp Starter" if it is running correctly.


### Edit index.html
- Open `index.html` in the `domoapp-starter` folder in your prefered IDE or text editor.
- Change the HTML in the `body` to "Hello Word".
- Go to back to [localhost:8080](http://localhost:8080) to see that the App changed (`npm start` should still be running).


### Find your dataset id
Login to Domo and find the dataset you plan to hook your App up to. To do this:
- Login to Domo.
- Go to the Data Center (located in the top grey bar of Domo).
- Search for the dataset you want to use, then go to the "Details" view by selecting it.
- When viewing the detail of the dataset in Data Center you should see the browser url look something like this:
```
https://mycompany.domo.com/datasources/f3312abc-469b-476e-8283-ef77367c9fec/details/overview
```
- The dataset id is the 36 character hash between the `datasources/` and before `/details`. In the URL above my dataset id is `f3312abc-469b-476e-8283-ef77367c9fec`.
- Copy the dataset id portion in your browser's URL. You will need to paste this in your terminal in the next section.


### Make sure you are up-to-date
Before you can publish your App you will want to make sure that your `domo` client is up to date and linked to the correct account. To do this run:
```bash
domo login
```
- Select the correct "Domo instance" from the list or select "new instance" to add a new one.
- If you choose "new instance" you will be prompted to enter the instance domain. Generally this is your "companyname" followed by `.domo.com`.
- If your `domo` client needs to be updated you will be prompted here. Do it, it doesn't take that long.
- If you are not already logged in to that instance, you will be prompted to do so via your web browser.
- Once your instance is set and you are logged in, you are ready to publish to that instance.


### Create your App's manifest
- Go back to your terminal windown and quit the `npm start` command (if it is still running, press `Ctrl + C` on Windows or `Cmd + C` on Mac).
- Run the command `domo init` to start the process of initializing your Domo App.
- Give your App a name.
- Choose **manifest only** (down arrow to select it the option).
- Connect to your dataset using the dataset id (Type `Y` when prompted).
- Paste your dataset id when prompted.
- Give your dataset an alias, any name (whithout spaces) will do. You will use this alias later, so don't forget it.
- You do not need to add anymore datasets (Type `n` when prompted).


### Modify your App's manifest
The default size in the DomoApp is too small for a Phoenix chart. Open the `manifest.json` (now in your `domoapp-starter` folder) and change the following:
- Change the `width` from `1` to `3`.
- Change the `height` from `1` to `2`.
- Save and close the file.


### Build and Publish your App
Return to your terminal window and type:
```bash
npm run build
npm run deploy
```
You can now add your Custom App as Card to any page in Domo!




# Query your dataset
This section is a simple demo of how to query data from Domo. Please see the [Data API](https://developer.domo.com/docs/dev-studio-references/data-api) documentation for more detail on how to query data in Domo.


### Install domo.js (part of ryuu.js)
Install domo.js so you can query data from Domo, to do this:
- Return to your terminal window.
- Ensure you are in the `domoapp-starter` folder, then type:
```bash
npm install --save ryuu.js
```


### Add domo.js to your App
Add `const domo = require('ryuu.js');` to the top of `src/index.js`. The top of `index.js` should now look like this:

```js
require('normalize.css/normalize.css');
const domo = require('ryuu.js');
```

### Get the data
Use domo.js to get your data by adding the following to your `src/index.js` file, replace `DATASET_ALIAS` with the alias you gave your dataset while creating the App's manifest. You will want to set `limit=100` on the query so you don't crash your browser by getting too many rows:
```js
domo.get('/data/v1/DATASET_ALIAS?limit=100').then(function(data){
  console.log(data);
});
```

# Publish and test your App
Now that domo.js is added, you can test that it is querying your dataset corectly. Before you can test it you will need to build and publish your App again. If you don't remember how to do this, it is as simple as runing `npm run build` to build and then `npm run deploy`. If you want to get really fancy you can run both commands on one line like this:
```bash
npm run build && npm run deploy
```


### Using your Custom App
To use your Custom App, add it as a Card to one of your pages in Domo. To do this:
- Login to Domo.
- Find or create a Page you want to add the Custom App's Card to.
- Select "Design" from the Page's "Add Card" dropdown.
- In the popup modal select "Custom App"
- You should be taken to a screen of your published Apps. Select the Custom App you just published.
- Click the "New Card" button in the popup modal.
- You should be taken to a preview of your App, from here you will select a dataset to power up the App.
- Below the grey preview area there is a black bar with the dataset alias you setup for you App, select it.
- Open the "Select Dataset" dropdown.
- Search for the dataset you would like to use and select it.
- You should now see a preview of the dataset to the right under "Data Preview"
- If this looks correct, click the "Save & Finish" button in the top right above the App's grey preview area.
- You should be redirected to your Page with the Custom App added as a Card to the Page.
- Open the JavaScript console of your browser (in Chrome this is: `Ctrl + Alt + I` on Windows or `Cmd + Alt + I` on Mac).
- Click the "Expand Details" button at the top right of your Custom App's Card.
- Watch the console as the detail view is loaded, you should see a JavaScript object logged with the first 100 rows of your dataset.





# Installing Phoenix
Now that you have created your Domo App and are getting data, lets add Phoenix to it so you can chart data. 
- Return to your terminal window.
- Ensure you are still in the `domoapp-starter` folder, then type:
```bash
npm install --save @domoinc/domo-phoenix
```


### Import Phoenix into your App
Open `index.html` and replace the code inside `<body></body>` with the following:
```html
<div id="phoenix-chart"></div>
```
Note: This `div` is where the Phoenix chart will get placed inside of, as a `canvas` element.


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
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.BAR, data, options);
 
// Append the canvas element to your app
document.getElementById('phoenix-chart').appendChild(chart.canvas);
 
// Render the chart when you're ready for the user to see it
chart.render();
```


### Test
- Run `npm start` to test the App in your browser
- Go to back to [localhost:8080](http://localhost:8080), you should now see a Phoenix chart




# How to use PhoenixChart
Before you can use `PhoenixChart` to graph your data, let's go over how it works. `PhoenixChart` requires the following parameters:
1. Chart Type - [Choose a chart type](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/charts) that will best visualize your data
2. Data - A two dimentional Array of the data
3. Options - Set the "Chart Properties" your Chart Type supports. A full list of properties can be found, per Chart Type, on the [Chart Specific Information](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties) page of the documentation.


### Choose your Chart Type
- The Chart Type is set using an `enum`. You can find the `enum` for your Chart Type by selecting the Chart Type on the [Chart Specific Information](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties) page of the documentation.
- Examples of using these charts are found on the [Charts](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/charts) page of the documentation.


### Formating your data for Phoenix
Phoenix expects data in the following format:
```js
const data = {
    rows: [
        ['Corporate', 8582.8875, 'Low'],
        ['Home Office', 14415.941, 'High'],
        ['Corporate', 7965.238, 'Medium']
    ],
    columns: [
        {
            type: PHOENIX_DATA_TYPE.STRING,
            name: 'Customer Segment',
            mapping: PHOENIX_MAPPING.ITEM
        },
        {
            type: PHOENIX_DATA_TYPE.DOUBLE,
            name: 'Sales',
            mapping: PHOENIX_MAPPING.VALUE
        },
        {
            type: PHOENIX_DATA_TYPE.STRING,
            name: 'Order Priority',
            mapping: PHOENIX_MAPPING.SERIES
        }
    ]
};
```

Where:
- `rows` is a 2 dimentional Array of the data
- `columns` is an `Array` of `Objects` discribing how to chart each column (or Array index) in the `rows` Array. For instance, in the example above the value of the first index/column of my row data is "Corporate", so my `Object` for that column is:
    - `type` - the value is a `string` so I use `PHOENIX_DATA_TYPE.STRING` here (see the Data Types section of [Phoenix API](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api) for the full list of types)
    - `name` - the value came from the "Customer Segment" column of my dataset, so that is how I want Phoenix to label it
    - `mapping` - Mappings vary by Chart Type (see the "Column Information" for your Chart Type on the [Chart Specific Information](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties) page of the documentation). I am using a [bar chart](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/chart/bar) so the supported mappings for my chart are `ITEM`,`VALUE` and `SERIES`. For a bar chart: 
        - `ITEM` is graphed on the x axis
        - `VALUE` is graphed on the y axis
        - `SERIES` defines the segments of the bar chart making this a stacked bar chart
        - See the "Column Information" for each Chart Type on the [Chart Specific Information](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties) for a complete list of mappings


### Set the Chart Options
Chart options are used to customize how your chart is displayed. More on using this can be found in the [Phoenix API](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api) documentation. For now you can just set the `height` and `width` and ignore the rest. These values are pixel dimensions for the chart.
```js
const options = {
    width: 600,
    height: 500
};
```
Note: A full list of the `properties` your Chart Type supports can be found on the [Chart Specific Information](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/properties) page of the documentation.


### Create the chart
Once you have the `data` and have set the `options` you are ready to create a `PhoenixChart`.
```js
const chart = new PhoenixChart(PHOENIX_CHART_TYPE.BAR, data, options);
```


### Place the canvas on your page
Now just place the `canvas` element on your page and call the `.render()` method to tell Phoenix you are ready for it to draw your chart. 
```js
// Append the canvas element to your app
document.getElementById('phoenix-chart').appendChild(chart.canvas);
 
// Render the chart when you're ready for the user to see it
chart.render();
```
More about `render()` and other methods supported by `PhoenixChart` can be found on the "Chart Methods" section of the [Phoenix API](https://domoapps.github.io/domo-phoenix/#/domo-phoenix/api) documentation.

### Have fun charting!