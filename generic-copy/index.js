var gulp = require('gulp');

module.exports = function(options) {
  if(!options || !options.src  || !options.dest) {
    return;
  }

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
