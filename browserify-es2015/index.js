var gulp = require('gulp'),
    babelify = require('babelify'),
    babelDecoratorsTransform = require('babel-plugin-transform-decorators-legacy').default,
    babelES2015Preset = require('babel-preset-es2015'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    pretty = require('prettysize'),
    merge = require('lodash.merge'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    stream = require('stream');


var defaultOptions = {
  watch: false,
  src: './app/app.js',
  outputPath: 'www/build/js/',
  outputFile: 'app.bundle.js',
  minify: false,
  browserifyOptions: {
    cache: {},
    packageCache: {},
    debug: true
  },
  watchifyOptions: {},
  babelifyOptions: {
    presets: [babelES2015Preset],
    plugins: [babelDecoratorsTransform]
  },
  uglifyOptions: {},
  onError: function(err){
    console.error(err.toString());
    this.emit('end');
  },
  onLog: function(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
  }
}

module.exports = function(options) {
  options = merge(defaultOptions, options);

  var b = browserify(options.src, options.browserifyOptions)
    .transform(babelify, options.babelifyOptions);

  if (options.browserifyOptions.external) {
    b.external(options.browserifyOptions.external);
  }

  if (options.watch) {
    b = watchify(b, options.watchifyOptions);
    b.on('update', bundle);
    b.on('log', options.onLog);
  }

  return bundle();

  function bundle() {
    var debug = options.browserifyOptions.debug;
    return b.bundle()
      .on('error', options.onError)
      .pipe(source(options.outputFile))
      .pipe(buffer())
      .pipe(debug ? sourcemaps.init({ loadMaps: true }) : noop())
      .pipe(options.minify ? uglify(options.uglifyOptions) : noop())
      .pipe(debug ? sourcemaps.write('./') : noop())
      .pipe(gulp.dest(options.outputPath));
  }

  function noop(){
    return new stream.PassThrough({ objectMode: true });
  }
}
