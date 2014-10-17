var gulp = require('gulp'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    http = require('http'),
    ecstatic = require('ecstatic');


var appPath = __dirname + "/app",
    // base directory for the apps js files
    jsPath = appPath + "/javascripts",

    // uncompiled coffeescript files
    jsSrcPath = jsPath + "/src",

    // compiled coffeescript -> js files
    jsCompilePath = jsPath + "/compiled/.",

    // concatenated production files
    jsDistPath = jsPath + "/dist/.",

    // base directory for the apps css files
    cssPath = appPath + "/stylesheets",
    // uncompiled sass files
    cssSrcPath = cssPath + "/src",
    // compiled production files
    cssDistPath = cssPath + "/dist";

var bowerPath = __dirname + "/bower_components";

var jsDependencies = [
  // Example:
  // bowerPath + "/lodash/dist/lodash.js",
  bowerPath + "/angular/angular.js",
  bowerPath + "/angular-route/angular-route.js"
];

var appJsFiles = [
  jsCompilePath + "/controllers.js",
  jsCompilePath + "/controllers/**/*.js",
  jsCompilePath + "/services.js",
  jsCompilePath + "/services/**/*.js",
  jsCompilePath + "/app.js"
];

gulp.task('jsDependencies', function(){
  gulp.src(jsDependencies)
  .pipe(print())
  .pipe(concat('dependencies.js'))
  .pipe(gulp.dest(jsDistPath));
});

gulp.task('coffee', function(){
  return gulp.src(jsSrcPath + '/**/*.coffee')
  .pipe(sourcemaps.init())
  .pipe(coffee().on('error', gutil.log).on('success', gutil.log))
  .pipe(sourcemaps.write('../compiled'))
  .pipe(gulp.dest(jsCompilePath));
});


gulp.task('less', function () {
  gulp.src(cssSrcPath + '/**/*.less')
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write('../dist'))
  .pipe(gulp.dest(cssDistPath));
});

gulp.task('concatenateAppJsFiles', ['coffee'], function(){
  gulp.src(appJsFiles)
  .pipe(print())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(jsDistPath));
});

gulp.task('watch', function() {
  gulp.watch(jsSrcPath + '/**/*.coffee', ['browserify']);
  gulp.watch(cssSrcPath + '/**/*.less', ['less']);
  gulp.watch(bowerPath + '/**/*.js', ['jsDependencies']);
});

gulp.task('createServer', function() {
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(1234);
});


gulp.task('compileJS', ['concatenateAppJsFiles']);

gulp.task('default', ['jsDependencies', 'compileJS', 'less'], function(){});

gulp.task('server', ['jsDependencies', 'compileJS', 'less', 'watch', 'createServer']);
