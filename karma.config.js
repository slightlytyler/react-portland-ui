const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = config => config.set({
  autoWatch: true,
  browsers: ['Chrome'],
  colors: true,
  concurrency: Infinity,
  frameworks: ['mocha'],
  files: ['./tests.js'],
  logLevel: config.LOG_INFO,
  port: 9876,
  preprocessors: {
    'tests.js': ['webpack', 'sourcemap'],
  },
  reporters: ['mocha'],
  singleRun: false,
  specReporter: {
    suppressPassed: true
  },
  webpack: {
    devtool: 'inline-source-maps',
    module: {
      noParse: [
        /node_modules(\\|\/)sinon/
      ],
      preLoaders: webpackConfig.module.preLoaders,
      loaders: [
        webpackConfig.module.loaders[0], // js loader
        {
          test: /\.json$/,
          loader: 'json',
        }
      ]
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    resolve: {
      alias: {
        sinon: 'sinon/pkg/sinon',
      }
    },
    eslint: {
      configFile: path.join(__dirname, '.test.eslintrc')
    }
  },
  webpackServer: {
    noInfo: true,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },
});
