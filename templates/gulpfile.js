var gulp = require('gulp'),
    gutil = require('gulp-util'),
    print = require('gulp-print'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    http = require('http'),
    ecstatic = require('ecstatic');


var appPath = __dirname + "/app",
    // base directory for the apps js files
    jsPath = appPath + "/javascripts",
    // uncompiled coffeescript files
    jsSrcPath = jsPath + "/src",
    // compiled js files
    jsCompilePath = jsPath + "/compiled/.",
    // browserified production files
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
];

gulp.task('browserify', ['coffee'], function(){
  return gulp.src(jsCompilePath + '/app.js')
  .pipe(browserify({debug: true}))
  .pipe(gulp.dest(jsDistPath + ''));
});

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


gulp.task('default', ['jsDependencies', 'compileJS', 'less'], function(){});

gulp.task('compileJS', ['browserify']);
gulp.task('server', ['jsDependencies', 'compileJS', 'less', 'watch', 'createServer']);
