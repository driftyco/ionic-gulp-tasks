# CSS Copy Task
Copy CSS sources to build directory.

## API

### copyCSS([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching CSS source files. Default: `'app/**/*.css'`.
- **dest** (String) Output path for the CSS files. Default: `'www/build'`.

## Example

```
var copyCSS = require('ionic-gulp-css-copy');

gulp.task('css', copyCSS);

gulp.task('css', function(){
  return copyCSS({ dest: 'www/my-custom-build-dir' });
});
```





