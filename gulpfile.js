/***************************************************
* module load
***************************************************/
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var ejs = require('gulp-ejs');

/***************************************************
* path
***************************************************/
var root = "./igonomura/dashboard/";

var cssSrcPath = root + "sass/**/*.scss";
var cssDestPath = root + "css/";
var jsSrcPath = root + "js/**/*.js";
var jsDestPath = root + "js/min/";
var imgSrcPath = root + "img/*(*.jpg|*.png|*.gif)";
var imgDestPath = root + "img/min/";
var ejsSrcPath = root + "**/*.ejs";
var ejsDestPath = root;

/***************************************************
* tasks
***************************************************/
gulp.task("server", function(){
     browser.init({
        proxy: 'localhost:80/development/igonomura/dashboard/'
     });
     browser({
          server: {
               baseDir: root
          }
     });
});

gulp.task("html", function(){
     gulp.src(root + "**/*.html")
          .pipe(plumber())
          .pipe(browser.reload({stream:true}));
});

gulp.task("php", function(){
     gulp.src(root + "**/*.php")
          .pipe(plumber())
          .pipe(browser.reload({stream:true}));
});

gulp.task("sass", function(){
     gulp.src(cssSrcPath)
          .pipe(plumber())
          .pipe(sass())
          .pipe(autoprefixer())
          .pipe(gulp.dest(cssDestPath))
          .pipe(browser.reload({stream:true}));
    gulp.src(cssDestPath)
          .pipe(browser.reload({stream:true}));
});

gulp.task("sass_watch", function(){
     gulp.watch(cssSrcPath,["sass"]);
});

gulp.task('cssmin', function () {
    gulp.src(root + 'css/*.css')
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(root + 'css/min'));
});

gulp.task("js", function(){
     gulp.src([jsSrcPath, "!" + root + "js/min/**/*.js"])
          .pipe(plumber())
          .pipe(uglify())
          .pipe(gulp.dest(jsDestPath))
          .pipe(browser.reload({stream:true}));
});

gulp.task("img", function(){
     gulp.src(imgSrcPath)
          .pipe(imagemin())
          .pipe(gulp.dest(imgDestPath));
});

gulp.task("ejs", function() {
    gulp.src(
      [ejsSrcPath,'!' + root + "**/_*.ejs"]
    )
        .pipe(ejs())
        .pipe(gulp.dest(ejsDestPath))
});

gulp.task("default", ['server'], function(){
     gulp.watch([jsSrcPath, "!" + root + "js/min/**/*.js"],["js"]);
     gulp.watch(cssSrcPath,["sass"]);
     gulp.watch(imgSrcPath,["img"]);
     gulp.watch(ejsSrcPath, ["ejs"]);
     gulp.watch(root + "**/*.html", ["html"]);
     gulp.watch("**/*.php", ["php"]);
});
