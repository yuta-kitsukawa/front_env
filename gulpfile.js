'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

gulp.task('sass', function() {
  gulp.src('src/assets/sass/*.scss')
  .pipe(plumber({errorHandler: notify.onError('<%- error.mesagge %>')}))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dest/assets/css'));
});

gulp.task('js', function(){
  gulp.src('src/assets/js/**/*.js')
  .pipe(plumber({errorHandler: notify.onError('<%- error.mesagge %>')}))
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('dest/assets/js'))
});

 gulp.task('html', function(){
   gulp.src('src/**/*.html')
   .pipe(gulp.dest('dest/'))
 });

 gulp.task('reload', function(){
   browserSync.reload();
 });

 gulp.task('default', function(){
   browserSync({
     server: {baseDir: 'dest'}
   });
   gulp.watch('src/**/*.html', ['reload']);
   gulp.watch('src/**/*.html', ['html']);
   gulp.watch('src/assets/js/**/*.js',['js']);
   gulp.watch('src/assets/sass/*.sass',['sass']);
 });
