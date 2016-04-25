var gulp = require('gulp');

var defaultSrc = [
  'node_modules/es6-shim/es6-shim.min.js',
  'node_modules/angular2/bundles/angular2-polyfills.min.js'
];

module.exports = function(options) {
  options.src = options.src || defaultSrc;
  options.dest = options.dest || 'www/build/js';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
