# Ionic Gulp tasks

A curated collection of [Gulp](http://gulpjs.com/) tasks for building Ionic apps. Using these tasks allows you to stay up to date if the default Ionic 2 build changes while it is in Beta.

## Tasks

Tasks are configured to work by default with the Ionic starters generated by the [Ionic CLI](github.com/driftyco/ionic-cli).

The current list of tasks is:
- [Browserify TypeScript task](./browserify-typescript)
- [Browserify ES2015 task](./browserify-es2015)
- [Webpack task (ES2015 and TypeScript)](./webpack)
- [Sass build task](./sass-build)
- [Fonts copy task](./fonts-copy)
- [HTML copy task](./html-copy)
- [CSS copy task](./css-copy)
- [Scripts copy task](./scripts-copy)
- [*ESlint task](https://github.com/devillex/ionic-gulp-eslint)


\* Community maintained (not in this repo)

#### Usage

To use a task in your Ionic project's Gulpfile, `require` it, then register it:

```
var gulp = require('gulp'),
    buildWebpack = require('ionic-gulp-webpack-build');

gulp.task('build', buildWebpack);
```

#### API

Each task takes an optional options object:
```
  gulp.task('watch', function(){
    return webpackBuild({ watch: true });  
  });
```

The options depend on each task.  For more information on a particular task, take a look at its README.

#### Return value

Each task returns either a stream or promise.
