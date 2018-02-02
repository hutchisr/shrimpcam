'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const {log, noop} = require('gulp-util');
const path = require('path');
const exposify = require('exposify');

let browserifyOpts = {
  entries: 'src/index.jsx',
  debug: true,
  extensions: ['.js', '.jsx'],
}

let bundler = browserify(browserifyOpts);

bundler.transform('babelify');

bundler.on('dep', dep => console.log(dep.file));

// if (process.env.NODE_ENV === 'production') {
//   exposify.config = {
//     'react': 'React',
//     'react-dom': 'ReactDOM'
//   };
//   bundler.transform(exposify);
// }

function bundle() {
  return bundler.bundle()
    .on('error', err => log(err.toString()))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({
      loadMaps: true,
    }))
    .pipe(process.env.NODE_ENV === 'production' ? $.uglify() : noop())
    .pipe($.sourcemaps.write('.', {
      sourceRoot: '/',
    }))
    .pipe(gulp.dest('dist'));
}

function server() {
  return gulp.src('./')
  .pipe($.serverLivereload({
    livereload: {
      enable: true,
      filter: (fp, cb) => {
        fp = path.relative(__dirname, fp).replace(path.sep, '/');
        // log(fp, /^index\.html|^dist/.test(fp));
        cb(/^index\.html|^dist/.test(fp));
      }
    },
    port: 8080,
  }))
}

function watch() {
  bundler = bundler.plugin('watchify');
  bundler.on('update', bundle);
  bundler.on('log', log);
  return bundle();
}

gulp.task(bundle);
gulp.task('default', gulp.parallel(watch, server));
