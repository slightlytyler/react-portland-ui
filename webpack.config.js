var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.styl$/,
        loader: 'style!css!postcss!stylus'
      },
      {
        test: /\.otf$/,
        loader: 'url'
      }
    ]
  },
  externals: {
    react: "react"
  },
  postcss: function () {
    return [autoprefixer];
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  }
};
