var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    assign = require('lodash.assign');

var defaultOptions = {
  src: 'app/theme/app.+(ios|md|wp).scss',
  srcOptions: {},
  dest: 'www/build/css',
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
  hookFunction: function(stream) { return stream; },
  onError: function(err) {
    console.error(err.message);
    this.emit('end'); // Don't kill watch tasks - https://github.com/gulpjs/gulp/issues/259
  }
}

module.exports = function(options) {
  options = assign(defaultOptions, options);

  var stream = gulp.src(options.src, options.srcOptions)
    .pipe(sass(options.sassOptions))
    .on('error', options.onError)
    .pipe(autoprefixer(options.autoprefixerOptions));

  return options.hookFunction(stream)
    .pipe(gulp.dest(options.dest));
}
