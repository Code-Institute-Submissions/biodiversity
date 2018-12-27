const { src, dest } = require('gulp');
const { parallel } = require('gulp');
const { watch, series } = require('gulp');

const d3 = require('d3');
const dc = require('dc');
const crossfilter = require('crossfilter2');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const htmlmin = require('gulp-htmlmin');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

browserSync.init({
    watch: true,
    server: "dist/"
});

function streamJS() {
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js'));
}

function streamCSS() {
  return src('src/css/*.css')
    .pipe(dest('dist/css'));
}

function streamHTML() {
  return src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
}

function watchJS() {
  gulp.watch('src/js/*.js', ['jshint']);
}

function jsCheck () {
  return src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}

exports.build = parallel(streamJS, streamCSS, streamHTML);
exports.update = parallel(watchJS, jsCheck);
