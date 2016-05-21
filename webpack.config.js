var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var __src = path.join(__dirname, 'src')

module.exports = {
  entry: path.join(__src, 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'ReactPortlandUI',
    libraryTarget: 'umd'
  },
  devtool: 'eval',
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
        loader: 'style!css!postcss!stylus'
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
      modules: path.join(__src, 'modules'),
      styles: path.join(__src, 'styles'),
      icons: path.join(__src, 'assets/icons')
    }
  },
  postcss: function () {
    return [autoprefixer];
  },
  eslint: {
    configFile: path.join(__dirname, '.eslintrc')
  }
};
