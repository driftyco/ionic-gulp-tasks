var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer')
    sourcemaps = require('gulp-sourcemaps'),
    assign = require('lodash.assign');

var defaultOptions = {
  src: 'app/theme/app.+(ios|md|wp).scss',
  dest: 'www/build/css',
  debug: true,
  sassOptions: {
    includePaths: [
      'node_modules/ionic-angular',
      'node_modules/ionicons/dist/scss'
    ]
  },
  autoprefixerOptions:{
    browsers: [
      'last 2 versions',
      'iOS >= 7',
      'Android >= 4',
      'Explorer >= 10',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },
  onError: function(err) {
    console.error(err.message);
    this.emit('end'); // Don't kill watch tasks - https://github.com/gulpjs/gulp/issues/259
  }
}

module.exports = function(options) {
  options = assign(defaultOptions, options);
  var debug = options.debug;
  return gulp.src(options.src)
    .pipe(debug ? sourcemaps.init() : noop())
    .pipe(sass(options.sassOptions))
    .on('error', options.onError)
    .pipe(autoprefixer(options.autoprefixerOptions))
    .pipe(debug ? sourcemaps.write('./') : noop())
    .pipe(gulp.dest(options.dest));
}
