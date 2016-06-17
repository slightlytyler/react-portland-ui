const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const __src = path.join(__dirname, 'src');
const __node_modules = path.join(__dirname, 'node_modules');

module.exports = {
  devtool: 'eval',
  entry: {
    bundle: path.join(__src, 'entries/bundle.js'),
    icons: path.join(__src, 'entries/icons.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: 'ReactPortlandUI',
    libraryTarget: 'umd'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin(
      [
        {
          from: path.join(__src, 'styles'),
          to: 'stylus'
        },
        {
          from: path.join(__node_modules, 'react-infinite-calendar/styles.css'),
          to: 'stylus/vendor/react-infinite-calendar.styl'
        },
        {
          from: path.join(__node_modules, 'normalize.css/normalize.css'),
          to: 'stylus/vendor/normalize.styl'
        }
      ]
    )
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: __src,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: __src,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus')
      },
      {
        test: /\.otf$/,
        loader: 'url'
      },
      {
        test: /\.svg$/,
        loader: 'url'
      }
    ]
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    }
  },
  resolve: {
    alias: {
      src: __src,
      modules: path.join(__src, 'modules'),
      styles: path.join(__src, 'styles'),
      icons: path.join(__src, 'assets/icons'),
      helpers: path.join(__src, 'helpers')
    }
  },
  postcss: function () {
    return [autoprefixer];
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  }
};
