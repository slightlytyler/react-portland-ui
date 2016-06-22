const webpackConfig = require('./webpack.config.js');

module.exports = config => config.set({
  autoWatch: true,
  browsers: ['PhantomJS'],
  colors: true,
  concurrency: Infinity,
  frameworks: ['jasmine'],
  files: ['tests.webpack.js'],
  logLevel: config.LOG_INFO,
  plugins: [
    'karma-webpack',
    'karma-jasmine',
    'karma-phantomjs-launcher',
    'karma-sourcemap-loader',
    'karma-mocha-reporter',
    'karma-spec-reporter',
  ],
  port: 9876,
  preprocessors: {
    'tests.webpack.js': ['webpack', 'sourcemap']
  },
  reporters: ['mocha'],
  singleRun: false,
  specReporter: {
    suppressPassed: true
  },
  webpack: {
    devtool: 'inline-source-maps',
    module: {
      loaders: [webpackConfig.module.loaders[0]] // js loader
    },
    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  },
  webpackServer: {
    noInfo: true
  },
});
