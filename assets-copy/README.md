# Asset Copy Task
Copy Assets sources to build directory.

## API

### copyAssets([options])

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Available options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching HTML source files. Default: `'app/assets/**'`.
- **dest** (String) Output path for the Asset files. Default: `'www/build/assets/'`.

## Example

```
var copyAssets = require('ionic-gulp-assets-copy');

gulp.task('html', copyAssets);

gulp.task('html', function(){
  return copyAssets({ dest: 'www/my-custom-asset-dir' });
});
```





