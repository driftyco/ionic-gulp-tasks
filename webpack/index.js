var webpack = require('webpack'),
    Q = require('q'),
    assign = require('lodash.assign');

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
  options = assign(defaultOptions, options);
  try {
    options.config = options.config || require(process.cwd() + '/webpack.config.js');
  } catch(e) {
      console.error('There was an error loading your webpack.config file:', e);
      return
  }

  function webpackCallback(err, stats) {
    if (err) {
      // handle fatal error
      deferred.reject(err);
      return
    } else if (stats) {
      // print build stats and errors
      console.log(stats.toString(options.statsOptions));
      var jsonStats = stats.toJson();
      if (stats.hasErrors()) {
        // handle soft errors
        deferred.reject(jsonStats.errors);
        return
      } else if (stats.hasWarnings() && options.failOnWarning) {
        // handle warnings
        deferred.reject(jsonStats.warnings);
        return
      }
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

