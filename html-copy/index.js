var gulp = require('gulp');

module.exports = function(options) {
  options.src = options.src || 'src/index.html';
  options.dest = options.dest || 'dist';

  return gulp.src(options.src)
    .pipe(gulp.dest(options.dest));
}
