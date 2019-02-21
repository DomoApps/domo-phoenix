const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

const bannerComment = [
  `domoPhoenix.js v${packageJson.version}`,
  'Optional utility library for Custom Apps'
].join('\n');

const config = {
  context: __dirname + '/src',

  entry: './index_noMaps.ts',

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'domoPhoenix_noMaps.js',
    library: 'domoPhoenix_noMaps',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.BannerPlugin(bannerComment)
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  devtool: 'source-map'
};

module.exports = config;