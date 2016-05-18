var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preloaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname, 'src')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  externals: {
    react: "react"
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    emitWarning: true
  }
};
