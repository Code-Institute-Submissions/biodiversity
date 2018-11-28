const { src, dest } = require('gulp');
const { parallel } = require('gulp');

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function streamJS() {
  return src('src/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js'));
}

function streamCSS() {
  return src('src/css/*.css')
    .pipe(dest('dist/js'));
}

function streamHTML() {
  return src('src/index.html')
    .pipe(dest('dist'));
}

exports.build = parallel(streamJS, streamCSS, streamHTML);
