var gulp = require('gulp');

module.exports = function(options) {
  if(!options || !options.src) {
    return;
  }

  options.dest = options.dest || 'www/build';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
