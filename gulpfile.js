var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

gulp.task("server", function(){
     browser({
          server: {
               baseDir: "./"
          }
     });
});

gulp.task("html", function(){
     gulp.src("**/*.html")
          .pipe(plumber())
          .pipe(browser.reload({stream:true}));
});

gulp.task("sass", function(){
     gulp.src("sass/**/*.scss")
          .pipe(plumber())
          .pipe(sass())
          .pipe(autoprefixer())
          .pipe(gulp.dest("./css"))
          .pipe(browser.reload({stream:true}));
});

gulp.task("sass_watch", function(){
     gulp.watch("sass/**/*.scss",["sass"]);
     gulp.watch("css/**/*.css",["cssmin"]);
});

gulp.task('cssmin', function () {
    gulp.src('css/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css/min'));
});

gulp.task("js", function(){
     gulp.src(["js/**/*.js", "!js/min/**/*.js"])
          .pipe(plumber())
          .pipe(uglify())
          .pipe(gulp.dest("./js/min"))
          .pipe(browser.reload({stream:true}));
});

gulp.task("img", function(){
     // gulp.src("img/**/*/(.png|.jpg|.gif)/")
     gulp.src("img/*(*.jpg|*.png|*.gif)")
          .pipe(imagemin())
          .pipe(gulp.dest("./img/min"));
});

gulp.task("default", ['server'], function(){
     gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
     gulp.watch("sass/**/*.scss",["sass"]);
     gulp.watch("img/*(*.jpg|*.png|*.gif)",["img"]);
     gulp.watch("**/*.html", ["html"]);
});

