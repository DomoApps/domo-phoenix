const webpack = require('webpack');
const path = require('path');
const packageJson = require('./package.json');

const bannerComment = [
  `domoPhoenix.js v${packageJson.version}`,
  'Optional utility library for Custom Apps'
].join('\n');

const config = {
  context: __dirname + '/src',

  entry: './bundleEntry.ts',

  output: {
    path: path.join(__dirname, 'build', 'global'),
    publicPath: '/build/global',
    filename: 'domoPhoenix.js',
    library: 'domoPhoenix',
    libraryTarget: 'umd'
  },

  plugins: [new webpack.BannerPlugin(bannerComment)],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
};

module.exports = config;
