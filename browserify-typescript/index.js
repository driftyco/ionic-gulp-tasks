var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    tsify = require('tsify'),
    pretty = require('prettysize'),
    merge = require('lodash.merge'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    stream = require('stream'),
    through = require('through2'),
    ng2TemplateParser = require('gulp-inline-ng2-template/parser');

var defaultOptions = {
  watch: false,
  src: ['./app/app.ts', './typings/index.d.ts'],
  outputPath: 'www/build/js/',
  outputFile: 'app.bundle.js',
  minify: false,
  browserifyOptions: {
    cache: {},
    packageCache: {},
    debug: true
  },
  watchifyOptions: {},
  tsifyOptions: {},
  uglifyOptions: {},
  onError: function(err){
    console.error(err.toString());
    this.emit('end');
  },
  onLog: function(log){
    console.log((log = log.split(' '), log[0] = pretty(log[0]), log.join(' ')));
  }
};

module.exports = function(options) {
  options = merge(defaultOptions, options);

  var b = browserify(options.src, options.browserifyOptions)
    .plugin(tsify, options.tsifyOptions)
      .transform(function (file) {
          return through(function (buf, enc, next) {
              ng2TemplateParser({contents: buf, path: file}, {
                  base: '/app',
                  useRelativePaths: true,
                  supportNonExistentFiles: false
              })((err, result) => {
                  this.push(result);
                  process.nextTick(next);
              });
          });
      });

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
      .pipe(debug ? sourcemaps.write('./',{includeContent:true, sourceRoot:'../../../'}) : noop())
      .pipe(gulp.dest(options.outputPath));
  }

  function noop(){
    return new stream.PassThrough({ objectMode: true });
  }
};
