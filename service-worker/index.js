var gulp = require('gulp'),
    worker = require('@angular/service-worker');
    

module.exports = function() {
    gulp.src([
        'node_modules/@angular/service-worker/dist/worker.js'
    ])
      .pipe(gulp.dest('www'));

    worker.gulpGenManifest({
        group: [
            {
                name: 'html',
                sources: gulp.src('./www/*.html')
            }, {
                name: 'app',
                sources: gulp.src('./www/**/*.html')
            }, {
                name: 'js',
                sources: gulp.src('./www/*/**/*.js')
            }, {
                name: 'css',
                sources: gulp.src('./www/**/*.css')
            }, {
                name: 'woff',
                sources: gulp.src('./www/**/*.woff')
            }, {
                name: 'ttf',
                sources: gulp.src('./www/**/*.ttf')
            }
        ]
    })
      .pipe(gulp.dest('www'));
};