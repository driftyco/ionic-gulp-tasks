# Generic Copy Task
Copy Generic sources to build directory.

## API

### copyGeneric({options})

Returns a [stream](http://nodejs.org/api/stream.html) of [Vinyl files](https://github.com/wearefractal/vinyl-fs)
that can be [piped](http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options).

#### Required options:
- **src** (String|Array) Glob or array of globs ([What's a glob?](https://github.com/isaacs/node-glob#glob-primer)) matching HTML source files.

#### Available options:
- **dest** (String) Output path for the HTML files. Default: `'www/build'`.

## Example

```
var copyData= require('ionic-gulp-generic-copy');

gulp.task('data', function(){
  return copyGeneric({
      src: 'app/data/**/*.json',
      dest: 'www/build/data'
    });
});
```





