const path = require('path');
const webpackConfig = require('./webpack.config.js');

module.exports = config => config.set({
  frameworks: ['mocha'],
  files: ['tests.js'],
  browsers: process.env.TRAVIS ? ['ChromeTravis'] : ['Chrome'],
  preprocessors: {
    'tests.js': ['webpack', 'sourcemap',],
  },
  customLaunchers: {
    ChromeTravis: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },
  reporters: ['mocha'],
  specReporter: {
    suppressPassed: true
  },
  autoWatch: false,
  singleRun: true,
  concurrency: Infinity,
  logLevel: config.LOG_INFO,
  colors: true,
  port: 9876,
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
      alias: Object.assign({ sinon: 'sinon/pkg/sinon' }, webpackConfig.resolve.alias)
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
