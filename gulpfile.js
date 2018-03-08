// jshint ignore:start
//jshint esversion:6

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
const sass = require('gulp-sass');

gulp.task('jshint',function(){
    return gulp.src('./source/js/*.js').pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copiaHtml',function(){
    gulp.src('source/html/*.html').pipe(gulp.dest('dist/html'));
    gulp.src('source/css/*.css').pipe(gulp.dest('dist/css'));
    gulp.src('source/js/*.js').pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function (){
    return gulp.src('./source/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./source/css'));
});

gulp.task('sass:watch', function (){
    gulp.watch('./source/sass/*.scss', ['sass']);
});