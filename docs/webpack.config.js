const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const autoprefixer = require('autoprefixer');
const argv = require('yargs').argv;

const __src = path.join(__dirname, 'src');
const __assets = path.join(__src, 'assets');
const __icons = path.join(__assets, 'icons');
const __build = path.join(__dirname, 'build');
const __dist = path.join(__dirname, 'dist');
const __node_modules = path.join(__dirname, '../node_modules');
const __pui = path.join(__dirname, '../dist');
const __static = path.join(__src, 'static');

const env = process.env.NODE_ENV || 'development';
const globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(env),
  },
  __NODE_ENV__: JSON.stringify(env),
  __DEV__: env === 'development',
  __PROD__: env === 'production',
  __TEST__: env === 'test',
  __DEBUG__: env === 'development' && !argv.no_debug,
  __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
};

const config = {
  entry: path.join(__src, 'main.js'),
  output: {
    path: __dist,
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer:{
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.join(__src, 'index.html'),
      filename: globals.__DEV__ ? 'index.html' : '200.html',
      inject: 'body',
      favicon: path.join(__static, 'favicon.ico'),
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin(
      [{ from: __static, ignore: '.DS_Store' }]
    ),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: __src,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: [__src],
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus-relative-loader?resolve url'),
      },
      {
        test: /\.otf$/,
        loader: 'url',
      },
      {
        test: /\.svg$/,
        loader: 'raw',
        incude: __icons,
      },
      {
        test: /\.svg|\.png$/,
        loader: 'url',
        exclude: __icons,
      },
    ],
  },
  resolve: {
    fallback: __node_modules,
    alias: {
      src: __src,
      build: __build,
      pui: __pui,
      components: path.join(__src, 'components'),
      config: path.join(__src, 'config'),
      helpers: path.join(__src, 'helpers'),
      icons: __icons,
      images: path.join(__assets, 'images'),
      routes: path.join(__src, 'routes'),
      styles: path.join(__src, 'styles'),
      utilities: path.join(__src, 'utilities'),
    },
  },
  resolveLoader: { fallback: __node_modules },
  postcss: () => [autoprefixer],
};

if (globals.__DEV__) {
  config.devtool = 'eval';
}

if (globals.__PROD__) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]);
}

module.exports = config;
