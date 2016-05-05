var webpack = require('webpack'),
    Q = require('q'),
    merge = require('lodash.merge');

var defaultOptions = {
  watch: false,
  watchOptions: null,
  config: null,
  failOnWarning: false,
  statsOptions: {
    'colors': true,
    'modules': false,
    'chunks': false,
    'exclude': ['node_modules']
  }
}

module.exports = function(options) {
  var deferred = Q.defer();
  options = merge(defaultOptions, options);
  try {
    options.config = options.config || require(process.cwd() + '/webpack.config.js');
  } catch(e) {
      console.error('There was an error loading your webpack.config file:', e);
      return
  }

  function webpackCallback(err, stats) {
    // print build stats and errors
    console.log(stats.toString(options.statsOptions));
    if (stats.hasErrors() ||
      (stats.hasWarnings() && options.failOnWarning)) {
      deferred.reject(err);
    }

    deferred.resolve();
  }

  var compiler = webpack(options.config);
  if (options.watch) {
    compiler.watch(options.watchOptions, webpackCallback);
  } else {
    compiler.run(webpackCallback);
  }

  return deferred.promise;
}

