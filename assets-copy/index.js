var gulp = require('gulp');

module.exports = function(options) {
  options.src = options.src || 'app/assets/**';
  options.dest = options.dest || 'www/build/assets/';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
