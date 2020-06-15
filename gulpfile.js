const gulp = require('gulp');
const browserify = require('browserify');
const plumber = require("gulp-plumber");
const sass = require('gulp-sass');
const compass = require('gulp-compass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');

//setting : paths
const paths = {
  'root': './',
  'html': './**/*.html',
  'cssSrc': './sass/**/*.scss',
  'cssDist': './css/',
  'compassConf': './config.rb',
  'jsSrc': './src/*.js',
  'jsDist': './js/',
  'jsMain': './src/main.js'
}

//gulpコマンドの省略
const { watch, series, task, src, dest, parallel } = require('gulp');

//Sass
task('sass', function() {
  return (
    src(paths.cssSrc)
    .pipe(plumber())
    .pipe(compass({
      config_file: paths.compassConf,
      comments: false,
      css: paths.cssDist,
      sass: `${paths.root}sass`
    }))
    .pipe(autoprefixer({
      browsers: ['ie >= 11'],
      cascade: false,
      grid: true
    }))
  );
});

// browser-sync
task('browser-sync', () => {
  return browserSync.init({
    server: {
      baseDir: paths.root
    },
    port: 8080,
    reloadOnRestart: true
  });
});

// browser-sync reload
task('reload', (done) => {
  browserSync.reload();
  done();
});

// browserify
function bundle(watching=false) {
  const b = browserify({
    entries: [paths.jsMain],
    transform: ['babelify'],
    debug: true,
    plugin: (watching) ? [watchify] : null
  })
  .on('update', () => {
    bundler();
    console.log('scripts rebuild');
  });

  function bundler() {
    return b.bundle()
      .on('error', (e) => {
        console.log(e.message);
      })
      .pipe(source('bundle.js'))
      .pipe(dest(paths.jsDist));
  }

  return bundler();
}

task('bundle', (done) => {
  bundle(true);
  done();
})

//watch
task('watch', (done) => {
  watch([paths.cssSrc], series('sass', 'reload'));
  watch([paths.jsSrc], series('bundle', 'reload'));
  watch([paths.html], series('reload'));
  done();
});
task('default', parallel('watch', 'browser-sync'));
