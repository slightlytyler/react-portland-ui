const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const __src = path.join(__dirname, 'src')

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
    new ExtractTextPlugin('styles.css')
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
    'react/lib/shallowCompare': {
      commonjs: 'react/lib/shallowCompare',
      commonjs2: 'react/lib/shallowCompare',
      amd: 'react/lib/shallowCompare',
      root: 'ReactShallowCompare'
    },
    'react/lib/ReactCSSTransitionGroup': {
      commonjs: 'react/lib/ReactCSSTransitionGroup',
      commonjs2: 'react/lib/ReactCSSTransitionGroup',
      amd: 'react/lib/ReactCSSTransitionGroup',
      root: 'ReactCSSTransitionGroup'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM'
    },
    'react-dom/server': {
      commonjs: 'react-dom/server',
      commonjs2: 'react-dom/server',
      amd: 'react-dom/server',
      root: 'ReactDOMServer'
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
